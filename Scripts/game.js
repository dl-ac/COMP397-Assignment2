"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var textureAtlas;
    var backgroundAtlas;
    var buttonMusic;
    var buttonSound;
    var assetManifest = [
        { id: "bgMenu", src: "./Assets/images/bgMenu.png" },
        { id: "bgPlay", src: "./Assets/images/bgPlay.png" },
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" }
    ];
    var itemSpriteData = {
        images: {},
        frames: [
            [0, 0, 118, 200, 0, 0, 0],
            [118, 0, 118, 200, 0, 0, 0],
            [236, 0, 118, 200, 0, 0, 0],
            [354, 0, 118, 200, 0, 0, 0],
            [472, 0, 118, 200, 0, 0, 0],
            [590, 0, 118, 200, 0, 0, 0],
            [708, 0, 118, 200, 0, 0, 0],
            [826, 0, 118, 200, 0, 0, 0],
            [944, 0, 118, 200, 0, 0, 0],
            [1062, 0, 118, 200, 0, 0, 0],
            [1180, 0, 130, 200, 0, 0, 0],
            [1310, 0, 131, 200, 0, 0, 0],
            [1441, 0, 130, 200, 0, 0, 0],
            [1571, 0, 130, 200, 0, 0, 0],
            [1701, 0, 130, 200, 0, 0, 0],
            [1831, 0, 130, 200, 0, 0, 0],
            [0, 200, 130, 200, 0, 0, 0],
            [130, 200, 130, 200, 0, 0, 0],
            [260, 200, 130, 200, 0, 0, 0],
            [390, 200, 130, 200, 0, 0, 0],
            [520, 200, 36, 18, 0, 0, 0],
            [556, 200, 127, 200, 0, 0, 0],
            [683, 200, 127, 200, 0, 0, 0],
            [810, 200, 127, 200, 0, 0, 0],
            [937, 200, 127, 200, 0, 0, 0],
            [1064, 200, 127, 200, 0, 0, 0],
            [1191, 200, 127, 200, 0, 0, 0],
            [1318, 200, 127, 200, 0, 0, 0],
            [1445, 200, 127, 200, 0, 0, 0],
            [1572, 200, 127, 200, 0, 0, 0],
            [1699, 200, 127, 200, 0, 0, 0],
            [1826, 200, 140, 200, 0, 0, 0],
            [0, 400, 140, 200, 0, 0, 0],
            [140, 400, 140, 200, 0, 0, 0],
            [280, 400, 140, 200, 0, 0, 0],
            [420, 400, 140, 200, 0, 0, 0],
            [560, 400, 140, 200, 0, 0, 0],
            [700, 400, 140, 200, 0, 0, 0],
            [840, 400, 140, 200, 0, 0, 0],
            [980, 400, 140, 200, 0, 0, 0],
            [1120, 400, 140, 200, 0, 0, 0],
            [1260, 400, 624, 18, 0, 0, 0],
            [1884, 400, 27, 12, 0, 0, 0],
            [1911, 400, 30, 12, 0, 0, 0],
            [0, 600, 27, 12, 0, 0, 0],
            [27, 600, 86, 30, 0, 0, 0],
            [113, 600, 86, 30, 0, 0, 0],
            [199, 600, 86, 30, 0, 0, 0],
            [285, 600, 86, 30, 0, 0, 0],
            [371, 600, 86, 30, 0, 0, 0],
            [457, 600, 86, 30, 0, 0, 0],
            [543, 600, 86, 30, 0, 0, 0],
            [629, 600, 86, 30, 0, 0, 0],
            [715, 600, 86, 30, 0, 0, 0],
            [801, 600, 86, 30, 0, 0, 0],
            [887, 600, 203, 60, 0, 0, 0],
            [1090, 600, 100, 100, 0, 0, 0],
            [1190, 600, 203, 60, 0, 0, 0],
            [1393, 600, 30, 30, 0, 0, 0],
            [1423, 600, 30, 30, 0, 0, 0],
            [1453, 600, 30, 30, 0, 0, 0],
            [1483, 600, 30, 30, 0, 0, 0],
            [1513, 600, 203, 60, 0, 0, 0],
            [1716, 600, 49, 40, 0, 0, 0],
            [1765, 600, 25, 10, 0, 0, 0],
            [1790, 600, 65, 65, 0, 0, 0],
            [1855, 600, 22, 10, 0, 0, 0],
            [1877, 600, 50, 88, 0, 0, 0],
            [0, 700, 50, 88, 0, 0, 0],
            [50, 700, 50, 88, 0, 0, 0],
            [100, 700, 50, 88, 0, 0, 0],
            [150, 700, 50, 88, 0, 0, 0],
            [200, 700, 50, 88, 0, 0, 0],
            [250, 700, 50, 88, 0, 0, 0],
            [300, 700, 50, 88, 0, 0, 0],
            [350, 700, 50, 88, 0, 0, 0],
            [400, 700, 53, 50, 0, 0, 0],
            [453, 700, 53, 50, 0, 0, 0],
            [506, 700, 53, 50, 0, 0, 0],
            [559, 700, 53, 50, 0, 0, 0],
            [612, 700, 53, 50, 0, 0, 0],
            [665, 700, 53, 50, 0, 0, 0],
            [718, 700, 53, 50, 0, 0, 0],
            [771, 700, 53, 50, 0, 0, 0],
            [824, 700, 53, 50, 0, 0, 0],
            [877, 700, 53, 50, 0, 0, 0],
            [930, 700, 65, 50, 0, 0, 0],
            [995, 700, 65, 50, 0, 0, 0],
            [1060, 700, 65, 50, 0, 0, 0],
            [1125, 700, 65, 50, 0, 0, 0],
            [1190, 700, 65, 50, 0, 0, 0],
            [1255, 700, 65, 50, 0, 0, 0],
            [1320, 700, 65, 50, 0, 0, 0],
            [1385, 700, 65, 50, 0, 0, 0],
            [1450, 700, 65, 50, 0, 0, 0],
            [1515, 700, 65, 50, 0, 0, 0],
            [1580, 700, 194, 34, 0, 0, 0],
            [1774, 700, 13, 26, 0, 0, 0]
        ],
        animations: {
            bossAttack1: {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                next: "bossFlight",
                speed: 0.2
            },
            bossAttack2: {
                frames: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                next: "bossFlight",
                speed: 0.2
            },
            bossAttack2Begin: {
                frames: [10, 11, 12, 13],
                next: "bossAttack2Mid",
                speed: 0.25
            },
            bossAttack2Mid: {
                frames: [14, 14, 15, 15],
                next: "bossAttack2End",
                speed: 0.5
            },
            bossAttack2End: {
                frames: [16, 17, 18, 19],
                next: "bossFlight",
                speed: 0.25
            },
            bossBullet: { frames: [20] },
            bossDeath: {
                frames: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                next: 30,
                speed: 0.5
            },
            bossFlight: {
                frames: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
                speed: 0.2
            },
            bossHealthBar: { frames: [41] },
            bossHealthDotLeft: { frames: [42] },
            bossHealthDotMid: { frames: [43] },
            bossHealthDotRight: { frames: [44] },
            bossMissile: {
                frames: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                speed: 0.25
            },
            buttonExit: { frames: [55] },
            buttonInfo: { frames: [56] },
            buttonMenu: { frames: [57] },
            buttonMusicOff: { frames: [58] },
            buttonMusicOn: { frames: [59] },
            buttonSoundOff: { frames: [60] },
            buttonSoundOn: { frames: [61] },
            buttonStart: { frames: [62] },
            enemy: { frames: [63] },
            enemyBullet: { frames: [64] },
            placeholder: { frames: [65] },
            playerBullet: { frames: [66] },
            playerDeath: {
                frames: [67, 68, 69, 70, 71, 72, 73, 74, 75],
                speed: 0.5
            },
            playerFull: {
                frames: [76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
                speed: 0.5
            },
            playerHalf: {
                frames: [86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
                speed: 0.5
            },
            playerHealthBar: { frames: [96] },
            playerHealthDot: { frames: [97] }
        }
    };
    var backgroundData = {
        images: {},
        frames: [
            [0, 0, 1024, 576, 0],
            [0, 0, 1600, 576, 1]
        ],
        animations: {
            menu: 0,
            play: 1
        }
    };
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        itemSpriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(itemSpriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;
        backgroundData.images = [assets.getResult("bgMenu"), assets.getResult("bgPlay")];
        backgroundAtlas = new createjs.SpriteSheet(backgroundData);
        config.Game.BACKGROUND_ATLAS = backgroundAtlas;
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE_STATE = scenes.State.START;
        buttonMusic = new objects.Button("buttonMusicOn", config.Game.SCREEN_WIDTH - 55, 20, true);
        buttonSound = new objects.Button("buttonSoundOn", config.Game.SCREEN_WIDTH - 20, 20, true);
        config.Game.GAME_MUSIC = true;
        config.Game.GAME_SOUND = true;
        buttonMusic.on("click", function () {
            config.Game.GAME_MUSIC = !config.Game.GAME_MUSIC;
            buttonMusic.gotoAndStop("buttonMusic" + (config.Game.GAME_MUSIC ? "On" : "Off"));
        });
        buttonSound.on("click", function () {
            config.Game.GAME_SOUND = !config.Game.GAME_SOUND;
            buttonSound.gotoAndStop("buttonSound" + (config.Game.GAME_SOUND ? "On" : "Off"));
        });
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.Clean();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE_STATE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.INFO:
                console.log("switch to Instructions Scene");
                currentScene = new scenes.Instructions();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
            case scenes.State.EXIT:
                console.log("switch to Exit Game Scene");
                currentScene = new scenes.ExitGame();
                break;
        }
        currentSceneState = config.Game.SCENE_STATE;
        stage.addChild(currentScene);
        currentScene.addChild(buttonMusic);
        currentScene.addChild(buttonSound);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map