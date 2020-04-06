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
 * File: objects/Scene.ts
 * Author: Ailton De Lima - 301018951
 * Description: Container to hold a specific scene information
 *
 * Created: 2020-04-06
 */
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // PRIVATE INSTANCE MEMBERS
        // PUBLIC PROPERTIS
        // CONSTRUCTOR
        function Scene() {
            return _super.call(this) || this;
        }
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=Scene.js.map