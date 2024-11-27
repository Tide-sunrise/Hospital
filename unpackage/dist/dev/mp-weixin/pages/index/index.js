"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_wd_swiper2 = common_vendor.resolveComponent("wd-swiper");
  const _easycom_health_card2 = common_vendor.resolveComponent("health-card");
  const _easycom_z_swiper_item2 = common_vendor.resolveComponent("z-swiper-item");
  const _easycom_z_swiper2 = common_vendor.resolveComponent("z-swiper");
  const _easycom_small_icon2 = common_vendor.resolveComponent("small-icon");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_y_tab2 = common_vendor.resolveComponent("y-tab");
  const _easycom_y_tabs2 = common_vendor.resolveComponent("y-tabs");
  const _easycom_myTabBar2 = common_vendor.resolveComponent("myTabBar");
  (_easycom_custom_nav_bar2 + _easycom_wd_swiper2 + _easycom_health_card2 + _easycom_z_swiper_item2 + _easycom_z_swiper2 + _easycom_small_icon2 + _easycom_uni_icons2 + _easycom_y_tab2 + _easycom_y_tabs2 + _easycom_myTabBar2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_wd_swiper = () => "../../uni_modules/wot-design-uni/components/wd-swiper/wd-swiper.js";
const _easycom_health_card = () => "../../components/health-card/health-card.js";
const _easycom_z_swiper_item = () => "../../uni_modules/zebra-swiper/components/z-swiper-item/z-swiper-item.js";
const _easycom_z_swiper = () => "../../uni_modules/zebra-swiper/components/z-swiper/z-swiper.js";
const _easycom_small_icon = () => "../../components/small-icon/small-icon.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_y_tab = () => "../../uni_modules/y-tabs/components/y-tab/y-tab.js";
const _easycom_y_tabs = () => "../../uni_modules/y-tabs/components/y-tabs/y-tabs.js";
const _easycom_myTabBar = () => "../../components/myTabBar/myTabBar.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_wd_swiper + _easycom_health_card + _easycom_z_swiper_item + _easycom_z_swiper + _easycom_small_icon + _easycom_uni_icons + _easycom_y_tab + _easycom_y_tabs + _easycom_myTabBar)();
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
    const slideCustomStyle = common_vendor.ref({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "36rpx"
    });
    const options = common_vendor.ref({
      effect: "cards",
      cardsEffect: {
        rotate: false
      }
    });
    const list = common_vendor.ref([
      { isExist: true },
      { isExist: true },
      { isExist: true },
      { isExist: true },
      { isExist: false }
    ]);
    const noticeList = common_vendor.ref(["我草泥马", "一得阁拉米", "摩洛哥炒饼"]);
    const myFunction = common_vendor.ref([{ name: "挂号", url: "/pages/registration/registration" }, { name: "击败" }, { name: "吧唧" }]);
    const itemTab = common_vendor.ref({ myTabbar: 0 });
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
    const onClick = (item) => {
      console.log(item.index === 0);
      common_vendor.index.navigateTo({
        url: item.index === 0 ? "/pages/payment/payment" : "/pages/User/User"
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
    const navToNotice = () => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/notice"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.o(onClick),
        c: common_vendor.o(($event) => current.value = $event),
        d: common_vendor.p({
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
        e: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: "1cf27b2a-4-" + i0 + "," + ("1cf27b2a-3-" + i0),
            b: common_vendor.p({
              cardinfo: {
                isExist: item.isExist
              }
            }),
            c: index,
            d: "1cf27b2a-3-" + i0 + ",1cf27b2a-2"
          };
        }),
        f: common_vendor.p({
          ["custom-style"]: slideCustomStyle.value
        }),
        g: common_vendor.o(($event) => list.value = $event),
        h: common_vendor.p({
          options: options.value,
          modelValue: list.value
        }),
        i: common_vendor.f(myFunction.value, (item, k0, i0) => {
          return {
            a: "1cf27b2a-5-" + i0,
            b: common_vendor.p({
              item
            })
          };
        }),
        j: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        k: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: "/pages/notice/detail?id=" + item._id
          };
        }),
        l: common_vendor.o(navToNotice),
        m: common_vendor.p({
          type: "right",
          size: "20"
        }),
        n: common_vendor.f(Tabs.value, (tab, k0, i0) => {
          return {
            a: tab.title,
            b: "1cf27b2a-9-" + i0 + ",1cf27b2a-8",
            c: common_vendor.p({
              title: tab.title
            })
          };
        }),
        o: common_vendor.sr(tabs, "1cf27b2a-8", {
          "k": "tabs"
        }),
        p: common_vendor.o(($event) => activeIndex.value = $event),
        q: common_vendor.p({
          ["wrap-style"]: {
            "border-radius": "30rpx 30rpx 0 0"
          },
          color: "red",
          barAnimateMode: "worm",
          modelValue: activeIndex.value
        }),
        r: common_vendor.f(Tabs.value, (tab, k0, i0) => {
          return {
            a: common_vendor.f(8, (item, k1, i1) => {
              return {
                a: "1cf27b2a-10-" + i0 + "-" + i1
              };
            }),
            b: tab.title
          };
        }),
        s: activeIndex.value,
        t: common_vendor.o(onTransition),
        v: common_vendor.o(onAnimationfinish),
        w: common_vendor.f(newsLists.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.title),
            c: item.id
          };
        }),
        x: common_assets._imports_0,
        y: common_vendor.t(newsLists.value.length),
        z: common_vendor.p({
          item: itemTab.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
