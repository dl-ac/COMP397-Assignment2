module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _player?: objects.Player;
        private _boss?: objects.Boss;
        private _bossAppear: number;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;
        private _finalAnimation: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void {
            this._background = new objects.Background(false);
            this._player = new objects.Player();
            this._boss = new objects.Boss();

            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

            // Get a random boss apperence
            this._bossAppear = util.Mathf.RandomRangeInt(-280, -360);

            this.Main();
        }

        public Update(): void {
            if (!this._finalAnimation) {
                // Screen objects updates
                this._background.Update();
                this._player.Update();

                // Verify if it is time to activate the boss
                if (!this._boss.isActive) {
                    if (this._background.position.x <= this._bossAppear) {
                        this._boss.MakeActive();
                        this._scoreBoard.getBossGameObjects().forEach(go => this.addChild(go));
                    }
                } else {
                    this._boss.Update();
                }

                // Manage the bullets
                this._bulletManager.Update();

                // Check for bullets collision
                this._bulletManager.Bullets.forEach(bullet => {
                    if (bullet.isActive) {
                        if (bullet.type == enums.GameObjectType.PLAYER_BULLET) {
                            // Check the player bullet against the boss, if got it, reset it
                            if (managers.Collision.squaredRadiusCheck(bullet, this._boss)) {
                                bullet.Reset();
                            } else {
                                // Check the player bullet against each enemy in screen
                            }
                        } else if (bullet.type == enums.GameObjectType.ENEMY_BULLET) {
                            if (managers.Collision.squaredRadiusCheck(bullet, this._player)) {
                                bullet.Reset();
                            }
                        }
                    }
                });
            }
        }

        public Main(): void {
            this.addChild(this._background);

            this.addChild(this._player);

            this._bulletManager.AddBulletsToScene(this);

            this.addChild(this._boss);

            this._scoreBoard.getPlayGameObjects().forEach(go => this.addChild(go));
        }

        public Clean(): void {
            this.removeAllChildren();
        }
    }
}
