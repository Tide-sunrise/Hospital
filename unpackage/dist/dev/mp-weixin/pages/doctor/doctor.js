"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "doctor",
  setup(__props) {
    const navToDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/doctor-details/doctor-details"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(14, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.f(8, (item, k0, i0) => {
          return {
            a: common_vendor.f(8, (item2, k1, i1) => {
              return {};
            })
          };
        }),
        c: common_assets._imports_0$1,
        d: common_vendor.o(navToDetail)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d944f3d9"]]);
wx.createPage(MiniProgramPage);
