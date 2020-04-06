"use strict";
var objects;
(function (objects) {
    var EnemyMoviment = /** @class */ (function () {
        // CONSTRUCTORS
        function EnemyMoviment(tick, velocity, rotation) {
            if (velocity === void 0) { velocity = objects.Vector2.zero(); }
            if (rotation === void 0) { rotation = 0; }
            this._tick = tick;
            this._velocity = velocity;
            this._rotation = rotation;
        }
        Object.defineProperty(EnemyMoviment.prototype, "Tick", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._tick;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnemyMoviment.prototype, "Velocity", {
            get: function () {
                return this._velocity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnemyMoviment.prototype, "Rotation", {
            get: function () {
                return this._rotation;
            },
            enumerable: true,
            configurable: true
        });
        return EnemyMoviment;
    }());
    objects.EnemyMoviment = EnemyMoviment;
})(objects || (objects = {}));
//# sourceMappingURL=EnemyMoviment.js.map