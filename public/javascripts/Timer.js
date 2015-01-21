﻿"use strict";
var Timer = (function () {
    function Timer(timeLeft, parentDiv, text) {
        var _this = this;
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
        this.cancelButton.click(function () {
            _this.cancel();
        });

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
    Timer.prototype.start = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.update();
        }, 1000);
    };

    Timer.prototype.stop = function () {
        clearInterval(this.interval);
    };

    Timer.prototype.cancel = function () {
        this.stop();
        this.fadeOutAndRemove();
    };

    Timer.prototype.update = function () {
        this.timeLeft--;
        this.progressBar.html(Helper.createTimeString(this.timeLeft));
        this.progressBar.attr("aria-valuenow", this.timeLeft);
        this.progressBar.css("width", (this.timeLeft * 100 / this.time) + "%");

        if (this.timeLeft <= 0) {
            this.stop();
            this.finished();
        }
    };

    Timer.prototype.finished = function () {
        var _this = this;
        this.timer.addClass("list-group-item-danger");
        this.cancelButton.remove();

        var audio = new AudioElement("sounds/AlarmSound.mp3");

        // play for three seconds
        audio.play();
        setTimeout(function () {
            audio.destroy();
        }, 3000);

        setInterval(function () {
            _this.blinker();
        }, 500);

        setTimeout(function () {
            _this.fadeOutAndRemove();
        }, 3000);
    };

    Timer.prototype.blinker = function () {
        this.timer.fadeOut(500);
        this.timer.fadeIn(500);
    };

    Timer.prototype.fadeOutAndRemove = function () {
        var _this = this;
        this.timer.fadeOut(1000, function () {
            _this.timer.remove();
        });
    };
    return Timer;
})();
//# sourceMappingURL=Timer.js.map