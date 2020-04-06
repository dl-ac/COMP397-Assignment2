"use strict";
var enums;
(function (enums) {
    var GameObjectType;
    (function (GameObjectType) {
        GameObjectType[GameObjectType["BOSS"] = 0] = "BOSS";
        GameObjectType[GameObjectType["ENEMY"] = 1] = "ENEMY";
        GameObjectType[GameObjectType["ENEMY_BULLET"] = 2] = "ENEMY_BULLET";
        GameObjectType[GameObjectType["CRYSTAL"] = 3] = "CRYSTAL";
        GameObjectType[GameObjectType["CLOUD"] = 4] = "CLOUD";
        GameObjectType[GameObjectType["BACKGROUND"] = 5] = "BACKGROUND";
        GameObjectType[GameObjectType["BUTTON"] = 6] = "BUTTON";
        GameObjectType[GameObjectType["IMAGE"] = 7] = "IMAGE";
        GameObjectType[GameObjectType["PLAYER"] = 8] = "PLAYER";
        GameObjectType[GameObjectType["PLAYER_BULLET"] = 9] = "PLAYER_BULLET";
        GameObjectType[GameObjectType["UNDEFINED"] = 10] = "UNDEFINED";
        GameObjectType[GameObjectType["NUM_OF_TYPES"] = 11] = "NUM_OF_TYPES";
    })(GameObjectType = enums.GameObjectType || (enums.GameObjectType = {}));
})(enums || (enums = {}));
//# sourceMappingURL=GameObjectType.js.map