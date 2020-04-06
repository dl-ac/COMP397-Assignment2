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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._background = new objects.Background(false);
            this._player = new objects.Player();
            this._boss = new objects.Boss();
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;
            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;
            // Get a random boss apperence
            this._bossAppear = util.Mathf.RandomRangeInt(-280, -360);
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            if (!this._finalAnimation) {
                // Screen objects updates
                this._background.Update();
                this._player.Update();
                // Verify if it is time to activate the boss
                if (!this._boss.isActive) {
                    if (this._background.position.x <= this._bossAppear) {
                        this._boss.MakeActive();
                        this._scoreBoard.getBossGameObjects().forEach(function (go) { return _this.addChild(go); });
                    }
                }
                else {
                    this._boss.Update();
                }
                // Manage the bullets
                this._bulletManager.Update();
                // Check for bullets collision
                this._bulletManager.Bullets.forEach(function (bullet) {
                    if (bullet.isActive) {
                        if (bullet.type == enums.GameObjectType.PLAYER_BULLET) {
                            // Check the player bullet against the boss, if got it, reset it
                            if (managers.Collision.squaredRadiusCheck(bullet, _this._boss)) {
                                bullet.Reset();
                            }
                            else {
                                // Check the player bullet against each enemy in screen
                            }
                        }
                        else if (bullet.type == enums.GameObjectType.ENEMY_BULLET) {
                            if (managers.Collision.squaredRadiusCheck(bullet, _this._player)) {
                                bullet.Reset();
                            }
                        }
                    }
                });
            }
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._player);
            this._bulletManager.AddBulletsToScene(this);
            this.addChild(this._boss);
            this._scoreBoard.getPlayGameObjects().forEach(function (go) { return _this.addChild(go); });
        };
        Play.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map