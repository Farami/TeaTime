﻿"use strict";

class AudioElement {
    private audioElement: HTMLAudioElement;
    private jqueryAudioElement: JQuery;

    /**
     * Creates an audio DOM Element with the given source.
     * 
     * @param src The source for the AudioElement.
     */
    constructor(src: string) {

        this.audioElement = document.createElement("audio");
        this.audioElement.setAttribute("src", src);
        this.audioElement.setAttribute("autoplay", "autoplay");
        this.jqueryAudioElement = $(this.audioElement);
    }

    play() {
        this.audioElement.play();
    }

    stop() {
        this.audioElement.pause();
    }

    destroy() {
        this.jqueryAudioElement.remove();
    }
}