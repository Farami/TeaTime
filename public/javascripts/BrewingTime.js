/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
"use strict";
(function () {
    $(".StartTimer").click(function (e) {
        var brewingTimers = $("#BrewingTimers");

        var brewingTime = parseInt($(e.currentTarget).data("time"), 10);
        var name = $("#TimerName").val();
        var timer = new Timer(brewingTime, brewingTimers, name !== "" ? name : null);
        timer.start();
    });
})();
//# sourceMappingURL=BrewingTime.js.map
