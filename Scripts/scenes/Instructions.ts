/*
 * File: scenes/Instructions.ts
 * Author: Ailton De Lima - 301018951
 * Description: Instructions scene. Triggered when the player clicks the i button on the main menu
 *
 * Created: 2020-04-06
 */
module scenes {
    export class Instructions extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _windowTitle: objects.Label;
        private _rules: objects.Label;
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
            let rulesText =
                "Moviments: " +
                "\n- Keys W A S D - Player Movement" +
                "\n- Keys Up Left Down Right - Player Movement" +
                "\n- Spacebar - Player shoots" +
                "\n\nRules:" +
                "\n- Player being hit by an enemy  or bullet, it will lose one life" +
                "\n- Player loses the game, if it runs out of lives" +
                "\n- Player wins the game, if it kill the boss" +
                "\n\nScore:" +
                "\n- Killing enemies grants 10 points" +
                "\n- Collecting crytals grants 50 points" +
                "\n- Killing the boss grants 500 points";

            //instantiate a new Text object
            this._windowTitle = new objects.Label(
                "Instructions",
                "36px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                config.Game.SCREEN_WIDTH * 0.5, // 328 x 10
                50,
                true
            );

            this._rules = new objects.Label(
                rulesText,
                "18px",
                "EthnocentricReg",
                config.Game.TEXT_COLOR,
                70,
                100,
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

            this.addChild(this._rules);

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
