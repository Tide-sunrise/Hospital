"use strict";
const uni_modules_zebraSwiper_libs_transition_setTransition = require("./setTransition.js");
const uni_modules_zebraSwiper_libs_transition_transitionStart = require("./transitionStart.js");
const uni_modules_zebraSwiper_libs_transition_transitionEnd = require("./transitionEnd.js");
const transition = {
  setTransition: uni_modules_zebraSwiper_libs_transition_setTransition.setTransition,
  transitionStart: uni_modules_zebraSwiper_libs_transition_transitionStart.transitionStart,
  transitionEnd: uni_modules_zebraSwiper_libs_transition_transitionEnd.transitionEnd
};
exports.transition = transition;
