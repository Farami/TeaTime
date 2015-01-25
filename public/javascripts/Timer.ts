"use strict";

class Timer {
    private parentDiv: JQuery;
    private timer: JQuery;
    private progressBar: JQuery;
    private timerText: JQuery;
    private cancelButton: JQuery;
    private text: JQuery;

    private alarmSound: string;
    private interval: any;
    private time: number;
    timeLeft: number;

    constructor(timeLeft: number, parentDiv: JQuery, alarmSound: string) {
        this.parentDiv = parentDiv;
        this.timeLeft = timeLeft;
        this.time = timeLeft;
        this.alarmSound = alarmSound;

        this.timer = $(document.createElement("li"));
        this.timer.addClass("list-group-item");
        this.timer.addClass("row");

        // add progress bar to a parent div to limit width
        var progressBarParentDiv = $(document.createElement("div"));
        progressBarParentDiv.addClass("col-md-11");

        this.progressBar = $(document.createElement("div"));
        this.progressBar.addClass("progress-bar progress-bar-success");
        this.progressBar.attr("role", "progressbar");
        this.progressBar.attr("aria-valuenow", this.timeLeft);
        this.progressBar.attr("aria-valuemin", "0");
        this.progressBar.attr("aria-valuemax", this.time);

        // add button to a parent div to center right.
        var buttonParentDiv = $(document.createElement("div"));
        buttonParentDiv.addClass("col-md-1 text-right");

        this.cancelButton = $(document.createElement("button"));
        this.cancelButton.addClass("btn btn-xs btn-danger");
        this.cancelButton.attr("type", "button");
        this.cancelButton.attr("aria-hidden", "true");
        this.cancelButton.html("Stop");
        this.cancelButton.click(() => { this.cancel(); });

        buttonParentDiv.append(this.cancelButton);
        progressBarParentDiv.append(this.progressBar);

        this.timer.append(progressBarParentDiv);
        this.timer.append(buttonParentDiv);
        this.parentDiv.append(this.timer);
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
        this.progressBar.html(Helper.createTimeString(this.timeLeft));
        this.progressBar.attr("aria-valuenow", this.timeLeft);
        this.progressBar.css("width", (this.timeLeft * 100 / this.time) + "%");

        if (this.timeLeft <= 0) {
            this.stop();
            this.finished();
        }
    }

    finished() {
        this.timer.addClass("list-group-item-danger");
        this.cancelButton.remove();

        var audio = new AudioElement(this.alarmSound);
        // play for three seconds
        audio.play();
        setTimeout(() => {
            audio.destroy();
        }, 3000);

        setInterval(() => {
            this.blinker();
        }, 500);

        setTimeout(() => {
            this.fadeOutAndRemove();
        }, 3000);
    }

    private blinker() {
        this.timer.fadeOut(500);
        this.timer.fadeIn(500);
    }

    private fadeOutAndRemove() {
        this.timer.fadeOut(1000, () => { this.timer.remove(); });
    }
}