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
        private _enemyManager: managers.Enemy;
        private _crystalManager: managers.Crystal;
        private _lastEnemiesTick: number;
        private _nextEnemies: number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS
        private _createCrystal(position: objects.Vector2): void {
            let chances = util.Mathf.RandomRangeInt(1, 15);

            // Chances are 1 to 10 to create a crystal when an enemy is killed
            if (chances > 10) {
                let crystal = this._crystalManager.GetCrystal();
                crystal.position = position;
                console.log("Crystal Created" + position);
            }
        }

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

            this._enemyManager = new managers.Enemy();
            config.Game.ENEMY_MANAGER = this._enemyManager;

            this._crystalManager = new managers.Crystal();

            // Get a random boss apperence
            this._bossAppear = util.Mathf.RandomRangeInt(-280, -360);

            // Set the last tick to 0 and the next enemies timer
            this._lastEnemiesTick = createjs.Ticker.getTicks();
            this._nextEnemies = 6 * config.Game.FPS;

            // Create the initial enemies
            this._enemyManager.CreateEnemies();

            this.Main();
        }

        public Update(): void {
            // Screen objects updates
            this._background.Update();
            this._player.Update();

            // Verify if it is time to activate the boss
            if (!this._boss.isActive) {
                if (this._background.position.x <= this._bossAppear) {
                    this._boss.MakeActive();
                    this._scoreBoard.GetBossGameObjects().forEach(go => this.addChild(go));
                    config.Game.SOUND_MANAGER.PlaySound("bossIncoming", 0.5);
                }
            } else {
                this._boss.Update();
            }

            // Update all the managers
            this._bulletManager.Update();
            this._enemyManager.Update();
            this._crystalManager.Update();

            // Check the player with the crystals
            this._crystalManager.Crystals.forEach(crystal => {
                if (crystal.isActive) {
                    if (managers.Collision.squaredRadiusCheck(this._player, crystal)) {
                        crystal.Reset();
                    }
                }
            });

            // Check the player with the enemies, store actives to check later with the bullets
            let activeEnemies: Array<objects.Enemy> = new Array<objects.Enemy>();
            this._enemyManager.Enemies.forEach(enemy => {
                if (enemy.isActive) {
                    if (managers.Collision.squaredRadiusCheck(enemy, this._player)) {
                        enemy.Reset();
                    }
                    activeEnemies.push(enemy);
                }
            });

            // Check for bullets collision
            this._bulletManager.Bullets.forEach(bullet => {
                if (bullet.isActive) {
                    if (bullet.type == enums.GameObjectType.PLAYER_BULLET) {
                        // Check the player bullet against the boss, if got it, reset it
                        if (managers.Collision.squaredRadiusCheck(bullet, this._boss)) {
                            bullet.Reset();
                        } else {
                            // Check the player bullet against each enemy in screen
                            activeEnemies.forEach(enemy => {
                                if (managers.Collision.squaredRadiusCheck(bullet, enemy)) {
                                    this._createCrystal(enemy.position);
                                    enemy.Reset();
                                    bullet.Reset();
                                }
                            });
                        }
                    } else if (bullet.type == enums.GameObjectType.ENEMY_BULLET) {
                        if (managers.Collision.squaredRadiusCheck(bullet, this._player)) {
                            bullet.Reset();
                        }
                    }
                }
            });

            // Check for enemies creation
            let currentTick = createjs.Ticker.getTicks();
            if (currentTick - this._lastEnemiesTick >= this._nextEnemies) {
                this._enemyManager.CreateEnemies();
                this._lastEnemiesTick = currentTick;

                // Reduce the time between enemies by 5 FPS until 180 FPS
                if (this._nextEnemies > 180) {
                    this._nextEnemies -= 5;
                }
            }
        }

        public Main(): void {
            this.addChild(this._background);

            this.addChild(this._player);

            this._enemyManager.AddEnemiesToScene(this);

            this._bulletManager.AddBulletsToScene(this);

            this._crystalManager.AddCrystalsToScene(this);

            this.addChild(this._boss);

            this._scoreBoard.GetPlayGameObjects().forEach(go => this.addChild(go));
        }

        public Clean(): void {
            this.removeAllChildren();
        }
    }
}
