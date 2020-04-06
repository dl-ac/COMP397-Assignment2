"use strict";
/*
 * File: objects/EnemyMovement.ts
 * Author: Ailton De Lima - 301018951
 * Description: POJO class of the enemy movement
 *
 * Created: 2020-04-06
 */
var objects;
(function (objects) {
    var EnemyMovement = /** @class */ (function () {
        // CONSTRUCTORS
        function EnemyMovement(tick, velocity, rotation) {
            if (velocity === void 0) { velocity = objects.Vector2.zero(); }
            if (rotation === void 0) { rotation = 0; }
            this._tick = tick;
            this._velocity = velocity;
            this._rotation = rotation;
        }
        Object.defineProperty(EnemyMovement.prototype, "Tick", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._tick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnemyMovement.prototype, "Velocity", {
            get: function () {
                return this._velocity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnemyMovement.prototype, "Rotation", {
            get: function () {
                return this._rotation;
            },
            enumerable: true,
            configurable: true
        });
        return EnemyMovement;
    }());
    objects.EnemyMovement = EnemyMovement;
})(objects || (objects = {}));
//# sourceMappingURL=EnemyMovement.js.map