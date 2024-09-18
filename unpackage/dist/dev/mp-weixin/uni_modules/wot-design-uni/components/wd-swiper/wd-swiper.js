"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdSwiper_types = require("./types.js");
if (!Math) {
  wdSwiperNav();
}
const wdSwiperNav = () => "../wd-swiper-nav/wd-swiper-nav.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "wd-swiper",
  props: uni_modules_wotDesignUni_components_wdSwiper_types.swiperProps,
  emits: ["click", "change", "animationfinish", "update:current"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const navCurrent = common_vendor.ref(0);
    common_vendor.watch(
      () => props.current,
      (val) => {
        if (val < 0) {
          props.loop ? goToEnd() : goToStart();
        } else if (val >= props.list.length) {
          props.loop ? goToStart() : goToEnd();
        } else {
          go(val);
        }
        emit("update:current", navCurrent.value);
      },
      { immediate: true }
    );
    const swiperIndicator = common_vendor.computed(() => {
      const { list, direction, indicatorPosition, indicator } = props;
      const swiperIndicator2 = {
        current: navCurrent.value || 0,
        total: list.length || 0,
        direction: direction || "horizontal",
        indicatorPosition: indicatorPosition || "bottom"
      };
      if (uni_modules_wotDesignUni_components_common_util.isObj(indicator)) {
        swiperIndicator2.type = indicator.type || "dots";
        swiperIndicator2.minShowNum = indicator.minShowNum || 2;
        swiperIndicator2.showControls = indicator.showControls || false;
      }
      return swiperIndicator2;
    });
    function go(index) {
      navCurrent.value = index;
    }
    function goToStart() {
      navCurrent.value = 0;
    }
    function goToEnd() {
      navCurrent.value = props.list.length - 1;
    }
    function isPrev(current, index, list) {
      return (current - 1 + list.length) % list.length === index;
    }
    function isNext(current, index, list) {
      return (current + 1 + list.length) % list.length === index;
    }
    function getCustomImageClass(current, index, list) {
      let customImageClass = "";
      if (isPrev(current, index, list)) {
        customImageClass = props.customPrevImageClass;
      }
      if (isNext(current, index, list)) {
        customImageClass = props.customNextImageClass;
      }
      return customImageClass;
    }
    function handleChange(e) {
      const { current, source } = e.detail;
      navCurrent.value = current;
      emit("change", { current, source });
    }
    function handleAnimationfinish(e) {
      const { current, source } = e.detail;
      emit("update:current", navCurrent.value);
      emit("animationfinish", { current, source });
    }
    function handleClick(index, item) {
      emit("click", { index, item });
    }
    function handleIndicatorChange(e) {
      const { dir, source } = e;
      doIndicatorBtnChange(dir, source);
    }
    function doIndicatorBtnChange(dir, source) {
      const { list, loop } = props;
      const total = list.length;
      let nextPos = dir === "next" ? navCurrent.value + 1 : navCurrent.value - 1;
      if (loop) {
        nextPos = dir === "next" ? (navCurrent.value + 1) % total : (navCurrent.value - 1 + total) % total;
      } else {
        nextPos = nextPos < 0 || nextPos >= total ? navCurrent.value : nextPos;
      }
      if (nextPos === navCurrent.value)
        return;
      navCurrent.value = nextPos;
      emit("change", { current: nextPos, source });
      emit("update:current", navCurrent.value);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(_ctx.list, (item, index, i0) => {
          return {
            a: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.isObj)(item) ? item[_ctx.valueKey] : item,
            b: common_vendor.n(`wd-swiper__image ${_ctx.customImageClass} ${getCustomImageClass(navCurrent.value, index, _ctx.list)}`),
            c: index,
            d: common_vendor.o(($event) => handleClick(index, item), index)
          };
        }),
        b: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(_ctx.height),
        c: _ctx.imageMode,
        d: _ctx.autoplay,
        e: _ctx.current,
        f: _ctx.interval,
        g: _ctx.duration,
        h: _ctx.loop,
        i: _ctx.direction == "vertical",
        j: _ctx.easingFunction,
        k: _ctx.previousMargin,
        l: _ctx.nextMargin,
        m: _ctx.snapToEdge,
        n: _ctx.displayMultipleItems,
        o: common_vendor.unref(uni_modules_wotDesignUni_components_common_util.addUnit)(_ctx.height),
        p: common_vendor.o(handleChange),
        q: common_vendor.o(handleAnimationfinish),
        r: _ctx.indicator
      }, _ctx.indicator ? common_vendor.e({
        s: common_vendor.r("indicator", {
          current: navCurrent.value,
          total: _ctx.list.length
        }),
        t: !_ctx.$slots.indicator
      }, !_ctx.$slots.indicator ? {
        v: common_vendor.o(handleIndicatorChange),
        w: common_vendor.p({
          ["custom-class"]: _ctx.customIndicatorClass,
          type: swiperIndicator.value.type,
          current: swiperIndicator.value.current,
          total: swiperIndicator.value.total,
          direction: swiperIndicator.value.direction,
          ["indicator-position"]: swiperIndicator.value.indicatorPosition,
          ["min-show-num"]: swiperIndicator.value.minShowNum,
          ["show-controls"]: swiperIndicator.value.showControls
        })
      } : {}) : {}, {
        x: common_vendor.n(`wd-swiper ${_ctx.customClass}`),
        y: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f903ae98"]]);
wx.createComponent(Component);
