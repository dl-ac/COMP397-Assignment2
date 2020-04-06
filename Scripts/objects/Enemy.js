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
            this._bulletSpawn = new objects.Vector2(this.position.x - this.halfWidth, this.position.y);
        };
        Enemy.prototype._move = function () {
            // Move if there is any moviment and update the bullet spawn point
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            this.type = enums.GameObjectType.ENEMY;
            // Sets the initial velocity
            this.velocity = new objects.Vector2(-5, 0);
            // Sets the initial boss position
            var initialPosX = config.Game.SCREEN_WIDTH + this.width;
            var initialPosY = util.Mathf.RandomRange(config.Game.GAMEBAR_HEIGHT + this.halfHeight, config.Game.SCREEN_HEIGHT - this.halfHeight);
            this.position = new objects.Vector2(initialPosX, initialPosY);
            // Sets the place where bullets will be fired
            this._bulletSpawn = new objects.Vector2(this.position.x - this.halfWidth, this.position.y - 36);
            this._enemyTicks = 0;
            this._fireRate = 0;
            this._delayStart = 0;
        };
        Enemy.prototype.Update = function () {
            if (this.isActive) {
                this._enemyTicks++;
                if (this._delayStart > 0) {
                    if (this._enemyTicks >= this._delayStart) {
                        this._delayStart = 0;
                        this._enemyTicks = 0;
                    }
                    return;
                }
                this._move();
                this._checkBounds();
                this.rotation += this._currentMoviment.Rotation;
                if (this._enemyTicks > this._currentMoviment.Tick) {
                    if (this._moviments.length > 0) {
                        this._currentMoviment = this._moviments.shift();
                        this.velocity = this._currentMoviment.Velocity;
                    }
                    else {
                        this.Reset();
                    }
                }
                if (this._fireRate > 0 && this._enemyTicks % this._fireRate == 0) {
                    this.FireBullets();
                }
            }
        };
        Enemy.prototype.Reset = function () {
            this.isActive = false;
            this.position = new objects.Vector2(-1500, -1500);
            this.velocity = objects.Vector2.zero();
        };
        Enemy.prototype.FireBullets = function () {
            var velX = util.Mathf.RandomRangeInt(-15, -12);
            var velY = util.Mathf.RandomRangeInt(-3, 3);
            // First bullet
            var bullet = config.Game.BULLET_MANAGER.GetEnemyBullet("enemyBullet", velX, velY);
            bullet.position = this._bulletSpawn;
        };
        Enemy.prototype.ActivateEnemy = function (moviment, posX, posY, fireRate, delayStart) {
            this._moviments = config.Game.ENEMY_MANAGER.GetMoviments(moviment);
            this._currentMoviment = this._moviments.shift();
            if (this._currentMoviment.Tick == 0) {
                this.velocity = this._currentMoviment.Velocity;
                this.rotation = this._currentMoviment.Rotation;
                this._currentMoviment = this._moviments.shift();
            }
            this.position = new objects.Vector2(posX, posY);
            this._fireRate = fireRate;
            this._enemyTicks = 0;
            this._delayStart = delayStart;
            this.isActive = true;
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map