"use strict";
var AudioElement = (function () {
    function AudioElement(src) {
        /**
        * Creates an audio DOM Element with the given source.
        *
        * @param src The source for the AudioElement.
        */
        this.audioElement = document.createElement("audio");
        this.audioElement.setAttribute("src", src);
        this.audioElement.setAttribute("autoplay", "autoplay");
        this.jqueryAudioElement = $(this.audioElement);
    }
    AudioElement.prototype.play = function () {
        this.audioElement.play();
    };

    AudioElement.prototype.stop = function () {
        this.audioElement.pause();
    };

    AudioElement.prototype.destroy = function () {
        this.jqueryAudioElement.remove();
    };
    return AudioElement;
})();
//# sourceMappingURL=AudioElement.js.map
