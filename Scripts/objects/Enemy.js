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
var objects;
(function (objects) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTOR
        function Enemy() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "enemy", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Enemy.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Enemy.prototype._checkBounds = function () {
            // axis X
            if (this.position.x < Enemy.BOSS_POS_X) {
                this.position = new objects.Vector2(Enemy.BOSS_POS_X, this.position.y);
                this.velocity = objects.Vector2.zero();
                this._bossAppearing = false;
            }
            // axis Y
            if (this.position.y <= this.halfHeight + config.Game.GAMEBAR_HEIGHT) {
                this.position = new objects.Vector2(this.position.x, this.halfHeight + config.Game.GAMEBAR_HEIGHT);
            }
            else if (this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
            this._rocketSpawn = new objects.Vector2(this.position.x + this.halfWidth, this.position.y + 4);
            this._bulletSpawn1 = new objects.Vector2(Enemy.BOSS_POS_X - 9, this.position.y - 35);
            this._bulletSpawn2 = new objects.Vector2(Enemy.BOSS_POS_X - 9, this.position.y + 26);
        };
        Enemy.prototype._move = function () {
            // Move if there is any moviment and update the bullet spawn point
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        Enemy.prototype._checkVelocity = function () {
            // Every second, change the velocity
            if (this._bossTicks % 5 == 0) {
                var velY = util.Mathf.RandomRangeInt(1, 3);
                // If the boss is the lower bound, it should go up, so change the direction
                if (this.position.y >= Enemy.LOWER_BOUND) {
                    velY *= -1;
                }
                else if (this.position.y <= Enemy.UPPER_BOUND) {
                    // Otherwise, if boss is in the middle (lesser than lower bound, but bellow the upper bound)
                    // Random choose the direction
                    if (util.Mathf.RandomRangeInt(0, 1) == 0) {
                        velY *= -1;
                    }
                }
                this.velocity = new objects.Vector2(0, velY);
            }
        };
        Enemy.prototype._checkAttack = function () {
            // Every 15s (5 ticks * 15), throw a missile
            if (this._bossTicks % 75 == 0) {
                //this._fireMissileTick = 0;
            }
            // Check the current animation
            if (this.currentAnimation == "bossFlight") {
                if (this._fireMissileTick == 0) {
                    this.gotoAndPlay("bossAttack2");
                }
                else if (this._bossTicks % 25 == 0) {
                    // Fire each 5s (5 ticks * 5), if not throwing a rocket
                    this.gotoAndPlay("bossAttack1");
                }
            }
            else if (this.currentAnimation == "bossAttack2") {
                if (this._fireMissileTick == 0) {
                    this.FireRocket();
                }
                this._fireMissileTick++;
            }
            else if (this.currentAnimation == "bossAttack1") {
                this.FireBullets();
            }
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            this.type = enums.GameObjectType.PLAYER;
            // this._engineSound = createjs.Sound.play("engine");
            // this._engineSound.loop = -1; // loop forever
            // this._engineSound.volume = 0.1; // 10% volume
            // Sets the initial velocity
            this.velocity = new objects.Vector2(-5, 0);
            // Sets the initial boss position
            var initialPosX = config.Game.SCREEN_WIDTH + this.width;
            var initialPosY = util.Mathf.RandomRange(config.Game.GAMEBAR_HEIGHT + this.halfHeight, config.Game.SCREEN_HEIGHT - this.halfHeight);
            this.position = new objects.Vector2(initialPosX, initialPosY);
            // Sets the place where bullets will be fired
            this._rocketSpawn = new objects.Vector2(this.position.x + this.halfWidth, this.position.y + 4);
            this._bulletSpawn1 = new objects.Vector2(Enemy.BOSS_POS_X - 9, this.position.y - 36);
            this._bulletSpawn2 = new objects.Vector2(Enemy.BOSS_POS_X - 9, this.position.y + 26);
            this._bossAppearing = true;
            this._bossTicks = 0;
        };
        Enemy.prototype.Update = function () {
            this._move();
            this._checkBounds();
            if (!this._bossAppearing) {
                if (createjs.Ticker.getTicks() % 12 == 0) {
                    this._bossTicks++;
                    this._checkVelocity();
                    this._checkAttack();
                }
            }
            // // fire bullets every 8 frames
            // if (config.Game.KEYBOARD_MANAGER.Fire) {
            //     let currentTick = createjs.Ticker.getTicks();
            //     if (currentTick - this._lastBulletTick >= 8) {
            //         this.FireBullets();
            //         this._lastBulletTick = currentTick;
            //     }
            // }
        };
        Enemy.prototype.Reset = function () { };
        Enemy.prototype.FireBullets = function () {
            // First bullet
            var bullet = config.Game.BULLET_MANAGER.GetEnemyBullet("enemyBullet", -14, 0);
            bullet.position = this._bulletSpawn1;
        };
        Enemy.prototype.FireRocket = function () { };
        // Local constants
        Enemy.BOSS_POS_X = config.Game.SCREEN_WIDTH - 70;
        Enemy.UPPER_BOUND = 203;
        Enemy.LOWER_BOUND = 350;
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map