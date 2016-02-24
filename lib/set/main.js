"use strict";

let _ = require("lodash");
let fs = require("fs");
let path = require("path");

let indexCommons = require("nodebb-plugin-emoji-extended/lib/commons/index");
let parserCommons = require("nodebb-plugin-emoji-extended/lib/commons/parser");
let meta = require("./meta");
let mapping = require("./mapping");
let settings = require("../settings");

const BASE_PATH = path.resolve(path.dirname(module.filename), "../..");
const ASSETS_PATH = path.join(BASE_PATH, "public/static/images");
const INDEX = JSON.parse(fs.readFileSync(path.join(BASE_PATH, "public/static/images/index.json")));
const DATA_BY_ID = {};
const URL = settings.urlBase + "/images";

let indexBuilder = _.partial(indexCommons, require("glob"), require("image-size"));
let listPromise = null;
let opts = {parser: _.partial(parserCommons.parserWithIndex, DATA_BY_ID)};

/*===================================================== Exports  =====================================================*/

exports.url = meta.url;
exports.name = settings.pkg.nbbpm.name;
exports.preview = meta.preview;
exports.mapping = mapping;
exports.license = meta.license;
exports.moduleId = settings.name;
exports.description = meta.description;
exports.attribution = meta.attribution;

exports.mainStyles = function () { return fs.readFileSync(path.join(BASE_PATH, "public/static/styles/main.css")); };
exports.emailStyles = function () { return fs.readFileSync(path.join(BASE_PATH, "public/static/styles/email.css")); };

exports.use = use;
exports.parse = _.identity;
exports.purge = null;
exports.update = null;
exports.prepared = true;

/*==================================================== Functions  ====================================================*/

function use(options) {
  return cacheList()
      .then(function (list) {
        // keep some constant options
        options.list = opts.list;
        options.parser = opts.parser;
        // use new options
        opts = options;
        exports.parse = parserCommons.genParser(URL, opts);
        return list;
      });
}

function cacheList() { return listPromise = listPromise || generateList(); }

function generateList() {
  return indexBuilder(INDEX, ASSETS_PATH)
      .then(function (result) {
        opts.list = _.map(result.list, "id");
        _.assign(DATA_BY_ID, result.dataById);
        return result.list;
      });
}
