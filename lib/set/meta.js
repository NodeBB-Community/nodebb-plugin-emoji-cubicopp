"use strict";

let settings = require("../settings");

/*===================================================== Exports  =====================================================*/

exports.description = "A set of exodo emoji gifs.<br/>";

exports.attribution = "Images kindly provided by inet";

exports.license = "Public domain";

exports.preview = settings.urlBase + "/preview.png";

exports.url = [settings.urlBase + "/images/", { key: "id", encode: true }, ".gif"];
