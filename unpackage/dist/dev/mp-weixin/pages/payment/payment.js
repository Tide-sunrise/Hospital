"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  (_easycom_uni_dateformat2 + _easycom_wd_button2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_wd_button)();
}
const _sfc_main = {
  __name: "payment",
  setup(__props) {
    const isSuccess = common_vendor.ref(true);
    const navBack = () => {
      common_vendor.index.navigateBack({});
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isSuccess.value
      }, isSuccess.value ? {
        b: common_assets._imports_0$4
      } : {
        c: common_assets._imports_1
      }, {
        d: common_vendor.t(isSuccess.value ? "成功" : "失败"),
        e: isSuccess.value
      }, isSuccess.value ? {} : {}, {
        f: common_vendor.p({
          date: Date.now(),
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        g: common_vendor.o(navBack),
        h: common_vendor.p({
          block: true,
          type: "info"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eade9ab2"]]);
wx.createPage(MiniProgramPage);
