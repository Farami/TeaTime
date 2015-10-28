/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
"use strict";

class AudioElement {
  private audioElement: HTMLAudioElement;

  /**
   * Creates an audio DOM Element with the given source.
   * 
   * @param src The source for the AudioElement.
   */
  constructor(src: string) {
    this.audioElement = document.createElement("audio");
    this.audioElement.setAttribute("src", src);
    this.audioElement.setAttribute("autoplay", "autoplay");
  }

  /**
   * Plays the audio element.
   */
  play() {
    this.audioElement.play();
  }

  /**
   * Stops the audio element.
   */
  stop() {
    this.audioElement.pause();
  }

  /**
   * Destroys the audio element.
   */
  destroy() {
    this.audioElement.remove();
  }
}