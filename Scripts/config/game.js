"use strict";
var config;
(function (config) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.SCREEN_WIDTH = 1024;
        Game.SCREEN_HEIGHT = 576;
        Game.GAMEBAR_HEIGHT = 36;
        Game.FPS = 60; // 60 Frames per second
        Game.CLOUD_NUM = 4;
        Game.LIVES = 5;
        Game.SCORE = 0;
        Game.HIGH_SCORE = 0;
        Game.TEXT_COLOR = "#e3f5f4";
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map