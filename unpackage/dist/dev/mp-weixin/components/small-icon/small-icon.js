"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "small-icon",
  props: {
    item: {
      type: Object,
      default() {
        return {
          name: "默认名称",
          picurl: "../../static/logo.png",
          url: "/pages/registration/registration"
        };
      }
    }
  },
  setup(__props) {
    const defaultPicurl = common_vendor.ref("../../static/logo.png");
    const defaultUrl = common_vendor.ref("/pages/registration/registration");
    return (_ctx, _cache) => {
      return {
        a: __props.item.picurl || defaultPicurl.value,
        b: common_vendor.t(__props.item.name),
        c: __props.item.url || defaultUrl.value
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-399c1124"]]);
wx.createComponent(Component);
