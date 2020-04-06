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
/*
 * File: scenes/Instructions.ts
 * Author: Ailton De Lima - 301018951
 * Description: Instructions scene. Triggered when the player clicks the i button on the main menu
 *
 * Created: 2020-04-06
 */
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
            var rulesText = "Moviments: " +
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
            this._windowTitle = new objects.Label("Instructions", "36px", "EthnocentricReg", config.Game.TEXT_COLOR, config.Game.SCREEN_WIDTH * 0.5, // 328 x 10
            50, true);
            this._rules = new objects.Label(rulesText, "18px", "EthnocentricReg", config.Game.TEXT_COLOR, 70, 100, false);
            // buttons
            this._menuButton = new objects.Button("buttonMenu", 512, 536, true);
            // Background
            this._background = new objects.Background(true);
            this.Main();
        };
        Instructions.prototype.Update = function () {
            this._background.Update();
        };
        Instructions.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._windowTitle);
            this.addChild(this._rules);
            this.addChild(this._menuButton);
            this._menuButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.START;
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