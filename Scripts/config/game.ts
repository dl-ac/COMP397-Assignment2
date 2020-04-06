module config {
    export class Game {
        public static SCREEN_WIDTH: number = 1024;
        public static SCREEN_HEIGHT: number = 576;
        public static GAMEBAR_HEIGHT: number = 36;
        public static SCENE_STATE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static CLOUD_NUM: number = 4;
        public static LIVES: number = 5;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static BULLET_MANAGER: managers.Bullet;
        public static KEYBOARD_MANAGER: managers.Keyboard;
        public static TEXTURE_ATLAS: createjs.SpriteSheet;
        public static BACKGROUND_ATLAS: createjs.SpriteSheet;
        public static TEXT_COLOR: string = "#e3f5f4";
        public static GAME_MUSIC: boolean;
        public static GAME_SOUND: boolean;

        // Score values
        public static SCORE_ENEMY: 10;
        public static SCORE_CRYSTAL_VALUE: 50;
        public static SCORE_BOSS: 500;
    }
}
