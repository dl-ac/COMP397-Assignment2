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
    var ExitGame = /** @class */ (function (_super) {
        __extends(ExitGame, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function ExitGame() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        ExitGame.prototype.Start = function () {
            //instantiate a new Text object
            this._gameTitleOne = new objects.Label("Universe", "80px", "EthnocentricReg", config.Game.TEXT_COLOR, 230, 100, false);
            this._gameTitleTwo = new objects.Label("and machines", "53px", "EthnocentricReg", config.Game.TEXT_COLOR, 230, 180, false);
            this._thanks = new objects.Label("Thank you for playing!", "36px", "EthnocentricReg", config.Game.TEXT_COLOR, 186, 340, false);
            // buttons
            this._menuButton = new objects.Button("buttonMenu", 512, 536, true);
            // Background
            this._background = new objects.Background(true);
            this.Main();
        };
        ExitGame.prototype.Update = function () {
            this._background.Update();
        };
        ExitGame.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._gameTitleOne);
            this.addChild(this._gameTitleTwo);
            this.addChild(this._thanks);
            this.addChild(this._menuButton);
            this._menuButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.START;
            });
        };
        ExitGame.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return ExitGame;
    }(objects.Scene));
    scenes.ExitGame = ExitGame;
})(scenes || (scenes = {}));
//# sourceMappingURL=ExitGame.js.map