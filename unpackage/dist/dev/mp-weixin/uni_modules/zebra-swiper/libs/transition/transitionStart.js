"use strict";
const uni_modules_zebraSwiper_libs_transition_transitionEmit = require("./transitionEmit.js");
function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode)
    return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  uni_modules_zebraSwiper_libs_transition_transitionEmit.transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
exports.transitionStart = transitionStart;
