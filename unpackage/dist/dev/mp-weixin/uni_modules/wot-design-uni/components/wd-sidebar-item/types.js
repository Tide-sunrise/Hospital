"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const sidebarItemProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /** 当前选项标题 */
  label: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  /** 当前选项的值，唯一标识 */
  value: uni_modules_wotDesignUni_components_common_props.makeRequiredProp([Number, String]),
  /** 徽标显示值 */
  badge: {
    type: [String, Number, null],
    default: null
  },
  /** 徽标属性，透传给 Badge 组件 */
  badgeProps: Object,
  /** 图标 */
  icon: String,
  /** 是否点状徽标 */
  isDot: {
    type: Boolean,
    default: void 0
  },
  /** 徽标最大值 */
  max: Number,
  /** 是否禁用 */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false)
};
exports.sidebarItemProps = sidebarItemProps;
