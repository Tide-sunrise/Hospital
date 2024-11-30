"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_cc_easyCommonInput2 = common_vendor.resolveComponent("cc-easyCommonInput");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  (_easycom_cc_easyCommonInput2 + _easycom_wd_button2)();
}
const _easycom_cc_easyCommonInput = () => "../../uni_modules/cc-easyCommonInput/components/cc-easyCommonInput/cc-easyCommonInput.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
if (!Math) {
  (_easycom_cc_easyCommonInput + _easycom_wd_button)();
}
const _sfc_main = {
  __name: "health-card-form",
  setup(__props) {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const handleSubmit = async () => {
      common_vendor.index.showToast({
        title: "提交成功",
        icon: "success",
        duration: 1e3
      });
      await sleep(1e3);
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "text",
          password: false,
          leftTitle: "姓名",
          name: "name",
          value: "",
          placeholder: "请输入姓名"
        }),
        b: common_vendor.p({
          type: "text",
          leftTitle: "身份证号",
          name: "phone",
          value: "",
          placeholder: "请输入身份证号"
        }),
        c: common_vendor.o(handleSubmit),
        d: common_vendor.p({
          type: "primary",
          size: "large",
          block: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0102ebb0"]]);
wx.createPage(MiniProgramPage);
