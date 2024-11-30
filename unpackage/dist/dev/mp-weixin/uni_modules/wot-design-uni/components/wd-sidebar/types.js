"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const SIDEBAR_KEY = Symbol("wd-sidebar");
const sidebarProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 当前导航项的索引
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeNumericProp(0)
};
exports.SIDEBAR_KEY = SIDEBAR_KEY;
exports.sidebarProps = sidebarProps;
