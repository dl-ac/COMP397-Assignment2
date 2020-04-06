/*
 * File: scenes/scenes.ts
 * Author: Ailton De Lima - 301018951
 * Description: Enumerate with all the scenes available in the game
 *
 * Created: 2020-04-06
 */
module scenes {
    export enum State {
        NO_SCENE = -1,
        START,
        INFO,
        PLAY,
        END,
        EXIT,
        NUM_OF_SCENES
    }
}
