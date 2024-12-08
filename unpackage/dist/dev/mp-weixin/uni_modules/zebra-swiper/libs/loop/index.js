"use strict";
const uni_modules_zebraSwiper_libs_loop_loopCreate = require("./loopCreate.js");
const uni_modules_zebraSwiper_libs_loop_loopFix = require("./loopFix.js");
const uni_modules_zebraSwiper_libs_loop_loopDestroy = require("./loopDestroy.js");
const loop = {
  loopCreate: uni_modules_zebraSwiper_libs_loop_loopCreate.loopCreate,
  loopFix: uni_modules_zebraSwiper_libs_loop_loopFix.loopFix,
  loopDestroy: uni_modules_zebraSwiper_libs_loop_loopDestroy.loopDestroy
};
exports.loop = loop;
