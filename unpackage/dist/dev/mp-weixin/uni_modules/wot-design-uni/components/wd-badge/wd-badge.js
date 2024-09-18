"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdBadge_types = require("./types.js");
const __default__ = {
  name: "wd-badge",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdBadge_types.badgeProps,
  setup(__props) {
    const props = __props;
    const content = common_vendor.ref(null);
    common_vendor.watch(
      [() => props.modelValue, () => props.max, () => props.isDot],
      () => {
        notice();
      },
      { immediate: true, deep: true }
    );
    const contentStyle = common_vendor.computed(() => {
      return `background-color: ${props.bgColor};top:${props.top || 0}px;right:${props.right || 0}px`;
    });
    const isBadgeShow = common_vendor.computed(() => {
      let isBadgeShow2 = false;
      if (!props.hidden && (content.value || content.value === 0 && props.showZero || props.isDot)) {
        isBadgeShow2 = true;
      }
      return isBadgeShow2;
    });
    function notice() {
      if (props.isDot)
        return;
      let value = props.modelValue;
      const max = props.max;
      if (value && max && typeof value === "number" && !Number.isNaN(value) && !Number.isNaN(max)) {
        value = max < value ? `${max}+` : value;
      }
      content.value = value;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isBadgeShow.value
      }, isBadgeShow.value ? {
        b: common_vendor.t(content.value),
        c: common_vendor.n(_ctx.type ? "wd-badge__content--" + _ctx.type : ""),
        d: common_vendor.n(_ctx.isDot ? "is-dot" : ""),
        e: common_vendor.s(contentStyle.value)
      } : {}, {
        f: common_vendor.n(_ctx.customClass),
        g: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ea9b0eb"]]);
wx.createComponent(Component);
