"use strict";
/*
 * File: enums/MovimentTypes.ts
 * Author: Ailton De Lima - 301018951
 * Description: Enumerate for Enemy Moviment Patterns
 *
 * Created: 2020-04-06
 */
var enums;
(function (enums) {
    var MovimentTypes;
    (function (MovimentTypes) {
        MovimentTypes[MovimentTypes["TL_TO_BR"] = 0] = "TL_TO_BR";
        MovimentTypes[MovimentTypes["BL_TO_TR"] = 1] = "BL_TO_TR";
        // U_AND_TL_TO_BR,
        // UINV_AND_BL_TO_BR,
        MovimentTypes[MovimentTypes["NUM_OF_MOVIMENTS"] = 2] = "NUM_OF_MOVIMENTS";
    })(MovimentTypes = enums.MovimentTypes || (enums.MovimentTypes = {}));
})(enums || (enums = {}));
//# sourceMappingURL=MovimentTypes.js.map