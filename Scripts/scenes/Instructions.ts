module scenes {
    export class Instructions extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _windowTitle: objects.Label;
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
            this._windowTitle = new objects.Label(
                "Instructions",
                "36px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                328,
                10,
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

            this.addChild(this._windowTitle);

            this.addChild(this._menuButton);

            this._menuButton.on("click", () => {
                config.Game.SCENE = scenes.State.START;
            });
        }

        public Clean(): void {
            this.removeAllChildren();
        }
    }
}
