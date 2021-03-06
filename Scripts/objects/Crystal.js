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
 * File: objects/Crystal.ts
 * Author: Ailton De Lima - 301018951
 * Description: Controls a single crystal. Reset when leaves the screen
 *
 * Created: 2020-04-06
 */
var objects;
(function (objects) {
    var Crystal = /** @class */ (function (_super) {
        __extends(Crystal, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Crystal() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "crystal", new objects.Vector2(), true) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Crystal.prototype._checkBounds = function () {
            if (this.x < -this.width) {
                this.Reset();
            }
        };
        Crystal.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Crystal.prototype.Start = function () {
            this.type = enums.GameObjectType.CRYSTAL;
            this._horizontalSpeed = -5; // 5 px per frame
            this.velocity = new objects.Vector2(this._horizontalSpeed, 0);
            this.Reset();
        };
        Crystal.prototype.Update = function () {
            if (this.isActive) {
                this._move();
                this._checkBounds();
            }
        };
        Crystal.prototype.Reset = function () {
            this.position = new objects.Vector2(-2000, -2000);
            this.isActive = false;
        };
        return Crystal;
    }(objects.GameObject));
    objects.Crystal = Crystal;
})(objects || (objects = {}));
//# sourceMappingURL=Crystal.js.map