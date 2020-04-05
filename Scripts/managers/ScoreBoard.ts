module managers {
    export class ScoreBoard {
        // Local constants
        private START_PLAYER_LIVES = 10;
        private START_BOSS_LIVES: number = 200;

        // private  instance members
        private _playerLives: number;
        private _bossLives: number;
        private _score: number;
        private _scoreLabel: objects.Label;

        private _playerHealthTable: objects.Image;
        private _playerHealthDots: Array<objects.Image>;

        private _bossHealthTable: objects.Image;
        private _bossHealthDots: Array<objects.Image>;

        // public properties
        public get PlayerLives(): number {
            return this._playerLives;
        }

        public set PlayerLives(v: number) {
            this._playerLives = v;
            config.Game.LIVES = this._playerLives;
        }

        public get Score(): number {
            return this._score;
        }

        public set Score(v: number) {
            this._score = v;
            config.Game.SCORE = this._score;
            this._scoreLabel.text = this._score.toLocaleString("en-US", { maximumFractionDigits: 0 });
        }

        // constructor
        constructor() {
            this._initialize();
        }

        // private methods
        private _initialize(): void {
            // Create the labels first
            this._scoreLabel = new objects.Label("999,999", "16px", "EthnocentricReg", config.Game.TEXT_COLOR, 202, 14);

            this._playerLives = this.START_PLAYER_LIVES;
            this._bossLives = this.START_BOSS_LIVES;
            this.Score = config.Game.SCORE;

            // Initialize the player health bar
            this._playerHealthTable = new objects.Image("playerHealthBar");
            this._playerHealthDots = new Array<objects.Image>();
            let curPosX = 4;
            for (let iCt = 0; iCt < this.PlayerLives; iCt++) {
                this._playerHealthDots[iCt] = new objects.Image("playerHealthDot", curPosX, 4, false);
                curPosX += 16;
            }

            // Initialize the boss health bar
            this._bossHealthTable = new objects.Image("bossHealthBar", 320, 11);
            this._bossHealthDots = new Array<objects.Image>();
            curPosX = this._bossHealthTable.position.x + 16;

            // Insert the first position as it is different from others
            this._bossHealthDots[0] = new objects.Image("bossHealthDotLeft", curPosX, 14, false);
            curPosX += this._bossHealthDots[0].width;

            // Add all the mid boss health bars
            let bossDots = this._bossLives / 10;
            bossDots--; // Remove the last one that will be added later
            for (let iCt = 1; iCt < bossDots; iCt++) {
                this._bossHealthDots[iCt] = new objects.Image("bossHealthDotMid", curPosX, 14, false);
                curPosX += this._bossHealthDots[iCt].width;
            }

            // Insert the last position as it is different from others
            this._bossHealthDots[this._bossHealthDots.length] = new objects.Image(
                "bossHealthDotRight",
                curPosX,
                14,
                false
            );
        }

        // Public methods
        public getPlayGameObjects(): Array<createjs.DisplayObject> {
            let result = new Array<createjs.DisplayObject>();

            result.push(this._playerHealthTable);
            this._playerHealthDots.forEach(o => result.push(o));

            result.push(this._scoreLabel);

            return result;
        }

        public getBossGameObjects(): Array<createjs.DisplayObject> {
            let result = new Array<createjs.DisplayObject>();

            result.push(this._bossHealthTable);
            this._bossHealthDots.forEach(o => result.push(o));

            return result;
        }

        public damagePlayer(): void {
            this._playerLives--;
            this._playerHealthDots[this._playerLives].alpha = 0;
        }

        public damageBoss(): void {
            this._bossLives--;

            let pos = Math.floor(this._bossLives / 10);
            this._bossHealthDots[pos].alpha -= 0.1;
        }
    }
}
