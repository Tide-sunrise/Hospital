"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const common_data_data = require("../../common/data/data.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_small_icon2 = common_vendor.resolveComponent("small-icon");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_y_tab2 = common_vendor.resolveComponent("y-tab");
  const _easycom_y_tabs2 = common_vendor.resolveComponent("y-tabs");
  const _easycom_wd_tabbar_item2 = common_vendor.resolveComponent("wd-tabbar-item");
  const _easycom_wd_tabbar2 = common_vendor.resolveComponent("wd-tabbar");
  (_easycom_custom_nav_bar2 + _easycom_wd_swiper2 + _easycom_small_icon2 + _easycom_uni_icons2 + _easycom_y_tab2 + _easycom_y_tabs2 + _easycom_wd_tabbar_item2 + _easycom_wd_tabbar2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_small_icon = () => "../../components/small-icon/small-icon.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_y_tab = () => "../../uni_modules/y-tabs/components/y-tab/y-tab.js";
const _easycom_y_tabs = () => "../../uni_modules/y-tabs/components/y-tabs/y-tabs.js";
const _easycom_wd_tabbar_item = () => "../../uni_modules/wot-design-uni/components/wd-tabbar-item/wd-tabbar-item.js";
const _easycom_wd_tabbar = () => "../../uni_modules/wot-design-uni/components/wd-tabbar/wd-tabbar.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_wd_swiper + _easycom_small_icon + _easycom_uni_icons + _easycom_y_tab + _easycom_y_tabs + _easycom_wd_tabbar_item + _easycom_wd_tabbar)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const current = common_vendor.ref(0);
    const swiperList = common_vendor.ref([
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg",
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg",
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg",
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg",
      "https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg"
    ]);
    const noticeList = common_vendor.ref(["我草泥马", "一得阁拉米", "摩洛哥炒饼"]);
    const myFunction = common_vendor.ref([{ name: "挂号", url: "/pages/registration/registration" }, { name: "击败" }, { name: "吧唧" }]);
    const tabbar = common_vendor.ref(0);
    const Tabs = common_vendor.ref([
      { title: "常用" },
      { title: "门诊" },
      { title: "住院" },
      { title: "其他" },
      { title: "动态" }
    ]);
    const activeIndex = common_vendor.ref(0);
    const tabs = common_vendor.ref([]);
    const newsLists = common_vendor.ref([
      { id: 111, title: "这是资讯1" },
      { id: 222, title: "这是资讯2" },
      { id: 333, title: "这是资讯3" },
      { id: 444, title: "这是资讯4" }
    ]);
    const handleChange1 = ({ value }) => {
      console.log(value);
      common_vendor.index.redirectTo({
        url: common_data_data.tabBarList[value].url
      });
    };
    const onTransition = (e) => {
      if (Tabs.value) {
        tabs.value.setDx(e.detail.dx);
      }
    };
    function onAnimationfinish(e) {
      activeIndex.value = e.detail.current;
      tabs.value.unlockDx();
      console.log(activeIndex);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.o(($event) => current.value = $event),
        c: common_vendor.p({
          autoplay: true,
          ["custom-indicator-class"]: "custom-indicator-class",
          ["custom-image-class"]: "custom-image",
          ["custom-next-image-class"]: "custom-image-prev",
          ["custom-prev-image-class"]: "custom-image-prev",
          indicator: {
            type: "dots"
          },
          list: swiperList.value,
          previousMargin: "24px",
          nextMargin: "24px",
          current: current.value
        }),
        d: common_vendor.f(myFunction.value, (item, k0, i0) => {
          return {
            a: "1cf27b2a-2-" + i0,
            b: common_vendor.p({
              item
            })
          };
        }),
        e: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        f: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: "/pages/notice/detail?id=" + item._id
          };
        }),
        g: common_vendor.p({
          type: "right",
          size: "20"
        }),
        h: common_vendor.f(Tabs.value, (tab, k0, i0) => {
          return {
            a: tab.title,
            b: "1cf27b2a-6-" + i0 + ",1cf27b2a-5",
            c: common_vendor.p({
              title: tab.title
            })
          };
        }),
        i: common_vendor.sr(tabs, "1cf27b2a-5", {
          "k": "tabs"
        }),
        j: common_vendor.o(($event) => activeIndex.value = $event),
        k: common_vendor.p({
          ["wrap-style"]: "\r\n				border-radius: 30rpx 30rpx 0 0;\r\n			",
          color: "red",
          barAnimateMode: "worm",
          modelValue: activeIndex.value
        }),
        l: common_vendor.f(Tabs.value, (tab, k0, i0) => {
          return {
            a: common_vendor.f(8, (item, k1, i1) => {
              return {
                a: "1cf27b2a-7-" + i0 + "-" + i1
              };
            }),
            b: tab.title
          };
        }),
        m: activeIndex.value,
        n: common_vendor.o(onTransition),
        o: common_vendor.o(onAnimationfinish),
        p: common_vendor.f(newsLists.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.title),
            c: item.id
          };
        }),
        q: common_assets._imports_0,
        r: common_vendor.t(newsLists.value.length),
        s: common_vendor.p({
          title: "首页",
          icon: "home"
        }),
        t: common_vendor.p({
          title: "就诊记录",
          icon: "cart"
        }),
        v: common_vendor.p({
          title: "我的",
          icon: "user"
        }),
        w: common_vendor.o(handleChange1),
        x: common_vendor.o(($event) => tabbar.value = $event),
        y: common_vendor.p({
          shape: "round",
          fixed: true,
          ["active-color"]: "#ee0a24",
          ["inactive-color"]: "#7d7e80",
          modelValue: tabbar.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
