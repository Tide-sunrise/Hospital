"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_wd_button2 + _easycom_uni_popup2)();
}
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_wd_button + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "doctor-details",
  setup(__props) {
    const infoPopup = common_vendor.ref(null);
    const timeSelect = () => {
      infoPopup.value.open();
    };
    const navToCards = () => {
      common_vendor.index.navigateTo({
        url: "/pages/health-cards/health-cards"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(timeSelect),
        c: common_vendor.p({
          size: "small"
        }),
        d: common_vendor.o(timeSelect),
        e: common_vendor.p({
          size: "small"
        }),
        f: common_vendor.o(navToCards),
        g: common_vendor.p({
          size: "small",
          type: "info"
        }),
        h: common_assets._imports_0$1,
        i: common_vendor.f(8, (item, k0, i0) => {
          return {};
        }),
        j: common_vendor.sr(infoPopup, "08a0b3fc-3", {
          "k": "infoPopup"
        }),
        k: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-08a0b3fc"]]);
wx.createPage(MiniProgramPage);
