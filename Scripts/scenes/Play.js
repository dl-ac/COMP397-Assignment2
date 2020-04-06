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
 * File: scenes/Play.ts
 * Author: Ailton De Lima - 301018951
 * Description: Play scene. Triggered when the player clicks the start button on the main menu
 *
 * Created: 2020-04-06
 */
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
        Play.prototype._createCrystal = function (position) {
            var chances = util.Mathf.RandomRangeInt(1, 15);
            // Chances are 1 to 10 to create a crystal when an enemy is killed
            if (chances > 10) {
                var crystal = this._crystalManager.GetCrystal();
                crystal.position = position;
            }
        };
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
            this._enemyManager = new managers.Enemy();
            config.Game.ENEMY_MANAGER = this._enemyManager;
            this._crystalManager = new managers.Crystal();
            // Get a random boss apperence
            this._bossAppear = util.Mathf.RandomRangeInt(-280, -360);
            // Set the last tick to 0 and the next enemies timer
            this._lastEnemiesTick = createjs.Ticker.getTicks();
            this._nextEnemies = 6 * config.Game.FPS;
            // Create the initial enemies
            this._enemyManager.CreateEnemies();
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            // Screen objects updates
            this._background.Update();
            this._player.Update();
            // Verify if it is time to activate the boss
            if (!this._boss.isActive) {
                if (this._background.position.x <= this._bossAppear) {
                    this._boss.MakeActive();
                    this._scoreBoard.GetBossGameObjects().forEach(function (go) { return _this.addChild(go); });
                    config.Game.SOUND_MANAGER.PlaySound("bossIncoming", 0.5);
                }
            }
            else {
                this._boss.Update();
            }
            // Update all the managers
            this._bulletManager.Update();
            this._enemyManager.Update();
            this._crystalManager.Update();
            // Check the player with the crystals
            this._crystalManager.Crystals.forEach(function (crystal) {
                if (crystal.isActive) {
                    if (managers.Collision.squaredRadiusCheck(_this._player, crystal)) {
                        crystal.Reset();
                    }
                }
            });
            // Check the player with the enemies, store actives to check later with the bullets
            var activeEnemies = new Array();
            this._enemyManager.Enemies.forEach(function (enemy) {
                if (enemy.isActive) {
                    if (managers.Collision.squaredRadiusCheck(enemy, _this._player)) {
                        enemy.Reset();
                    }
                    activeEnemies.push(enemy);
                }
            });
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
                            activeEnemies.forEach(function (enemy) {
                                if (managers.Collision.squaredRadiusCheck(bullet, enemy)) {
                                    _this._createCrystal(enemy.position);
                                    enemy.Reset();
                                    bullet.Reset();
                                }
                            });
                        }
                    }
                    else if (bullet.type == enums.GameObjectType.ENEMY_BULLET) {
                        if (managers.Collision.squaredRadiusCheck(bullet, _this._player)) {
                            bullet.Reset();
                        }
                    }
                }
            });
            // Check for enemies creation
            var currentTick = createjs.Ticker.getTicks();
            if (currentTick - this._lastEnemiesTick >= this._nextEnemies) {
                this._enemyManager.CreateEnemies();
                this._lastEnemiesTick = currentTick;
                // Reduce the time between enemies by 5 FPS until 180 FPS
                if (this._nextEnemies > 180) {
                    this._nextEnemies -= 5;
                }
            }
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._player);
            this._enemyManager.AddEnemiesToScene(this);
            this._bulletManager.AddBulletsToScene(this);
            this._crystalManager.AddCrystalsToScene(this);
            this.addChild(this._boss);
            this._scoreBoard.GetPlayGameObjects().forEach(function (go) { return _this.addChild(go); });
        };
        Play.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map