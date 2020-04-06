module scenes {
    export class ExitGame extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _gameTitleOne: objects.Label;
        private _gameTitleTwo: objects.Label;
        private _thanks: objects.Label;
        private _menuButton: objects.Button;
        private _background: objects.Background;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void {
            //instantiate a new Text object
            this._gameTitleOne = new objects.Label(
                "Universe",
                "80px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                230,
                100,
                false
            );
            this._gameTitleTwo = new objects.Label(
                "and machines",
                "53px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                230,
                180,
                false
            );

            this._thanks = new objects.Label(
                "Thank you for playing!",
                "36px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                186,
                340,
                false
            );

            // buttons
            this._menuButton = new objects.Button("buttonMenu", 512, 536, true);

            // Background
            this._background = new objects.Background(true);
            this.Main();
        }

        public Update(): void {
            this._background.Update();
        }

        public Main(): void {
            this.addChild(this._background);

            this.addChild(this._gameTitleOne);
            this.addChild(this._gameTitleTwo);
            this.addChild(this._thanks);

            this.addChild(this._menuButton);

            this._menuButton.on("click", () => {
                config.Game.SCENE_STATE = scenes.State.START;
            });
        }

        public Clean(): void {
            this.removeAllChildren();
        }
    }
}
