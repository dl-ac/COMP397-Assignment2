//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function() {
    // variable declarations
    let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage: createjs.Stage;

    let currentSceneState: scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let textureAtlas: createjs.SpriteSheet;
    let backgroundAtlas: createjs.SpriteSheet;

    let buttonMusic: objects.Button;
    let buttonSound: objects.Button;

    let assetManifest = [
        { id: "bgMenu", src: "./Assets/images/bgMenu.png" },
        { id: "bgPlay", src: "./Assets/images/bgPlay.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },

        // Will be added to an atlas later
        { id: "buttonExit", src: "./Assets/images/btnExit.png" },
        { id: "buttonInfo", src: "./Assets/images/btnInfo.png" },
        { id: "buttonMenu", src: "./Assets/images/btnMenu.png" },
        { id: "buttonStart", src: "./Assets/images/btnStart.png" },
        { id: "planeFull0", src: "./Assets/images/PlaneFull_0.png" },
        { id: "planeFull1", src: "./Assets/images/PlaneFull_1.png" },
        { id: "planeFull2", src: "./Assets/images/PlaneFull_2.png" },
        { id: "planeFull3", src: "./Assets/images/PlaneFull_3.png" },
        { id: "planeFull4", src: "./Assets/images/PlaneFull_4.png" },
        { id: "planeFull5", src: "./Assets/images/PlaneFull_5.png" },
        { id: "planeFull6", src: "./Assets/images/PlaneFull_6.png" },
        { id: "planeFull7", src: "./Assets/images/PlaneFull_7.png" },
        { id: "planeFull8", src: "./Assets/images/PlaneFull_8.png" },
        { id: "planeFull9", src: "./Assets/images/PlaneFull_9.png" },
        { id: "planeHalf0", src: "./Assets/images/PlaneHalf_0.png" },
        { id: "planeHalf1", src: "./Assets/images/PlaneHalf_1.png" },
        { id: "planeHalf2", src: "./Assets/images/PlaneHalf_2.png" },
        { id: "planeHalf3", src: "./Assets/images/PlaneHalf_3.png" },
        { id: "planeHalf4", src: "./Assets/images/PlaneHalf_4.png" },
        { id: "planeHalf5", src: "./Assets/images/PlaneHalf_5.png" },
        { id: "planeHalf6", src: "./Assets/images/PlaneHalf_6.png" },
        { id: "planeHalf7", src: "./Assets/images/PlaneHalf_7.png" },
        { id: "planeHalf8", src: "./Assets/images/PlaneHalf_8.png" },
        { id: "planeHalf9", src: "./Assets/images/PlaneHalf_9.png" },
        { id: "bulletPlayer", src: "./Assets/images/bulletPlayer.png" },
        { id: "healthBar", src: "./Assets/images/healthBarTable.png" },
        { id: "healthDot", src: "./Assets/images/healthDot.png" },
        { id: "buttonMusicOff", src: "./Assets/images/btnMusicOff.png" },
        { id: "buttonMusicOn", src: "./Assets/images/btnMusicOn.png" },
        { id: "buttonSoundOff", src: "./Assets/images/btnSoundOff.png" },
        { id: "buttonSoundOn", src: "./Assets/images/btnSoundOn.png" },
        { id: "bossHealthBar", src: "./Assets/images/bossHealthBar.png" },
        { id: "bossHealthDotL", src: "./Assets/images/bossHealthDotLeft.png" },
        { id: "bossHealthDotM", src: "./Assets/images/bossHealthDotMid.png" },
        { id: "bossHealthDotR", src: "./Assets/images/bossHealthDotRight.png" }
    ];

    let itemSpriteData = {
        images: {},

        frames: [
            [0, 0, 203, 60, 0],
            [0, 0, 100, 100, 1],
            [0, 0, 203, 60, 2],
            [0, 0, 203, 60, 3],
            [0, 0, 53, 50, 4],
            [0, 0, 53, 50, 5],
            [0, 0, 53, 50, 6],
            [0, 0, 53, 50, 7],
            [0, 0, 53, 50, 8],
            [0, 0, 53, 50, 9],
            [0, 0, 53, 50, 10],
            [0, 0, 53, 50, 11],
            [0, 0, 53, 50, 12],
            [0, 0, 53, 50, 13],
            [0, 0, 65, 50, 14],
            [0, 0, 65, 50, 15],
            [0, 0, 65, 50, 16],
            [0, 0, 65, 50, 17],
            [0, 0, 65, 50, 18],
            [0, 0, 65, 50, 19],
            [0, 0, 65, 50, 20],
            [0, 0, 65, 50, 21],
            [0, 0, 65, 50, 22],
            [0, 0, 65, 50, 23],
            [0, 0, 22, 18, 24],
            [0, 0, 194, 34, 25],
            [0, 0, 13, 26, 26],
            [0, 0, 30, 30, 27],
            [0, 0, 30, 30, 28],
            [0, 0, 30, 30, 29],
            [0, 0, 30, 30, 30],
            [0, 0, 624, 18, 31],
            [0, 0, 27, 12, 32],
            [0, 0, 30, 12, 33],
            [0, 0, 27, 12, 34]
        ],

        animations: {
            buttonExit: 0,
            buttonInfo: 1,
            buttonMenu: 2,
            buttonStart: 3,
            planeFull: {
                frames: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                speed: 0.5
            },
            planeHalf: {
                frames: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                speed: 0.5
            },
            bulletPlayer: 24,
            healthBar: 25,
            healthDot: 26,
            buttonMusicOff: 27,
            buttonMusicOn: 28,
            buttonSoundOff: 29,
            buttonSoundOn: 30,
            bossHealthBar: 31,
            bossHealthDotLeft: 32,
            bossHealthDotMid: 33,
            bossHealthDotRight: 34
        }
    };

    let backgroundData = {
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

    function Preload(): void {
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
    function Start(): void {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);

        itemSpriteData.images = [
            assets.getResult("buttonExit"),
            assets.getResult("buttonInfo"),
            assets.getResult("buttonMenu"),
            assets.getResult("buttonStart"),
            assets.getResult("planeFull0"),
            assets.getResult("planeFull1"),
            assets.getResult("planeFull2"),
            assets.getResult("planeFull3"),
            assets.getResult("planeFull4"),
            assets.getResult("planeFull5"),
            assets.getResult("planeFull6"),
            assets.getResult("planeFull7"),
            assets.getResult("planeFull8"),
            assets.getResult("planeFull9"),
            assets.getResult("planeHalf0"),
            assets.getResult("planeHalf1"),
            assets.getResult("planeHalf2"),
            assets.getResult("planeHalf3"),
            assets.getResult("planeHalf4"),
            assets.getResult("planeHalf5"),
            assets.getResult("planeHalf6"),
            assets.getResult("planeHalf7"),
            assets.getResult("planeHalf8"),
            assets.getResult("planeHalf9"),
            assets.getResult("bulletPlayer"),
            assets.getResult("healthBar"),
            assets.getResult("healthDot"),
            assets.getResult("buttonMusicOff"),
            assets.getResult("buttonMusicOn"),
            assets.getResult("buttonSoundOff"),
            assets.getResult("buttonSoundOn"),
            assets.getResult("bossHealthBar"),
            assets.getResult("bossHealthDotL"),
            assets.getResult("bossHealthDotM"),
            assets.getResult("bossHealthDotR")
        ];
        textureAtlas = new createjs.SpriteSheet(itemSpriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        backgroundData.images = [assets.getResult("bgMenu"), assets.getResult("bgPlay")];
        backgroundAtlas = new createjs.SpriteSheet(backgroundData);
        config.Game.BACKGROUND_ATLAS = backgroundAtlas;

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;

        buttonMusic = new objects.Button("buttonMusicOn", config.Game.SCREEN_WIDTH - 55, 20, true);
        buttonSound = new objects.Button("buttonSoundOn", config.Game.SCREEN_WIDTH - 20, 20, true);

        config.Game.GAME_MUSIC = true;
        config.Game.GAME_SOUND = true;

        buttonMusic.on("click", () => {
            config.Game.GAME_MUSIC = !config.Game.GAME_MUSIC;
            buttonMusic.gotoAndStop(`buttonMusic${config.Game.GAME_MUSIC ? "On" : "Off"}`);
        });

        buttonSound.on("click", () => {
            config.Game.GAME_SOUND = !config.Game.GAME_SOUND;
            buttonSound.gotoAndStop(`buttonSound${config.Game.GAME_SOUND ? "On" : "Off"}`);
        });
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update(): void {
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
    function Main(): void {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

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

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
        currentScene.addChild(buttonMusic);
        currentScene.addChild(buttonSound);
    }

    window.addEventListener("load", Preload);
})();
