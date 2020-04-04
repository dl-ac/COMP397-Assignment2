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
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Background(backgroundName, verticalSpeed, loop) {
            if (verticalSpeed === void 0) { verticalSpeed = 0; }
            if (loop === void 0) { loop = false; }
            var _this = _super.call(this, config.Game.BACKGROUND_ATLAS, backgroundName) || this;
            _this._verticalSpeed = verticalSpeed;
            _this._loop = loop;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Background.prototype._checkBounds = function () {
            if (this.y >= 0) {
                if (this._loop) {
                    this.Reset();
                }
                else {
                    this._verticalSpeed = 0;
                    this.velocity = new objects.Vector2(0, 0);
                }
            }
        };
        Background.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Background.prototype.Start = function () {
            this.type = enums.GameObjectType.BACKGROUND;
            this.velocity = new objects.Vector2(0, this._verticalSpeed);
            this.Reset();
        };
        Background.prototype.Update = function () {
            if (this._verticalSpeed > 0) {
                this._move();
                this._checkBounds();
            }
        };
        Background.prototype.Reset = function () {
            this.position = new objects.Vector2(0, 0);
        };
        return Background;
    }(objects.GameObject));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=Background.js.map