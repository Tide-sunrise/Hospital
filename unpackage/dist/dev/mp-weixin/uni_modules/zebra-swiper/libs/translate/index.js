"use strict";
const uni_modules_zebraSwiper_libs_translate_getTranslate = require("./getTranslate.js");
const uni_modules_zebraSwiper_libs_translate_setTranslate = require("./setTranslate.js");
const uni_modules_zebraSwiper_libs_translate_minTranslate = require("./minTranslate.js");
const uni_modules_zebraSwiper_libs_translate_maxTranslate = require("./maxTranslate.js");
const uni_modules_zebraSwiper_libs_translate_translateTo = require("./translateTo.js");
const translate = {
  getTranslate: uni_modules_zebraSwiper_libs_translate_getTranslate.getSwiperTranslate,
  setTranslate: uni_modules_zebraSwiper_libs_translate_setTranslate.setTranslate,
  minTranslate: uni_modules_zebraSwiper_libs_translate_minTranslate.minTranslate,
  maxTranslate: uni_modules_zebraSwiper_libs_translate_maxTranslate.maxTranslate,
  translateTo: uni_modules_zebraSwiper_libs_translate_translateTo.translateTo
};
exports.translate = translate;
