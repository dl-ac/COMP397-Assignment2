module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _gameTitleOne: objects.Label;
        private _gameTitleTwo: objects.Label;
        private _startButton: objects.Button;
        private _exitButton: objects.Button;
        private _infoButton: objects.Button;
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

            // buttons
            this._startButton = new objects.Button("buttonStart", 307.5, 340, true);
            this._exitButton = new objects.Button("buttonExit", 716.5, 340, true);
            this._infoButton = new objects.Button("buttonInfo", 512, 480, true);

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

            this.addChild(this._startButton);
            this.addChild(this._exitButton);
            this.addChild(this._infoButton);

            this._startButton.on("click", () => {
                config.Game.SCENE = scenes.State.PLAY;
            });

            this._exitButton.on("click", () => {
                config.Game.SCENE = scenes.State.EXIT;
            });

            this._infoButton.on("click", () => {
                config.Game.SCENE = scenes.State.INFO;
            });
        }

        public Clean(): void {
            this.removeAllChildren();
        }
    }
}
