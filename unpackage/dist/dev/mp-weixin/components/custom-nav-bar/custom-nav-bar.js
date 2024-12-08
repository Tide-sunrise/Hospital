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
  __name: "custom-nav-bar",
  props: {
    title: {
      type: String,
      default: "壁纸"
    },
    isBack: {
      type: Boolean,
      default: false
    }
  },
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.isBack
      }, __props.isBack ? {
        b: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        c: common_vendor.o(goBack),
        d: common_vendor.unref(utils_system.getStatusBarHeight)() + "px"
      } : {}, {
        e: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        f: common_vendor.t(__props.title),
        g: common_vendor.p({
          type: "search",
          size: "18",
          color: "#888"
        }),
        h: common_vendor.unref(utils_system.getTitleBarHeight)() + "px",
        i: common_vendor.unref(utils_system.getNavBarHeight)() + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-412fc155"]]);
wx.createComponent(Component);
