"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_wd_sidebar_item2 = common_vendor.resolveComponent("wd-sidebar-item");
  const _easycom_wd_sidebar2 = common_vendor.resolveComponent("wd-sidebar");
  const _easycom_wd_cell2 = common_vendor.resolveComponent("wd-cell");
  const _easycom_wd_cell_group2 = common_vendor.resolveComponent("wd-cell-group");
  const _easycom_precautions2 = common_vendor.resolveComponent("precautions");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_custom_nav_bar2 + _easycom_wd_sidebar_item2 + _easycom_wd_sidebar2 + _easycom_wd_cell2 + _easycom_wd_cell_group2 + _easycom_precautions2 + _easycom_uni_popup2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_wd_sidebar_item = () => "../../uni_modules/wot-design-uni/components/wd-sidebar-item/wd-sidebar-item.js";
const _easycom_wd_sidebar = () => "../../uni_modules/wot-design-uni/components/wd-sidebar/wd-sidebar.js";
const _easycom_wd_cell = () => "../../uni_modules/wot-design-uni/components/wd-cell/wd-cell.js";
const _easycom_wd_cell_group = () => "../../uni_modules/wot-design-uni/components/wd-cell-group/wd-cell-group.js";
const _easycom_precautions = () => "../../components/precautions/precautions.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_wd_sidebar_item + _easycom_wd_sidebar + _easycom_wd_cell + _easycom_wd_cell_group + _easycom_precautions + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "registration",
  setup(__props) {
    const active = common_vendor.ref(0);
    const scrollTop = common_vendor.ref(0);
    const subCategories = new Array(24).fill({ title: "原神", label: "一款开放世界冒险游戏" }, 0, 24);
    const categories = common_vendor.ref([
      {
        label: "分类一",
        title: "标题一",
        icon: "none",
        items: subCategories,
        disabled: false
      },
      {
        label: "分类二",
        title: "标题二",
        icon: "none",
        items: subCategories,
        disabled: false
      },
      {
        label: "分类三",
        title: "标题三",
        icon: "none",
        items: subCategories.slice(0, 18),
        disabled: false
      },
      {
        label: "分类四",
        title: "标题四",
        icon: "none",
        items: subCategories.slice(0, 21),
        disabled: false
      },
      {
        label: "分类五",
        title: "标题五",
        icon: "none",
        items: subCategories,
        disabled: false
      },
      {
        label: "分类六",
        title: "标题六",
        icon: "none",
        items: subCategories.slice(0, 18),
        disabled: false
      },
      {
        label: "分类七",
        title: "标题七",
        icon: "none",
        items: subCategories,
        disabled: true
      }
    ]);
    const scorePopup = common_vendor.ref(null);
    function handleChange({ value }) {
      active.value = value;
      scrollTop.value = -1;
      common_vendor.nextTick$1(() => {
        scrollTop.value = 0;
      });
    }
    const sure = () => {
      console.log("你好");
      scorePopup.value.close();
    };
    const navToDoctor = () => {
      common_vendor.index.navigateTo({
        url: "/pages/doctor/doctor"
      });
    };
    common_vendor.onMounted(() => {
      console.log("onShow");
      scorePopup.value.open();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          isBack: true,
          title: "智能搜索"
        }),
        b: common_vendor.f(categories.value, (item, index, i0) => {
          return {
            a: index,
            b: "1e5d1fa0-2-" + i0 + ",1e5d1fa0-1",
            c: common_vendor.p({
              value: index,
              label: item.label,
              icon: item.icon,
              disabled: item.disabled
            })
          };
        }),
        c: common_vendor.o(handleChange),
        d: common_vendor.o(($event) => active.value = $event),
        e: common_vendor.p({
          modelValue: active.value
        }),
        f: common_vendor.f(categories.value, (item, index, i0) => {
          return {
            a: common_vendor.f(item.items, (cell, index2, i1) => {
              return {
                a: index2,
                b: "1e5d1fa0-4-" + i0 + "-" + i1 + "," + ("1e5d1fa0-3-" + i0),
                c: common_vendor.p({
                  title: cell.title,
                  label: cell.label
                })
              };
            }),
            b: common_vendor.o(navToDoctor, index),
            c: "1e5d1fa0-3-" + i0,
            d: common_vendor.p({
              title: item.title,
              border: true
            }),
            e: index
          };
        }),
        g: common_assets._imports_0$1,
        h: scrollTop.value,
        i: common_vendor.s(`transform: translateY(-${active.value * 100}%)`),
        j: common_vendor.o(sure),
        k: common_vendor.sr(scorePopup, "1e5d1fa0-5", {
          "k": "scorePopup"
        }),
        l: common_vendor.p({
          ["is-mask-click"]: false
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e5d1fa0"]]);
wx.createPage(MiniProgramPage);
