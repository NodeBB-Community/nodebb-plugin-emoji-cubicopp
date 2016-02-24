"use strict";

let settings = require("../settings");

/*===================================================== Exports  =====================================================*/

exports.description = "A set of square-shaped public domain 'Cubicopp' emoji.<br/>" +
    "<a href=\"http://publicdomainvectors.org/en/search/cubicopp/\" target=\"_blank\">Image Source</a>";

exports.attribution = "Images kindly provided by " +
    "<a href=\"http://publicdomainvectors.org/en/search/cubicopp/\" target=\"_blank\">publicdomainvectors.org</a>";

exports.license = "Public domain";

exports.preview = settings.urlBase + "/preview.png";

exports.url = [settings.urlBase + "/images/", {key: "id", encode: true}, ".svg"];
