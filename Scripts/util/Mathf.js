"use strict";
/*
 * File: util/Mathf.ts
 * Author: Ailton De Lima - 301018951
 * Description: Math static functions used along the game
 *
 * Created: 2020-04-06
 */
var util;
(function (util) {
    var Mathf = /** @class */ (function () {
        function Mathf() {
        }
        Mathf.Clamp = function (value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        };
        Mathf.Clamp01 = function (value) {
            if (value < 0.0) {
                return 0.0;
            }
            if (value > 1.0) {
                return 1.0;
            }
            return value;
        };
        Mathf.Lerp = function (a, b, t) {
            return a + (b - a) * Mathf.Clamp01(t);
        };
        Mathf.LerpUnclamped = function (a, b, t) {
            return a + (b - a) * t;
        };
        Mathf.RandomRange = function (min, max) {
            return Math.random() * (max - min + 1) + min;
        };
        Mathf.RandomRangeInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        return Mathf;
    }());
    util.Mathf = Mathf;
})(util || (util = {}));
//# sourceMappingURL=Mathf.js.map