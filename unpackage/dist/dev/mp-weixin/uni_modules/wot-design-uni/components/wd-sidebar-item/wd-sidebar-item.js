"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_composables_useParent = require("../composables/useParent.js");
const uni_modules_wotDesignUni_components_wdSidebar_types = require("../wd-sidebar/types.js");
const uni_modules_wotDesignUni_components_wdSidebarItem_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
if (!Math) {
  (wdIcon + wdBadge)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdBadge = () => "../wd-badge/wd-badge.js";
const __default__ = {
  name: "wd-sidebar-item",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdSidebarItem_types.sidebarItemProps,
  setup(__props) {
    const props = __props;
    const { parent: sidebar } = uni_modules_wotDesignUni_components_composables_useParent.useParent(uni_modules_wotDesignUni_components_wdSidebar_types.SIDEBAR_KEY);
    const customBadgeProps = common_vendor.computed(() => {
      const badgeProps = uni_modules_wotDesignUni_components_common_util.deepAssign(
        uni_modules_wotDesignUni_components_common_util.isDef(props.badgeProps) ? uni_modules_wotDesignUni_components_common_util.omitBy(props.badgeProps, uni_modules_wotDesignUni_components_common_util.isUndefined) : {},
        uni_modules_wotDesignUni_components_common_util.omitBy(
          {
            max: props.max,
            isDot: props.isDot,
            modelValue: props.badge
          },
          uni_modules_wotDesignUni_components_common_util.isUndefined
        )
      );
      if (!uni_modules_wotDesignUni_components_common_util.isDef(badgeProps.max)) {
        badgeProps.max = 99;
      }
      return badgeProps;
    });
    const active = common_vendor.computed(() => {
      let active2 = false;
      if (sidebar && sidebar.props.modelValue === props.value) {
        active2 = true;
      }
      return active2;
    });
    const prefix = common_vendor.computed(() => {
      let prefix2 = false;
      if (sidebar) {
        let activeIndex = sidebar.children.findIndex((c) => {
          return c.value === sidebar.props.modelValue;
        });
        let currentIndex = sidebar.children.findIndex((c) => {
          return c.value === props.value;
        });
        if (currentIndex === activeIndex - 1) {
          prefix2 = true;
        }
      }
      return prefix2;
    });
    const suffix = common_vendor.computed(() => {
      let suffix2 = false;
      if (sidebar) {
        let activeIndex = sidebar.children.findIndex((c) => {
          return c.value === sidebar.props.modelValue;
        });
        let currentIndex = sidebar.children.findIndex((c) => {
          return c.value === props.value;
        });
        if (currentIndex === activeIndex + 1) {
          suffix2 = true;
        }
      }
      return suffix2;
    });
    function handleClick() {
      if (props.disabled) {
        return;
      }
      sidebar && sidebar.setChange(props.value, props.label);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !_ctx.$slots.icon && _ctx.icon
      }, !_ctx.$slots.icon && _ctx.icon ? {
        b: common_vendor.p({
          ["custom-class"]: "wd-sidebar-item__icon",
          name: _ctx.icon
        })
      } : {}, {
        c: common_vendor.t(_ctx.label),
        d: common_vendor.p({
          ...customBadgeProps.value,
          ["custom-class"]: "wd-sidebar-item__badge"
        }),
        e: common_vendor.o(handleClick),
        f: common_vendor.n(`wd-sidebar-item ${active.value ? "wd-sidebar-item--active" : ""} ${prefix.value ? "wd-sidebar-item--prefix" : ""}  ${suffix.value ? "wd-sidebar-item--suffix" : ""} ${_ctx.disabled ? "wd-sidebar-item--disabled" : ""} ${_ctx.customClass}`),
        g: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0597c3a8"]]);
wx.createComponent(Component);
