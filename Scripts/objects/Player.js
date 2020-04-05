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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "playerFull", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            // axis X
            if (this.position.x <= this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.position.y);
            }
            else if (this.position.x >= config.Game.SCREEN_WIDTH * 0.5 - this.halfWidth) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5 - this.halfWidth, this.position.y);
            }
            // axis Y
            if (this.position.y <= this.halfHeight + 36) {
                this.position = new objects.Vector2(this.position.x, this.halfHeight + 36);
            }
            else if (this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
            this._bulletSpawn = new objects.Vector2(this.position.x + this.halfWidth, this.position.y + 4);
        };
        Player.prototype._move = function () {
            var velX = 0;
            var velY = 0;
            // Verify the X axis
            if (config.Game.KEYBOARD_MANAGER.MoveLeft) {
                velX -= this._horizontalSpeed;
            }
            if (config.Game.KEYBOARD_MANAGER.MoveRight) {
                velX += this._horizontalSpeed;
            }
            // Verify the Y axis
            if (config.Game.KEYBOARD_MANAGER.MoveUp) {
                velY -= this._verticalSpeed;
            }
            if (config.Game.KEYBOARD_MANAGER.MoveDown) {
                velY += this._verticalSpeed;
            }
            // Move if there is any moviment and update the bullet spawn point
            if (velX != 0 || velY != 0) {
                this.position = objects.Vector2.add(this.position, new objects.Vector2(velX, velY));
            }
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
            this.type = enums.GameObjectType.PLAYER;
            // this._engineSound = createjs.Sound.play("engine");
            // this._engineSound.loop = -1; // loop forever
            // this._engineSound.volume = 0.1; // 10% volume
            this._horizontalSpeed = 8;
            this._verticalSpeed = 10;
            var initialPosX = this.halfWidth + 10;
            var initialPosY = config.Game.SCREEN_HEIGHT * 0.5;
            this.position = new objects.Vector2(initialPosX, initialPosY);
            this._bulletSpawn = new objects.Vector2(this.position.x + this.halfWidth, this.position.y + 4);
        };
        Player.prototype.Update = function () {
            this._move();
            this._checkBounds();
            // fire bullets every 10 frames
            if (createjs.Ticker.getTicks() % 8 == 0) {
                if (config.Game.KEYBOARD_MANAGER.Fire) {
                    this.FireBullets();
                }
            }
        };
        Player.prototype.Reset = function () { };
        Player.prototype.FireBullets = function () {
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map