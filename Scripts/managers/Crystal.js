"use strict";
/*
 * File: managers/Crystal.ts
 * Author: Ailton De Lima - 301018951
 * Description: Manager for crystals, creates a pool and control the utilization during the play
 *
 * Created: 2020-04-06
 */
var managers;
(function (managers) {
    var Crystal = /** @class */ (function () {
        // CONSTRUCTOR
        function Crystal() {
            this._buildcrystalPool();
        }
        Object.defineProperty(Crystal.prototype, "Crystals", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._crystalPool;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Crystal.prototype._buildcrystalPool = function () {
            // create an empty container
            this._crystalPool = new Array();
            for (var count = 0; count < Crystal.CRYSTAL_QUANTITY; count++) {
                var crystal = new objects.Crystal();
                this._crystalPool.push(crystal);
            }
        };
        // PUBLIC METHODS
        Crystal.prototype.AddCrystalsToScene = function (scene) {
            this._crystalPool.forEach(function (crystal) {
                scene.addChild(crystal);
            });
        };
        Crystal.prototype.GetCrystal = function () {
            // remove the crystal from the front of the pool
            var crystal = this._crystalPool.shift();
            // Define the default values for the crystal
            crystal.isActive = true;
            // push the crystal to the back of the pool
            this._crystalPool.push(crystal);
            // return a reference to the active crystal
            return crystal;
        };
        Crystal.prototype.Update = function () {
            this._crystalPool.forEach(function (crystal) {
                crystal.Update();
            });
        };
        // Constants
        Crystal.CRYSTAL_QUANTITY = 50;
        return Crystal;
    }());
    managers.Crystal = Crystal;
})(managers || (managers = {}));
//# sourceMappingURL=Crystal.js.map