/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
"use strict";

class Helper {
  /**
  * Convert milliseconds into a time string with the format HH:mm
  *
  * @param milliseconds The milliseconds.
  */
  static createTimeString(milliseconds: number) {
    var date = new Date(null, null, null, null, null, milliseconds).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0].split(":");
    return date[1] + ":" + date[2];
  }
}