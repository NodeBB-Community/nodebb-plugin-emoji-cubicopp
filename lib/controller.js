"use strict";

var semver = require("semver");
var winston = require("winston");

var settings = require("./settings");
var eePkg = null;

var EMOJI_EXTENDED = "nodebb-plugin-emoji-extended";
var REQUIRED_VERSION = settings.pkg.peerDependencies[EMOJI_EXTENDED];
var REQUIRED_PACKAGE = "'" + EMOJI_EXTENDED + "@" + REQUIRED_VERSION + "'";

try {
  eePkg = require(EMOJI_EXTENDED + "/package.json");
} catch (e) {}

if (eePkg == null) {
  winston.error("[plugins/" + settings.id + "] " + REQUIRED_PACKAGE + " not installed.");
} else if (semver.satisfies(eePkg.version, REQUIRED_VERSION)) {
  safeInit();
} else {
  var foundPackage = "'" + EMOJI_EXTENDED + "@" + eePkg.version + "'";
  winston.error("[plugins/" + settings.id + "] " + foundPackage + " found, but " + REQUIRED_PACKAGE + " required.");
}

function safeInit() {
  var setsCtrl = require(EMOJI_EXTENDED + "/lib/sets/controller");

  setsCtrl.register(require("./set/main"), "exodo");
}
