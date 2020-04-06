"use strict";
var managers;
(function (managers) {
    var Sound = /** @class */ (function () {
        // CONSTRUCTOR
        function Sound() {
            var _this = this;
            // Create the background sound
            this._background = createjs.Sound.play("bgSound", { loop: -1, volume: 0.015 });
            this._music = true;
            this._sound = true;
            // Button which will appear in all scenes (Added by main game.ts)
            this._buttonMusic = new objects.Button("buttonMusicOn", config.Game.SCREEN_WIDTH - 55, 20, true);
            this._buttonSound = new objects.Button("buttonSoundOn", config.Game.SCREEN_WIDTH - 20, 20, true);
            // Event to handle the music
            this._buttonMusic.on("click", function () {
                _this._music = !_this._music;
                _this._buttonMusic.gotoAndStop("buttonMusic" + (_this._music ? "On" : "Off"));
                _this._background.paused = !_this._music;
            });
            // Event to handle the sounds
            this._buttonSound.on("click", function () {
                _this._sound = !_this._sound;
                _this._buttonSound.gotoAndStop("buttonSound" + (_this._sound ? "On" : "Off"));
            });
        }
        Sound.prototype.AddObjectsToScene = function (scene) {
            // Added both button on the top left of the scenes
            scene.addChild(this._buttonMusic);
            scene.addChild(this._buttonSound);
        };
        Sound.prototype.PlaySound = function (soundName, volume, loop) {
            if (loop === void 0) { loop = 0; }
            if (this._sound) {
                createjs.Sound.play(soundName, { loop: loop, volume: volume });
            }
        };
        return Sound;
    }());
    managers.Sound = Sound;
})(managers || (managers = {}));
//# sourceMappingURL=Sound.js.map