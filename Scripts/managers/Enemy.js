"use strict";
/*
 * File: managers/Enemy.ts
 * Author: Ailton De Lima - 301018951
 * Description: Manager for enemies, creates a pool and control the utilization during the play
 *
 * Created: 2020-04-06
 */
var managers;
(function (managers) {
    var Enemy = /** @class */ (function () {
        // CONSTRUCTOR
        function Enemy() {
            this._buildEnemyPool();
        }
        Object.defineProperty(Enemy.prototype, "Enemies", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._enemyPool;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Enemy.prototype._buildEnemyPool = function () {
            // create an empty container
            this._enemyPool = new Array();
            for (var count = 0; count < Enemy.ENEMY_QUANTITY; count++) {
                var enemy = new objects.Enemy();
                this._enemyPool.push(enemy);
            }
        };
        // PUBLIC METHODS
        Enemy.prototype.AddEnemiesToScene = function (scene) {
            this._enemyPool.forEach(function (enemy) {
                scene.addChild(enemy);
            });
        };
        Enemy.prototype.GetEnemy = function () {
            // remove the enemy from the front of the pool
            var enemy = this._enemyPool.shift();
            // Define the default values for the enemy
            enemy.isActive = true;
            // push the enemy to the back of the pool
            this._enemyPool.push(enemy);
            // return a reference to the active enemy
            return enemy;
        };
        Enemy.prototype.Update = function () {
            this._enemyPool.forEach(function (enemy) {
                enemy.Update();
            });
        };
        Enemy.prototype.GetMoviments = function (moviment) {
            var result = new Array();
            switch (moviment) {
                case enums.MovimentTypes.TL_TO_BR:
                    result.push(new objects.EnemyMovement(0, new objects.Vector2(-5, 4), 0));
                    result.push(new objects.EnemyMovement(206));
                    break;
                case enums.MovimentTypes.BL_TO_TR:
                    result.push(new objects.EnemyMovement(0, new objects.Vector2(-5, -4), 0));
                    result.push(new objects.EnemyMovement(206));
                    break;
            }
            return result;
        };
        Enemy.prototype.CreateEnemies = function () {
            var type = util.Mathf.RandomRangeInt(0, enums.MovimentTypes.NUM_OF_MOVIMENTS - 1);
            var qty = util.Mathf.RandomRangeInt(4, 6);
            switch (type) {
                case enums.MovimentTypes.BL_TO_TR:
                case enums.MovimentTypes.TL_TO_BR:
                    var posX = util.Mathf.RandomRangeInt(config.Game.SCREEN_WIDTH - 125, config.Game.SCREEN_WIDTH + 25);
                    var posY1 = config.Game.SCREEN_HEIGHT + 20;
                    var posY2 = -20;
                    var delay = 0;
                    for (var iCt = 0; iCt < qty; iCt++) {
                        var enemy = this.GetEnemy();
                        var fireRate = iCt % 2 == 0 ? util.Mathf.RandomRangeInt(40, 60) : 0;
                        enemy.ActivateEnemy(enums.MovimentTypes.BL_TO_TR, posX, posY1, fireRate, delay);
                        enemy = this.GetEnemy();
                        fireRate = iCt % 2 == 1 ? util.Mathf.RandomRangeInt(40, 60) : 0;
                        enemy.ActivateEnemy(enums.MovimentTypes.TL_TO_BR, posX, posY2, fireRate, delay);
                        delay += 10;
                    }
                    break;
            }
        };
        // Constants
        Enemy.ENEMY_QUANTITY = 150;
        return Enemy;
    }());
    managers.Enemy = Enemy;
})(managers || (managers = {}));
//# sourceMappingURL=Enemy.js.map