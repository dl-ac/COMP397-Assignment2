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
        Game.PLAYER_LIVES = 5;
        Game.SCORE = 0;
        Game.HIGH_SCORE = 0;
        Game.TEXT_COLOR = "#e3f5f4";
        // Score values
        Game.SCORE_ENEMY_VALUE = 10;
        Game.SCORE_CRYSTAL_VALUE = 50;
        Game.SCORE_BOSS_VALUE = 500;
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map