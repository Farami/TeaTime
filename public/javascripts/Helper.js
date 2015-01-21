"use strict";
var Helper = (function () {
    function Helper() {
    }
    Helper.createTimeString = function (timeLeft) {
        var date = new Date(null, null, null, null, null, timeLeft).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0].split(":");
        return date[1] + ":" + date[2];
    };
    return Helper;
})();
//# sourceMappingURL=Helper.js.map
