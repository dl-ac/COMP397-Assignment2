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
    var Instructions = /** @class */ (function (_super) {
        __extends(Instructions, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Instructions() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        Instructions.prototype.Start = function () {
            //instantiate a new Text object
            this._windowTitle = new objects.Label("Instructions", "36px", "EthnocentricReg", "#FFFFFF", 328, 10, false);
            // buttons
            this._menuButton = new objects.Button("buttonMenu", 512, 536, true);
            // Background
            this._background = new objects.Background("menu");
            this.Main();
        };
        Instructions.prototype.Update = function () {
            this._background.Update();
        };
        Instructions.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._windowTitle);
            this.addChild(this._menuButton);
            this._menuButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        Instructions.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=Instructions.js.map