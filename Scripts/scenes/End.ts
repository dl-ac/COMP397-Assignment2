module scenes {
    export class End extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _gameOverLabel: objects.Label;
        private _resultLabel: objects.Label;
        private _highScore: objects.Label;
        private _menuButton: objects.Button;
        private _exitButton: objects.Button;
        private _background: objects.Background;
        private _explosion: objects.Image;
        private _imageName: string;
        private _showGameOver: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void {
            let resultText: string;
            let resultTextSize: string;
            let resultScale: number;

            //instantiate a new Text object
            this._gameOverLabel = new objects.Label(
                "Game Over",
                "80px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                config.Game.SCREEN_WIDTH * 0.5,
                120,
                true
            );

            // creates the image of explosion
            if (config.Game.PLAYER_LIVES > 0) {
                this._imageName = "bossDeath";
                resultText = "You win!";
                resultTextSize = "80px";
                resultScale = 2;
                config.Game.SOUND_MANAGER.PlaySound("bossExplosion", 0.5, 5);
            } else {
                this._imageName = "playerDeath";
                resultText = "You lose!";
                resultTextSize = "60px";
                resultScale = 3;
                config.Game.SOUND_MANAGER.PlaySound("playerExplosion", 0.5, 3);
            }
            this._explosion = new objects.Image(
                this._imageName,
                config.Game.SCREEN_WIDTH * 0.5,
                config.Game.SCREEN_HEIGHT * 0.5,
                true
            );
            this._explosion.scaleX = resultScale;
            this._explosion.scaleY = resultScale;

            // Result Label
            this._resultLabel = new objects.Label(
                resultText,
                resultTextSize,
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                config.Game.SCREEN_WIDTH * 0.5,
                config.Game.SCREEN_HEIGHT * 0.5,
                true
            );

            // Result Label
            this._highScore = new objects.Label(
                `High score: ${config.Game.HIGH_SCORE.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
                "40px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                config.Game.SCREEN_WIDTH * 0.5,
                400,
                true
            );

            // buttons
            this._menuButton = new objects.Button("buttonMenu", 307.5, 490, true);
            this._exitButton = new objects.Button("buttonExit", 716.5, 490, true);

            // Background
            this._background = new objects.Background(true);
            this._showGameOver = false;

            this.Main();
        }

        public Update(): void {
            if (!this._showGameOver && this._explosion.currentAnimation == `${this._imageName}End`) {
                this.removeChild(this._explosion);

                this.addChild(this._gameOverLabel);

                this.addChild(this._resultLabel);

                this.addChild(this._highScore);

                this.addChild(this._menuButton);

                this.addChild(this._exitButton);

                // this.addChild(this._highScoreLabel);

                this._menuButton.on("click", () => {
                    config.Game.SCENE_STATE = scenes.State.START;
                });

                this._exitButton.on("click", () => {
                    config.Game.SCENE_STATE = scenes.State.EXIT;
                });

                this._showGameOver = true;
            }
        }

        public Main(): void {
            this.addChild(this._background);

            this.addChild(this._explosion);
        }

        public Clean(): void {
            this.removeAllChildren();
        }
    }
}
