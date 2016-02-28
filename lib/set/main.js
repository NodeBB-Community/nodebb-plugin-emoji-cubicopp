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
const PARSER = _.partial(parserCommons.parserWithIndex, DATA_BY_ID);

let indexBuilder = _.partial(indexCommons, require("glob"), require("image-size"));
let opts = null;

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
  opts = options;
  opts.parser = PARSER;
  return generateList()
      .then(function (list) {
        // export new parse function
        exports.parse = parserCommons.genParser(URL, opts);
        return list;
      });
}

function generateList() {
  return indexBuilder(INDEX, ASSETS_PATH)
      .then(function (result) {
        let list = _.filter(result.list || [], isNotExcluded);
        opts.list = _.map(list, "id");
        _.assign(DATA_BY_ID, result.dataById);
        return list;
      });
}

function isNotExcluded(item) { return !_.includes(opts.excludes, item.id); }
