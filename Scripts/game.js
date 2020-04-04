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
    var assetManifest = [
        { id: "bgMenu", src: "./Assets/images/bgMenu.png" },
        { id: "bgPlay", src: "./Assets/images/bgPlay.png" },
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },
        // Will be added to an atlas later
        { id: "buttonExit", src: "./Assets/images/btnExit.png" },
        { id: "buttonInfo", src: "./Assets/images/btnInfo.png" },
        { id: "buttonStart", src: "./Assets/images/btnStart.png" }
    ];
    var spriteData = {
        images: {},
        frames: [
            [1, 1, 16, 16, 0, 0, 0],
            [19, 1, 150, 50, 0, 0, 0],
            [1, 53, 226, 178, 0, 0, 0],
            [229, 53, 62, 63, 0, 0, 0],
            [1, 233, 65, 65, 0, 0, 0],
            [68, 233, 65, 65, 0, 0, 0],
            [135, 233, 65, 65, 0, 0, 0],
            [202, 233, 65, 65, 0, 0, 0],
            [1, 300, 150, 50, 0, 0, 0],
            [153, 300, 150, 50, 0, 0, 0]
        ],
        animations: {
            bullet: { frames: [0] },
            button: { frames: [1] },
            cloud: { frames: [2] },
            island: { frames: [3] },
            placeholder: { frames: [4] },
            plane: {
                frames: [5, 6, 7],
                speed: 0.5
            },
            restartButton: { frames: [8] },
            startButton: { frames: [9] }
        }
    };
    var itemSpriteData = {
        images: {},
        frames: [
            [1, 1, 203, 60, 0],
            [1, 1, 100, 100, 1],
            [1, 1, 203, 60, 2]
        ],
        animations: {
            buttonExit: 0,
            buttonInfo: 1,
            buttonStart: 2
        }
    };
    var backgroundData = {
        images: {},
        frames: [
            [0, 0, 1024, 576, 0, 0, 0],
            [0, 0, 1600, 576, 1, 0, 0]
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
        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;
        itemSpriteData.images = [
            assets.getResult("buttonExit"),
            assets.getResult("buttonInfo"),
            assets.getResult("buttonStart")
        ];
        textureAtlas = new createjs.SpriteSheet(itemSpriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;
        backgroundData.images = [assets.getResult("bgMenu"), assets.getResult("bgPlay")];
        backgroundAtlas = new createjs.SpriteSheet(backgroundData);
        config.Game.BACKGROUND_ATLAS = backgroundAtlas;
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
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
        switch (config.Game.SCENE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map