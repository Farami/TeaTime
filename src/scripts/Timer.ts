/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/nanobar/nanobar.d.ts" />
/// <reference path="AudioElement.ts" />
/// <reference path="Helper.ts" />
"use strict";

class Timer {
  private parentDiv: HTMLElement;
  private timer: HTMLElement;
  private progressBar: HTMLElement;
  private nanoBar: Nanobar;
  private timerText: HTMLElement;
  private cancelButton: HTMLElement;

  private alarmSound: string;
  private interval: any;
  private time: number;
  timeLeft: number;

  constructor(timeLeft: number, parentDiv: HTMLElement, alarmSound: string) {
    this.parentDiv = parentDiv;
    this.timeLeft = timeLeft;
    this.time = timeLeft;
    this.alarmSound = alarmSound;

    this.timer = document.createElement("li");
    this.timer.classList.add("row", "list-group-item");

    // add progress bar to a parent div to limit width
    this.progressBar = document.createElement("div");
    this.progressBar.classList.add("col-md-11", "nanobar-container");

    this.timerText = document.createElement("span");
    this.timerText.classList.add("timer-text", "pull-right");

    this.nanoBar = new Nanobar({
      target: this.progressBar
    });

    // add button to a parent div to center right.
    var buttonParentDiv = document.createElement("div");
    buttonParentDiv.classList.add("pull-right");

    this.cancelButton = document.createElement("button");
    this.cancelButton.classList.add("btn", "btn-xs", "btn-danger");
    this.cancelButton.innerHTML = "Stop";
    this.cancelButton.addEventListener("click", () => { this.cancel(); });

    buttonParentDiv.appendChild(this.cancelButton);

    this.timer.appendChild(this.progressBar);
    this.timer.appendChild(buttonParentDiv);
    this.timer.appendChild(this.timerText);
    this.parentDiv.appendChild(this.timer);
  }

  start() {
    this.interval = setInterval(() => { this.update() }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  cancel() {
    this.stop();
    this.fadeOutAndRemove();
  }

  update() {
    this.timeLeft--;
    this.timerText.innerHTML = Helper.createTimeString(this.timeLeft);
    this.nanoBar.go(this.timeLeft * 100 / this.time);

    if (this.timeLeft <= 0) {
      this.stop();
      this.finished();
    }
  }

  finished() {
    this.cancelButton.remove();
    this.timerText.remove();
    this.progressBar.remove();

    var audio = new AudioElement(this.alarmSound);
    // play for three seconds
    audio.play();
    setTimeout(() => {
      audio.destroy();
    }, 3000);


    setTimeout(() => {
      this.fadeOutAndRemove();
    }, 3000);
  }

  private fadeOutAndRemove() {
    this.timer.classList.add("hidden");

    setTimeout(() => {
      this.timer.remove();
    }, 1000);
  }
}