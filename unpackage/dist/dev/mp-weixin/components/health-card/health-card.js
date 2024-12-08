"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "health-card",
  props: {
    cardinfo: {
      type: Object,
      default() {
        return {
          isExist: false
        };
      }
    }
  },
  setup(__props) {
    const props = __props;
    const cardExist = common_vendor.ref(props.cardinfo.isExist);
    const navToCards = () => {
      let arr = getCurrentPages();
      console.log();
      if (!(arr[arr.length - 1].route === "pages/health-cards/health-cards")) {
        common_vendor.index.navigateTo({
          url: "/pages/health-cards/health-cards"
        });
      }
    };
    const navToform = () => {
      common_vendor.index.navigateTo({
        url: "/pages/health-card-form/health-card-form"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: cardExist.value
      }, cardExist.value ? {
        b: common_assets._imports_0$1,
        c: common_vendor.o(navToCards)
      } : {
        d: common_vendor.p({
          type: "plus",
          size: "100"
        }),
        e: common_vendor.o(navToform)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9bc90eca"]]);
wx.createComponent(Component);
