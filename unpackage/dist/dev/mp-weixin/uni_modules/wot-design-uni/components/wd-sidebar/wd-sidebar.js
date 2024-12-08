"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useChildren = require("../composables/useChildren.js");
const uni_modules_wotDesignUni_components_wdSidebar_types = require("./types.js");
const __default__ = {
  name: "wd-sidebar",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSidebar_types.sidebarProps,
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { linkChildren } = uni_modules_wotDesignUni_components_composables_useChildren.useChildren(uni_modules_wotDesignUni_components_wdSidebar_types.SIDEBAR_KEY);
    linkChildren({ props, setChange });
    function setChange(value, label) {
      emit("update:modelValue", value);
      emit("change", { value, label });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(`wd-sidebar ${_ctx.customClass}`),
        b: common_vendor.s(_ctx.customStyle)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d265e78d"]]);
wx.createComponent(Component);
