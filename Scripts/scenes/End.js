"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            var resultText;
            var resultTextSize;
            //instantiate a new Text object
            this._gameOverLabel = new objects.Label("Game Over", "80px", "EthnocentricReg", config.Game.TEXT_COLOR, config.Game.SCREEN_WIDTH * 0.5, 120, true);
            // creates the image of explosion
            if (config.Game.PLAYER_LIVES > 0) {
                this._imageName = "bossDeath";
                resultText = "You win!";
                resultTextSize = "80px";
            }
            else {
                this._imageName = "playerDeath";
                resultText = "You lose!";
                resultTextSize = "60px";
            }
            this._explosion = new objects.Image(this._imageName, config.Game.SCREEN_WIDTH * 0.5, config.Game.SCREEN_HEIGHT * 0.5, true);
            this._explosion.scaleX = 3;
            this._explosion.scaleY = 3;
            // Result Label
            this._resultLabel = new objects.Label(resultText, resultTextSize, "EthnocentricReg", config.Game.TEXT_COLOR, config.Game.SCREEN_WIDTH * 0.5, config.Game.SCREEN_HEIGHT * 0.5, true);
            // Result Label
            this._highScore = new objects.Label("High score: " + config.Game.HIGH_SCORE.toLocaleString("en-US", { maximumFractionDigits: 0 }), "40px", "EthnocentricReg", config.Game.TEXT_COLOR, config.Game.SCREEN_WIDTH * 0.5, 400, true);
            // buttons
            this._menuButton = new objects.Button("buttonMenu", 307.5, 490, true);
            this._exitButton = new objects.Button("buttonExit", 716.5, 490, true);
            // Background
            this._background = new objects.Background(true);
            this._showGameOver = false;
            this.Main();
        };
        End.prototype.Update = function () {
            if (!this._showGameOver && this._explosion.currentAnimation == this._imageName + "End") {
                this.removeChild(this._explosion);
                this.addChild(this._gameOverLabel);
                this.addChild(this._resultLabel);
                this.addChild(this._highScore);
                this.addChild(this._menuButton);
                this.addChild(this._exitButton);
                // this.addChild(this._highScoreLabel);
                this._menuButton.on("click", function () {
                    config.Game.SCENE_STATE = scenes.State.START;
                });
                this._exitButton.on("click", function () {
                    config.Game.SCENE_STATE = scenes.State.EXIT;
                });
                this._showGameOver = true;
            }
        };
        End.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._explosion);
        };
        End.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map