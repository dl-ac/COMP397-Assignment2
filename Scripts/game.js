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
    var soundManager;
    var assetManifest = [
        { id: "bgMenu", src: "./Assets/images/bgMenu.png" },
        { id: "bgPlay", src: "./Assets/images/bgPlay.png" },
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        // Game sounds
        { id: "bgSound", src: "./Assets/audio/background.mp3" },
        { id: "bossBullet", src: "./Assets/audio/bossBullet.wav" },
        { id: "bossExplosion", src: "./Assets/audio/bossExplosion.wav" },
        { id: "bossHit", src: "./Assets/audio/bossHit.wav" },
        { id: "bossIncoming", src: "./Assets/audio/bossIncoming.wav" },
        { id: "bossMissile", src: "./Assets/audio/bossMissile.wav" },
        { id: "crystal", src: "./Assets/audio/crystal.wav" },
        { id: "enemyExplosion", src: "./Assets/audio/enemyExplosion.wav" },
        { id: "playerBullet", src: "./Assets/audio/playerBullet.wav" },
        { id: "playerHit", src: "./Assets/audio/playerHit.wav" },
        { id: "playerExplosion", src: "./Assets/audio/playerExplosion.wav" }
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
            [0, 200, 118, 200, 0, 0, 0],
            [118, 200, 118, 200, 0, 0, 0],
            [236, 200, 118, 200, 0, 0, 0],
            [354, 200, 130, 200, 0, 0, 0],
            [484, 200, 131, 200, 0, 0, 0],
            [615, 200, 130, 200, 0, 0, 0],
            [745, 200, 130, 200, 0, 0, 0],
            [0, 400, 130, 200, 0, 0, 0],
            [130, 400, 130, 200, 0, 0, 0],
            [260, 400, 130, 200, 0, 0, 0],
            [390, 400, 130, 200, 0, 0, 0],
            [520, 400, 130, 200, 0, 0, 0],
            [650, 400, 130, 200, 0, 0, 0],
            [780, 400, 36, 18, 0, 0, 0],
            [0, 600, 127, 200, 0, 0, 0],
            [127, 600, 127, 200, 0, 0, 0],
            [254, 600, 127, 200, 0, 0, 0],
            [381, 600, 127, 200, 0, 0, 0],
            [508, 600, 127, 200, 0, 0, 0],
            [635, 600, 127, 200, 0, 0, 0],
            [762, 600, 127, 200, 0, 0, 0],
            [0, 800, 127, 200, 0, 0, 0],
            [127, 800, 127, 200, 0, 0, 0],
            [254, 800, 127, 200, 0, 0, 0],
            [381, 800, 140, 200, 0, 0, 0],
            [521, 800, 140, 200, 0, 0, 0],
            [661, 800, 140, 200, 0, 0, 0],
            [801, 800, 140, 200, 0, 0, 0],
            [0, 1000, 140, 200, 0, 0, 0],
            [140, 1000, 140, 200, 0, 0, 0],
            [280, 1000, 140, 200, 0, 0, 0],
            [420, 1000, 140, 200, 0, 0, 0],
            [560, 1000, 140, 200, 0, 0, 0],
            [700, 1000, 140, 200, 0, 0, 0],
            [0, 1200, 624, 18, 0, 0, 0],
            [624, 1200, 27, 12, 0, 0, 0],
            [651, 1200, 30, 12, 0, 0, 0],
            [681, 1200, 27, 12, 0, 0, 0],
            [708, 1200, 86, 30, 0, 0, 0],
            [794, 1200, 86, 30, 0, 0, 0],
            [0, 1230, 86, 30, 0, 0, 0],
            [86, 1230, 86, 30, 0, 0, 0],
            [172, 1230, 86, 30, 0, 0, 0],
            [258, 1230, 86, 30, 0, 0, 0],
            [344, 1230, 86, 30, 0, 0, 0],
            [430, 1230, 86, 30, 0, 0, 0],
            [516, 1230, 86, 30, 0, 0, 0],
            [602, 1230, 86, 30, 0, 0, 0],
            [688, 1230, 203, 60, 0, 0, 0],
            [0, 1290, 100, 100, 0, 0, 0],
            [100, 1290, 203, 60, 0, 0, 0],
            [303, 1290, 30, 30, 0, 0, 0],
            [333, 1290, 30, 30, 0, 0, 0],
            [363, 1290, 30, 30, 0, 0, 0],
            [393, 1290, 30, 30, 0, 0, 0],
            [423, 1290, 203, 60, 0, 0, 0],
            [626, 1290, 16, 25, 0, 0, 0],
            [643, 1290, 49, 40, 0, 0, 0],
            [691, 1290, 25, 10, 0, 0, 0],
            [716, 1290, 65, 65, 0, 0, 0],
            [781, 1290, 22, 10, 0, 0, 0],
            [803, 1290, 50, 88, 0, 0, 0],
            [853, 1290, 50, 88, 0, 0, 0],
            [0, 1390, 50, 88, 0, 0, 0],
            [50, 1390, 50, 88, 0, 0, 0],
            [100, 1390, 50, 88, 0, 0, 0],
            [150, 1390, 50, 88, 0, 0, 0],
            [200, 1390, 50, 88, 0, 0, 0],
            [250, 1390, 50, 88, 0, 0, 0],
            [300, 1390, 50, 88, 0, 0, 0],
            [350, 1390, 53, 50, 0, 0, 0],
            [403, 1390, 53, 50, 0, 0, 0],
            [456, 1390, 53, 50, 0, 0, 0],
            [509, 1390, 53, 50, 0, 0, 0],
            [562, 1390, 53, 50, 0, 0, 0],
            [615, 1390, 53, 50, 0, 0, 0],
            [668, 1390, 53, 50, 0, 0, 0],
            [721, 1390, 53, 50, 0, 0, 0],
            [774, 1390, 53, 50, 0, 0, 0],
            [827, 1390, 53, 50, 0, 0, 0],
            [0, 1478, 65, 50, 0, 0, 0],
            [65, 1478, 65, 50, 0, 0, 0],
            [130, 1478, 65, 50, 0, 0, 0],
            [195, 1478, 65, 50, 0, 0, 0],
            [260, 1478, 65, 50, 0, 0, 0],
            [325, 1478, 65, 50, 0, 0, 0],
            [390, 1478, 65, 50, 0, 0, 0],
            [455, 1478, 65, 50, 0, 0, 0],
            [520, 1478, 65, 50, 0, 0, 0],
            [585, 1478, 65, 50, 0, 0, 0],
            [650, 1478, 194, 34, 0, 0, 0],
            [844, 1478, 13, 26, 0, 0, 0]
        ],
        animations: {
            bossAttack1: {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                next: "bossFlight",
                speed: 0.2
            },
            bossAttack2Begin: {
                frames: [10, 11, 12, 13],
                next: "bossAttack2Mid",
                speed: 0.05
            },
            bossAttack2Mid: {
                frames: [14, 14, 15, 15],
                next: "bossAttack2End",
                speed: 0.2
            },
            bossAttack2End: {
                frames: [16, 17, 18, 19],
                next: "bossFlight",
                speed: 0.25
            },
            bossBullet: { frames: [20] },
            bossDeath: {
                frames: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                next: "bossDeathEnd",
                speed: 0.05
            },
            bossDeathEnd: { frames: 30 },
            bossFlight: {
                frames: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
                speed: 0.2
            },
            bossHealthBar: { frames: [41] },
            bossHealthDotLeft: { frames: [42] },
            bossHealthDotMid: { frames: [43] },
            bossHealthDotRight: { frames: [44] },
            bossMissile: { frames: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54] },
            buttonExit: { frames: [55] },
            buttonInfo: { frames: [56] },
            buttonMenu: { frames: [57] },
            buttonMusicOff: { frames: [58] },
            buttonMusicOn: { frames: [59] },
            buttonSoundOff: { frames: [60] },
            buttonSoundOn: { frames: [61] },
            buttonStart: { frames: [62] },
            crystal: { frames: [63] },
            enemy: { frames: [64] },
            enemyBullet: { frames: [65] },
            placeholder: { frames: [66] },
            playerBullet: { frames: [67] },
            playerDeath: {
                frames: [68, 69, 70, 71, 72, 73, 74, 75, 76],
                next: "playerDeathEnd",
                speed: 0.05
            },
            playerDeathEnd: { frames: 75 },
            playerFull: {
                frames: [77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
                speed: 0.5
            },
            playerHalf: { frames: [87, 88, 89, 90, 91, 92, 93, 94, 95, 96] },
            playerHealthBar: { frames: [97] },
            playerHealthDot: { frames: [98] }
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
        soundManager = new managers.Sound();
        config.Game.SOUND_MANAGER = soundManager;
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
        soundManager.AddObjectsToScene(currentScene);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map