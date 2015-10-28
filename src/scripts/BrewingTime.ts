/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="Timer.ts" />
"use strict";

(() => {
  var timerButtons = document.getElementsByClassName("StartTimer");
  var brewingTimerDiv = document.getElementById("BrewingTimers");

  for (var i = 0; i < timerButtons.length; i++) {
    timerButtons[i].addEventListener("click", e => {
      var brewingTime = parseInt(e.srcElement.getAttribute("data-time"), 10);
      var timer = new Timer(brewingTime, brewingTimerDiv, "sounds/AlarmSound.mp3");
      timer.start();
    });
  }
})();