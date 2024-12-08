"use strict";
const uni_modules_zebraSwiper_libs_events_onTouchStart = require("./onTouchStart.js");
const uni_modules_zebraSwiper_libs_events_onTouchMove = require("./onTouchMove.js");
const uni_modules_zebraSwiper_libs_events_onTouchEnd = require("./onTouchEnd.js");
const uni_modules_zebraSwiper_libs_events_onResize = require("./onResize.js");
const uni_modules_zebraSwiper_libs_events_onClick = require("./onClick.js");
const uni_modules_zebraSwiper_libs_events_onScroll = require("./onScroll.js");
const events = (swiper, method) => {
  const {
    params,
    touchEvents,
    wrapperEl,
    device,
    support
  } = swiper;
  swiper.native;
  const capture = !!params.nested;
  const swiperMethod = method;
  if (!support.touch) {
    let desktopMethod = method === "on" ? "addEventListener" : "removeEventListener";
    if (document.querySelector(`#${swiper.$el.swiperElId}`)) {
      document.querySelector(`#${swiper.$el.swiperElId}`)[desktopMethod](
        touchEvents.start,
        swiper.onTouchStart,
        false
      );
    }
    document[desktopMethod](touchEvents.move, swiper.onTouchMove, capture);
    document[desktopMethod](touchEvents.end, swiper.onTouchEnd, false);
  } else {
    touchEvents.start === "touchstart" && support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](
      device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate",
      uni_modules_zebraSwiper_libs_events_onResize.onResize,
      true
    );
  } else {
    swiper[swiperMethod]("observerUpdate", uni_modules_zebraSwiper_libs_events_onResize.onResize, true);
  }
};
function attachEvents() {
  const swiper = this;
  const {
    params,
    support
  } = swiper;
  swiper.onTouchStart = uni_modules_zebraSwiper_libs_events_onTouchStart.onTouchStart.bind(swiper);
  swiper.onTouchMove = uni_modules_zebraSwiper_libs_events_onTouchMove.onTouchMove.bind(swiper);
  swiper.onTouchEnd = uni_modules_zebraSwiper_libs_events_onTouchEnd.onTouchEnd.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = uni_modules_zebraSwiper_libs_events_onScroll.onScroll.bind(swiper);
  }
  swiper.onClick = uni_modules_zebraSwiper_libs_events_onClick.onClick.bind(swiper);
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
const events$1 = {
  attachEvents,
  detachEvents
};
exports.events = events$1;
