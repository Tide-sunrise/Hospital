"use strict";
const uni_modules_zebraSwiper_libs_core = require("./libs/core.js");
const uni_modules_zebraSwiper_modules_autoplay_autoplay = require("./modules/autoplay/autoplay.js");
const uni_modules_zebraSwiper_modules_freeMode_freeMode = require("./modules/free-mode/free-mode.js");
const uni_modules_zebraSwiper_modules_effectFade_effectFade = require("./modules/effect-fade/effect-fade.js");
const uni_modules_zebraSwiper_modules_effectCube_effectCube = require("./modules/effect-cube/effect-cube.js");
const uni_modules_zebraSwiper_modules_effectCoverflow_effectCoverflow = require("./modules/effect-coverflow/effect-coverflow.js");
const uni_modules_zebraSwiper_modules_effectFlip_effectFlip = require("./modules/effect-flip/effect-flip.js");
const uni_modules_zebraSwiper_modules_effectCards_effectCards = require("./modules/effect-cards/effect-cards.js");
const uni_modules_zebraSwiper_modules_effectCreative_effectCreative = require("./modules/effect-creative/effect-creative.js");
const uni_modules_zebraSwiper_modules_effectPanorama_effectPanorama = require("./modules/effect-panorama/effect-panorama.js");
const uni_modules_zebraSwiper_modules_effectCarousel_effectCarousel = require("./modules/effect-carousel/effect-carousel.js");
const uni_modules_zebraSwiper_modules_navigation_navigation = require("./modules/navigation/navigation.js");
const uni_modules_zebraSwiper_modules_pagination_pagination = require("./modules/pagination/pagination.js");
const uni_modules_zebraSwiper_modules_thumbs_thumbs = require("./modules/thumbs/thumbs.js");
const uni_modules_zebraSwiper_modules_scrollbar_scrollbar = require("./modules/scrollbar/scrollbar.js");
const uni_modules_zebraSwiper_modules_virtual_virtual = require("./modules/virtual/virtual.js");
const uni_modules_zebraSwiper_modules_controller_controller = require("./modules/controller/controller.js");
const uni_modules_zebraSwiper_modules_willChange_willChange = require("./modules/will-change/will-change.js");
const modules = [
  uni_modules_zebraSwiper_modules_autoplay_autoplay.Autoplay,
  uni_modules_zebraSwiper_modules_freeMode_freeMode.freeMode,
  uni_modules_zebraSwiper_modules_effectFade_effectFade.EffectFade,
  uni_modules_zebraSwiper_modules_effectCube_effectCube.EffectCube,
  uni_modules_zebraSwiper_modules_effectCoverflow_effectCoverflow.EffectCoverflow,
  uni_modules_zebraSwiper_modules_effectFlip_effectFlip.EffectFlip,
  uni_modules_zebraSwiper_modules_effectCards_effectCards.EffectCards,
  uni_modules_zebraSwiper_modules_effectCreative_effectCreative.EffectCreative,
  uni_modules_zebraSwiper_modules_effectPanorama_effectPanorama.Panorama,
  uni_modules_zebraSwiper_modules_effectCarousel_effectCarousel.EffectCarousel,
  uni_modules_zebraSwiper_modules_navigation_navigation.Navigation,
  uni_modules_zebraSwiper_modules_pagination_pagination.Pagination,
  uni_modules_zebraSwiper_modules_thumbs_thumbs.Thumb,
  uni_modules_zebraSwiper_modules_scrollbar_scrollbar.Scrollbar,
  uni_modules_zebraSwiper_modules_willChange_willChange.WillChange,
  uni_modules_zebraSwiper_modules_virtual_virtual.Virtual,
  uni_modules_zebraSwiper_modules_controller_controller.Controller
];
uni_modules_zebraSwiper_libs_core.Swiper.use(modules);
