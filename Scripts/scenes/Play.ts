module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _player?: objects.Player;
        private _initialTick: number;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            // Get the ticker
            this._initialTick = createjs.Ticker.getTicks();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void {
            this._background = new objects.Background(false);
            this._player = new objects.Player();

            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

            this.Main();
        }

        public Update(): void {
            this._background.Update();
            this._player.Update();
            this._bulletManager.Update();
        }

        public Main(): void {
            this.addChild(this._background);

            this.addChild(this._player);

            this._bulletManager.AddBulletsToScene(this);

            this._scoreBoard.getPlayGameObjects().forEach(go => this.addChild(go));
        }

        public Clean(): void {
            this.removeAllChildren();
        }
    }
}
