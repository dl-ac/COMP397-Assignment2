"use strict";
/*
 * File: managers/Bullet.ts
 * Author: Ailton De Lima - 301018951
 * Description: Manager for bullets, creates a pool and control the utilization during the play
 *
 * Created: 2020-04-06
 */
var managers;
(function (managers) {
    var BULLET_PLAYER_SPEED = 12;
    var Bullet = /** @class */ (function () {
        // CONSTRUCTOR
        function Bullet() {
            this._buildBulletPool();
        }
        Object.defineProperty(Bullet.prototype, "Bullets", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._bulletPool;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Bullet.prototype._buildBulletPool = function () {
            // initialize bullet number
            this._bulletNumber = 100;
            // create an empty container
            this._bulletPool = new Array();
            for (var count = 0; count < this._bulletNumber; count++) {
                var bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        };
        Bullet.prototype._getBullet = function (spriteName, type, velocity) {
            // remove the bullet from the front of the pool
            var bullet = this._bulletPool.shift();
            // Define the default values for the player bullet
            bullet.gotoAndPlay(spriteName);
            bullet.type = type;
            bullet.velocity = velocity;
            bullet.isActive = true;
            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);
            // return a reference to the active bullet
            return bullet;
        };
        // PUBLIC METHODS
        Bullet.prototype.AddBulletsToScene = function (scene) {
            this._bulletPool.forEach(function (bullet) {
                scene.addChild(bullet);
            });
        };
        Bullet.prototype.GetPlayerBullet = function () {
            return this._getBullet("playerBullet", enums.GameObjectType.PLAYER_BULLET, new objects.Vector2(BULLET_PLAYER_SPEED, 0));
        };
        Bullet.prototype.GetEnemyBullet = function (spriteName, speedX, speedY) {
            return this._getBullet(spriteName, enums.GameObjectType.ENEMY_BULLET, new objects.Vector2(speedX, speedY));
        };
        Bullet.prototype.Update = function () {
            this._bulletPool.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=Bullet.js.map