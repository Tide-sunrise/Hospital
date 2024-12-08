"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "notice",
  setup(__props) {
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    const navToDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "back",
          color: "#000",
          size: "20"
        }),
        b: common_vendor.o(goBack),
        c: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        d: common_vendor.f(8, (item, k0, i0) => {
          return {};
        }),
        e: common_vendor.o(navToDetail)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c2e4c1e"]]);
wx.createPage(MiniProgramPage);
