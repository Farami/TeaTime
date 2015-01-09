"use strict";

class Timer {
    private parentDiv: JQuery;
    private timer: JQuery;
    private progressBar: JQuery;
    private timerText: JQuery;
    private cancelButton: JQuery;
    private text: JQuery;

    private interval: any;
    private time: number;
    timeLeft: number;

    constructor(timeLeft: number, parentDiv: JQuery, text?: string) {
        this.parentDiv = parentDiv;
        this.timeLeft = timeLeft;
        this.time = timeLeft;

        this.timer = $(document.createElement("li"));
        this.timer.addClass("list-group-item");
        this.timer.addClass("row");

        var progressBarParentDiv = $(document.createElement("div"));

        this.progressBar = $(document.createElement("div"));
        this.progressBar.addClass("progress-bar progress-bar-success");
        this.progressBar.attr("role", "progressbar");
        this.progressBar.attr("aria-valuenow", this.timeLeft);
        this.progressBar.attr("aria-valuemin", "0");
        this.progressBar.attr("aria-valuemax", this.time);
        this.progressBar.css("min-height", "20px");
        this.progressBar.css("width", "100%");

        this.cancelButton = $(document.createElement("button"));
        this.cancelButton.addClass("btn btn-xs btn-danger");
        this.cancelButton.attr("type", "button");
        this.cancelButton.attr("aria-hidden", "true");
        this.cancelButton.html("Stop");
        this.cancelButton.click(() => { this.cancel(); });

        if (text != null) {
            this.text = $(document.createElement("span"));

            if (text.length < 13) {
                this.text.addClass("col-md-1");
                progressBarParentDiv.addClass("col-md-10");
            } else {
                this.text.addClass("col-md-2");
                progressBarParentDiv.addClass("col-md-9");

                if (text.length > 24) {
                    text = text.substring(0, 22) + "...";
                }
            }
            this.text.html(text);
            this.timer.append(this.text);
        } else {
            progressBarParentDiv.addClass("col-md-11");
        }

        // add progress bar to a parent div to limit width
        progressBarParentDiv.append(this.progressBar);

        this.timer.append(progressBarParentDiv);
        this.timer.append(this.cancelButton);
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

        var audio = new AudioElement("sounds/AlarmSound.mp3");
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