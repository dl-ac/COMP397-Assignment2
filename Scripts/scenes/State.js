"use strict";
/*
 * File: scenes/scenes.ts
 * Author: Ailton De Lima - 301018951
 * Description: Enumerate with all the scenes available in the game
 *
 * Created: 2020-04-06
 */
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["INFO"] = 1] = "INFO";
        State[State["PLAY"] = 2] = "PLAY";
        State[State["END"] = 3] = "END";
        State[State["EXIT"] = 4] = "EXIT";
        State[State["NUM_OF_SCENES"] = 5] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map