"use strict";
var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        // constructor
        function ScoreBoard() {
            // Local constants
            this.START_PLAYER_LIVES = 10;
            this.START_BOSS_LIVES = 200;
            this.START_SCORE = 0;
            this._initialize();
        }
        Object.defineProperty(ScoreBoard.prototype, "PlayerLives", {
            // public properties
            get: function () {
                return this._playerLives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "BossLives", {
            get: function () {
                return this._bossLives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            get: function () {
                return this._score;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        ScoreBoard.prototype._initialize = function () {
            // Create the labels first
            this._scoreLabel = new objects.Label("0", "16px", "EthnocentricReg", config.Game.TEXT_COLOR, 202, 14);
            this._playerLives = this.START_PLAYER_LIVES;
            this._bossLives = this.START_BOSS_LIVES;
            this._score = this.START_SCORE;
            // Everytime that this is class created, reset the global variables
            config.Game.LIVES = this.PlayerLives;
            // Initialize the player health bar
            this._playerHealthTable = new objects.Image("playerHealthBar");
            this._playerHealthDots = new Array();
            var curPosX = 4;
            for (var iCt = 0; iCt < this.PlayerLives; iCt++) {
                this._playerHealthDots[iCt] = new objects.Image("playerHealthDot", curPosX, 4, false);
                curPosX += 16;
            }
            // Initialize the boss health bar
            this._bossHealthTable = new objects.Image("bossHealthBar", 320, 11);
            this._bossHealthDots = new Array();
            curPosX = this._bossHealthTable.position.x + 16;
            // Insert the first position as it is different from others
            this._bossHealthDots[0] = new objects.Image("bossHealthDotLeft", curPosX, 14, false);
            curPosX += this._bossHealthDots[0].width;
            // Add all the mid boss health bars
            var bossDots = this._bossLives / 10;
            bossDots--; // Remove the last one that will be added later
            for (var iCt = 1; iCt < bossDots; iCt++) {
                this._bossHealthDots[iCt] = new objects.Image("bossHealthDotMid", curPosX, 14, false);
                curPosX += this._bossHealthDots[iCt].width;
            }
            // Insert the last position as it is different from others
            this._bossHealthDots[this._bossHealthDots.length] = new objects.Image("bossHealthDotRight", curPosX, 14, false);
        };
        // Public methods
        ScoreBoard.prototype.GetPlayGameObjects = function () {
            var result = new Array();
            result.push(this._playerHealthTable);
            this._playerHealthDots.forEach(function (o) { return result.push(o); });
            result.push(this._scoreLabel);
            return result;
        };
        ScoreBoard.prototype.GetBossGameObjects = function () {
            var result = new Array();
            result.push(this._bossHealthTable);
            this._bossHealthDots.forEach(function (o) { return result.push(o); });
            return result;
        };
        ScoreBoard.prototype.DamagePlayer = function () {
            if (this._playerLives > 0) {
                this._playerLives--;
                config.Game.LIVES = this._playerLives;
                this._playerHealthDots[this._playerLives].alpha = 0;
            }
        };
        ScoreBoard.prototype.DamageBoss = function () {
            if (this._bossLives > 0) {
                this._bossLives--;
                var pos = Math.floor(this._bossLives / 10);
                this._bossHealthDots[pos].alpha -= 0.1;
            }
        };
        ScoreBoard.prototype.AddScore = function (value) {
            this._score += value;
            config.Game.SCORE = this._score;
            this._scoreLabel.text = this._score.toLocaleString("en-US", { maximumFractionDigits: 0 });
            if (config.Game.HIGH_SCORE < value) {
                config.Game.HIGH_SCORE = value;
            }
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=ScoreBoard.js.map