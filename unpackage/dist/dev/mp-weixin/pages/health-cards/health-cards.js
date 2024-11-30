"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_health_card2 = common_vendor.resolveComponent("health-card");
  _easycom_health_card2();
}
const _easycom_health_card = () => "../../components/health-card/health-card.js";
if (!Math) {
  _easycom_health_card();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.f(4, (item, k0, i0) => {
      return {
        a: "6838644f-0-" + i0
      };
    }),
    b: common_vendor.p({
      cardinfo: {
        isExist: true
      }
    }),
    c: common_vendor.f(1, (item, k0, i0) => {
      return {
        a: "6838644f-1-" + i0
      };
    }),
    d: common_vendor.p({
      cardinfo: {
        isExist: false
      }
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6838644f"]]);
wx.createPage(MiniProgramPage);
