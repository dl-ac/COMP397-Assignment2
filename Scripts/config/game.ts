/*
 * File: config/Game.ts
 * Author: Ailton De Lima - 301018951
 * Description: Holds all the program global variables
 *
 * Created: 2020-04-06
 */
module config {
    export class Game {
        public static SCREEN_WIDTH: number = 1024;
        public static SCREEN_HEIGHT: number = 576;
        public static GAMEBAR_HEIGHT: number = 36;
        public static SCENE_STATE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static CLOUD_NUM: number = 4;
        public static PLAYER_LIVES: number = 5;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static SOUND_MANAGER: managers.Sound;
        public static BULLET_MANAGER: managers.Bullet;
        public static KEYBOARD_MANAGER: managers.Keyboard;
        public static ENEMY_MANAGER: managers.Enemy;
        public static TEXTURE_ATLAS: createjs.SpriteSheet;
        public static BACKGROUND_ATLAS: createjs.SpriteSheet;
        public static TEXT_COLOR: string = "#e3f5f4";
        public static BACKGROUND_SOUND: createjs.AbstractSoundInstance;

        // Score values
        public static SCORE_ENEMY_VALUE: number = 10;
        public static SCORE_CRYSTAL_VALUE: number = 50;
        public static SCORE_BOSS_VALUE: number = 500;
    }
}
