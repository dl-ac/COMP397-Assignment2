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
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        // CONSTRUCTOR
        function Boss() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "bossFlight", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Boss.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Boss.prototype._checkBounds = function () {
            // axis X
            if (this.position.x < Boss.BOSS_POS_X) {
                this.position = new objects.Vector2(Boss.BOSS_POS_X, this.position.y);
                this._setRandomVelocity();
                this._bossAppearing = false;
            }
            // axis Y
            if (this.position.y <= this.halfHeight + config.Game.GAMEBAR_HEIGHT) {
                this.position = new objects.Vector2(this.position.x, this.halfHeight + config.Game.GAMEBAR_HEIGHT);
            }
            else if (this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
            this._missileSpawn = new objects.Vector2(Boss.BOSS_POS_X - 78, this.position.y - 8);
            this._bulletSpawn1 = new objects.Vector2(Boss.BOSS_POS_X - 100, this.position.y - 35);
            this._bulletSpawn2 = new objects.Vector2(Boss.BOSS_POS_X - 100, this.position.y + 26);
        };
        Boss.prototype._move = function () {
            // Move if there is any moviment and update the bullet spawn point
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        Boss.prototype._checkVelocity = function () {
            // Every second, change the velocity when the boss is not launching the missile
            if (this._bossTicks % 5 == 0 && this._fireMissileStatus <= 0) {
                this._setRandomVelocity();
            }
        };
        Boss.prototype._setRandomVelocity = function () {
            var velY = util.Mathf.RandomRangeInt(1, 3);
            // If the boss is the lower bound, it should go up, so change the direction
            if (this.position.y >= Boss.LOWER_BOUND) {
                velY *= -1;
            }
            else if (this.position.y <= Boss.UPPER_BOUND) {
                // Otherwise, if boss is in the middle (lesser than lower bound, but bellow the upper bound)
                // Random choose the direction
                if (util.Mathf.RandomRangeInt(0, 1) == 0) {
                    velY *= -1;
                }
            }
            this.velocity = new objects.Vector2(0, velY);
        };
        Boss.prototype._checkAttack = function () {
            // Every 15s (5 ticks * 15), throw a missile
            if (this._bossTicks % 75 == 0) {
                this._fireMissileStatus = 0;
            }
            // Check the current animation
            switch (this.currentAnimation) {
                case "bossFlight":
                    if (this._fireMissileStatus == 0) {
                        this.gotoAndPlay("bossAttack2Begin");
                    }
                    else if (this._bossTicks % 20 == 0) {
                        // Fire each 4s (5 ticks * 4), if not throwing a rocket
                        this.gotoAndPlay("bossAttack1");
                    }
                    break;
                case "bossAttack2Begin":
                    // Do nothing during the attack beginning
                    break;
                case "bossAttack2Mid":
                    if (this._fireMissileStatus == 0) {
                        this.FireRocket();
                        this._fireMissileStatus = 1;
                    }
                    break;
                case "bossAttack2End":
                    this._bossMissile.velocity = new objects.Vector2(-25, 0);
                    this._fireMissileStatus = -1;
                    break;
                case "bossAttack1":
                    this.FireBullets();
                    break;
            }
        };
        // PUBLIC METHODS
        Boss.prototype.Start = function () {
            this.type = enums.GameObjectType.BOSS;
            this.Reset();
        };
        Boss.prototype.Update = function () {
            this._move();
            this._checkBounds();
            if (!this._bossAppearing) {
                if (createjs.Ticker.getTicks() % 12 == 0) {
                    this._bossTicks++;
                    this._checkVelocity();
                    this._checkAttack();
                }
            }
        };
        Boss.prototype.Reset = function () {
            // Sets the initial boss position
            var initialPosX = config.Game.SCREEN_WIDTH + this.width;
            var initialPosY = util.Mathf.RandomRange(config.Game.GAMEBAR_HEIGHT + this.halfHeight, config.Game.SCREEN_HEIGHT - this.halfHeight);
            this.position = new objects.Vector2(initialPosX, initialPosY);
            // Sets the place where bullets will be fired
            this._missileSpawn = new objects.Vector2(Boss.BOSS_POS_X - 78, this.position.y - 8);
            this._bulletSpawn1 = new objects.Vector2(Boss.BOSS_POS_X - 9, this.position.y - 36);
            this._bulletSpawn2 = new objects.Vector2(Boss.BOSS_POS_X - 9, this.position.y + 26);
            this._bossAppearing = true;
            this._bossTicks = 0;
            this._fireMissileStatus = -1;
            this.isActive = false;
        };
        Boss.prototype.FireBullets = function () {
            // First bullet
            var bullet = config.Game.BULLET_MANAGER.GetEnemyBullet("bossBullet", -14, 0);
            bullet.position = this._bulletSpawn1;
            // Second bullet
            bullet = config.Game.BULLET_MANAGER.GetEnemyBullet("bossBullet", -14, 0);
            bullet.position = this._bulletSpawn2;
        };
        Boss.prototype.FireRocket = function () {
            this._bossMissile = config.Game.BULLET_MANAGER.GetEnemyBullet("bossMissile", 0, 0);
            this._bossMissile.position = this._missileSpawn;
            this.velocity = objects.Vector2.zero(); // Stop the boss moviment to fire the missile
        };
        Boss.prototype.MakeActive = function () {
            // Play the sound of boss appearing in the screen
            // this._engineSound = createjs.Sound.play("engine");
            // this._engineSound.volume = 0.1; // 10% volume
            // Sets the initial velocity
            this.velocity = new objects.Vector2(-5, 0);
            this.isActive = true;
        };
        // Local constants
        Boss.BOSS_POS_X = config.Game.SCREEN_WIDTH - 70;
        Boss.UPPER_BOUND = 203;
        Boss.LOWER_BOUND = 350;
        return Boss;
    }(objects.GameObject));
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=Boss.js.map