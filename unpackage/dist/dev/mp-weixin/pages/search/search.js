"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uv_empty2 = common_vendor.resolveComponent("uv-empty");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2 + _easycom_uv_empty2 + _easycom_uni_load_more2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uv_empty = () => "../../uni_modules/uv-empty/components/uv-empty/uv-empty.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar + _easycom_uv_empty + _easycom_uni_load_more + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const queryParams = common_vendor.ref({
      pageNum: 1,
      pageSize: 12,
      keyword: ""
    });
    const historySearch = common_vendor.ref(["搜索词1", "搜索词2", "搜索词3", "搜索词4"]);
    const recommendList = common_vendor.ref(["美女", "帅哥", "宠物", "卡通"]);
    const noData = common_vendor.ref(false);
    common_vendor.ref(false);
    const classList = common_vendor.ref([
      // {_id:123123,smallPicurl:'https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231102/1698905562410_0_small.webp'}
    ]);
    const infoPopup = common_vendor.ref(null);
    const typeSelect = common_vendor.ref("请选择");
    const timeSelect = () => {
      infoPopup.value.open();
    };
    const switchToD = () => {
      typeSelect.value = "按医生";
      infoPopup.value.close();
    };
    const switchToI = () => {
      typeSelect.value = "按疾病";
      infoPopup.value.close();
    };
    const onSearch = () => {
    };
    const onClear = () => {
    };
    const clickTab = (value) => {
    };
    const removeHistory = () => {
      common_vendor.index.showModal({
        title: "是否清空历史搜索？",
        success: (res) => {
          if (res.confirm) {
            console.log("确认删除");
          }
        }
      });
    };
    common_vendor.onReachBottom(() => {
    });
    common_vendor.onUnload(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(typeSelect.value),
        b: common_vendor.p({
          type: "down",
          size: "20"
        }),
        c: common_vendor.o(timeSelect),
        d: common_vendor.o(onSearch),
        e: common_vendor.o(onClear),
        f: common_vendor.o(onClear),
        g: common_vendor.o(($event) => queryParams.value.keyword = $event),
        h: common_vendor.p({
          focus: true,
          placeholder: "搜索",
          modelValue: queryParams.value.keyword
        }),
        i: common_vendor.p({
          type: "trash",
          size: "25"
        }),
        j: common_vendor.o(removeHistory),
        k: common_vendor.f(historySearch.value, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab,
            c: common_vendor.o(($event) => clickTab(), tab)
          };
        }),
        l: common_vendor.f(recommendList.value, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab,
            c: common_vendor.o(($event) => clickTab(), tab)
          };
        }),
        m: common_vendor.p({
          mode: "search",
          icon: "http://cdn.uviewui.com/uview/empty/search.png"
        }),
        n: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id
          };
        }),
        o: `/pages/preview/preview`,
        p: noData.value || classList.value.length
      }, noData.value || classList.value.length ? {
        q: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {}, {
        r: common_vendor.o(switchToD),
        s: common_vendor.o(switchToI),
        t: common_vendor.sr(infoPopup, "c10c040c-5", {
          "k": "infoPopup"
        }),
        v: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
