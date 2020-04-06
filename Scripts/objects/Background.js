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
 * File: objects/Background.ts
 * Author: Ailton De Lima - 301018951
 * Description: Background object for the play and others scenes
 *
 * Created: 2020-04-06
 */
var objects;
(function (objects) {
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Background(isMenu) {
            var _this = _super.call(this, config.Game.BACKGROUND_ATLAS, isMenu ? "menu" : "play") || this;
            if (isMenu) {
                _this.velocity = objects.Vector2.zero();
            }
            else {
                _this.velocity = new objects.Vector2(-0.05, 0);
            }
            _this.position = objects.Vector2.zero();
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Background.prototype._checkBounds = function () {
            if (this.x <= -(this.width - config.Game.SCREEN_WIDTH)) {
                if (this._loop) {
                    this.Reset();
                }
                else {
                    this.velocity = objects.Vector2.zero();
                }
            }
        };
        Background.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Background.prototype.Start = function () {
            this.type = enums.GameObjectType.BACKGROUND;
            this.Reset();
        };
        Background.prototype.Update = function () {
            if (this.velocity.x != 0 || this.velocity.y != 0) {
                this._move();
                this._checkBounds();
            }
        };
        Background.prototype.Reset = function () { };
        return Background;
    }(objects.GameObject));
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=Background.js.map