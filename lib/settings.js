"use strict";

var nconf = require("nconf");

var packageJSON = require("../package.json");

/*
 * This file exports a NodeBB Settings Object and a few meta-data of the project.
 *
 * See https://docs.nodebb.org/en/latest/plugins/settings.html for more details on the Settings Object.
 *
 * This file by default gets meta-replaced (thus @{...} gets resolved within the grunt-tasks).
 * It is not recommended to add any more files, rather it is recommended to add additional exports here if needed.
 */

var env = "distribution",
    dev = env === "development";

/*===================================================== Exports  =====================================================*/

exports.urlBase = nconf.get("url") + "/plugins/nodebb-plugin-emoji-exodo/static";
exports.name = "nodebb-plugin-emoji-exodo";
exports.id = "emoji-exodo";
exports.Id = "emoji-exodo";
exports.iD = "emoji-exodo";
exports.ID = "emoji-exodo";
exports.dev = dev;
exports.env = env;
exports.pkg = packageJSON;
