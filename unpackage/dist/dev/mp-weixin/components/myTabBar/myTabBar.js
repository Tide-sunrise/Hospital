"use strict";
const common_vendor = require("../../common/vendor.js");
const common_data_data = require("../../common/data/data.js");
if (!Array) {
  const _easycom_wd_tabbar_item2 = common_vendor.resolveComponent("wd-tabbar-item");
  const _easycom_wd_tabbar2 = common_vendor.resolveComponent("wd-tabbar");
  (_easycom_wd_tabbar_item2 + _easycom_wd_tabbar2)();
}
const _easycom_wd_tabbar_item = () => "../../uni_modules/wot-design-uni/components/wd-tabbar-item/wd-tabbar-item.js";
const _easycom_wd_tabbar = () => "../../uni_modules/wot-design-uni/components/wd-tabbar/wd-tabbar.js";
if (!Math) {
  (_easycom_wd_tabbar_item + _easycom_wd_tabbar)();
}
const _sfc_main = {
  __name: "myTabBar",
  props: {
    item: {
      type: Object,
      default() {
        return {
          myTabbar: 0
        };
      }
    }
  },
  setup(__props) {
    const props = __props;
    const handleChange1 = ({ value }) => {
      console.log(value);
      console.log(common_data_data.tabBarList[value].url);
      common_vendor.index.reLaunch({
        url: common_data_data.tabBarList[value].url
      });
    };
    const tabbar = common_vendor.ref(props.item.myTabbar);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "首页",
          icon: "home"
        }),
        b: common_vendor.p({
          title: "医院信息",
          icon: "list"
        }),
        c: common_vendor.p({
          title: "我的",
          icon: "user"
        }),
        d: common_vendor.o(handleChange1),
        e: common_vendor.o(($event) => tabbar.value = $event),
        f: common_vendor.p({
          shape: "round",
          ["active-color"]: "#ee0a24",
          ["inactive-color"]: "#000",
          fixed: true,
          modelValue: tabbar.value
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
