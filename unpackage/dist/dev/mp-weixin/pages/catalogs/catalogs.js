"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_small_icon2 = common_vendor.resolveComponent("small-icon");
  const _easycom_myTabBar2 = common_vendor.resolveComponent("myTabBar");
  (_easycom_small_icon2 + _easycom_myTabBar2)();
}
const _easycom_small_icon = () => "../../components/small-icon/small-icon.js";
const _easycom_myTabBar = () => "../../components/myTabBar/myTabBar.js";
if (!Math) {
  (_easycom_small_icon + _easycom_myTabBar)();
}
const _sfc_main = {
  __name: "catalogs",
  setup(__props) {
    const itemTab = common_vendor.ref({ myTabbar: 1 });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_assets._imports_0$1,
        c: common_vendor.f(8, (item, k0, i0) => {
          return {
            a: "5149d303-0-" + i0
          };
        }),
        d: common_vendor.p({
          item: itemTab.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5149d303"]]);
wx.createPage(MiniProgramPage);
