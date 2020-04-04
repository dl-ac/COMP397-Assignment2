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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            //instantiate a new Text object
            this._gameTitleOne = new objects.Label("Universe", "80px", "EthnocentricReg", config.Game.TEXT_COLOR, 230, 100, false);
            this._gameTitleTwo = new objects.Label("and machines", "53px", "EthnocentricReg", config.Game.TEXT_COLOR, 230, 180, false);
            // buttons
            this._startButton = new objects.Button("buttonStart", 307.5, 340, true);
            this._exitButton = new objects.Button("buttonExit", 716.5, 340, true);
            this._infoButton = new objects.Button("buttonInfo", 512, 480, true);
            // Background
            this._background = new objects.Background("menu");
            this.Main();
        };
        Start.prototype.Update = function () {
            this._background.Update();
        };
        Start.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._gameTitleOne);
            this.addChild(this._gameTitleTwo);
            this.addChild(this._startButton);
            this.addChild(this._exitButton);
            this.addChild(this._infoButton);
            this._startButton.on("click", function () {
                config.Game.SCENE = scenes.State.PLAY;
            });
            this._exitButton.on("click", function () {
                config.Game.SCENE = scenes.State.EXIT;
            });
            this._infoButton.on("click", function () {
                config.Game.SCENE = scenes.State.INFO;
            });
        };
        Start.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map