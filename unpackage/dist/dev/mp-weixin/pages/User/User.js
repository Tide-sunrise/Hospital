"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_myTabBar2 = common_vendor.resolveComponent("myTabBar");
  (_easycom_uni_icons2 + _easycom_myTabBar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_myTabBar = () => "../../components/myTabBar/myTabBar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_myTabBar)();
}
const _sfc_main = {
  __name: "User",
  setup(__props) {
    const itemTab = common_vendor.ref({ myTabbar: 2 });
    const navToA = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    };
    const navToB = () => {
      common_vendor.index.navigateTo({
        url: "/pages/catalogs/catalogs"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.p({
          type: "download-filled",
          size: "20"
        }),
        c: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        d: common_vendor.o(navToA),
        e: common_vendor.p({
          type: "star-filled",
          size: "20"
        }),
        f: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        g: common_vendor.o(navToB),
        h: common_vendor.p({
          type: "chatboxes-filled",
          size: "20"
        }),
        i: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        j: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        k: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        l: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        m: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        n: common_vendor.p({
          item: itemTab.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e1b347f"]]);
wx.createPage(MiniProgramPage);
