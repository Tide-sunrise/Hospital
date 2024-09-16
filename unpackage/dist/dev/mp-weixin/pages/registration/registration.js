"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_y_tab2 = common_vendor.resolveComponent("y-tab");
  const _easycom_y_tabs2 = common_vendor.resolveComponent("y-tabs");
  const _easycom_small_icon2 = common_vendor.resolveComponent("small-icon");
  (_easycom_y_tab2 + _easycom_y_tabs2 + _easycom_small_icon2)();
}
const _easycom_y_tab = () => "../../uni_modules/y-tabs/components/y-tab/y-tab.js";
const _easycom_y_tabs = () => "../../uni_modules/y-tabs/components/y-tabs/y-tabs.js";
const _easycom_small_icon = () => "../../components/small-icon/small-icon.js";
if (!Math) {
  (_easycom_y_tab + _easycom_y_tabs + _easycom_small_icon)();
}
const _sfc_main = {
  __name: "registration",
  setup(__props) {
    const Tabs = common_vendor.ref([
      { title: "常用" },
      { title: "门诊" },
      { title: "住院" },
      { title: "其他" },
      { title: "动态" }
    ]);
    const activeIndex = common_vendor.ref(0);
    const tabs = common_vendor.ref([]);
    const onTransition = (e) => {
      if (Tabs.value) {
        tabs.value.setDx(e.detail.dx);
      }
    };
    function onAnimationfinish(e) {
      activeIndex.value = e.detail.current;
      tabs.value.unlockDx();
      console.log(activeIndex);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(Tabs.value, (tab, k0, i0) => {
          return {
            a: tab.title,
            b: "1e5d1fa0-1-" + i0 + ",1e5d1fa0-0",
            c: common_vendor.p({
              title: tab.title
            })
          };
        }),
        b: common_vendor.sr(tabs, "1e5d1fa0-0", {
          "k": "tabs"
        }),
        c: common_vendor.o(($event) => activeIndex.value = $event),
        d: common_vendor.p({
          color: "red",
          barAnimateMode: "worm",
          modelValue: activeIndex.value
        }),
        e: common_vendor.f(Tabs.value, (tab, k0, i0) => {
          return {
            a: common_vendor.f(8, (item, k1, i1) => {
              return {
                a: "1e5d1fa0-2-" + i0 + "-" + i1
              };
            }),
            b: tab.title
          };
        }),
        f: activeIndex.value,
        g: common_vendor.o(onTransition),
        h: common_vendor.o(onAnimationfinish)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e5d1fa0"]]);
wx.createPage(MiniProgramPage);
