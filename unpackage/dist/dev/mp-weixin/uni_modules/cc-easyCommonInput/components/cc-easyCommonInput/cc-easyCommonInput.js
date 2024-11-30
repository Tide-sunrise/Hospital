"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "cc-easyCommonInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    password: {
      type: Boolean,
      default: false
    },
    leftTitle: {
      type: String,
      default: ""
    },
    rigTitle: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },
  emits: ["update:value"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function updateValue(newValue) {
      emit("update:value", newValue);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.leftTitle),
        b: __props.type == "text"
      }, __props.type == "text" ? {
        c: __props.password,
        d: __props.name,
        e: __props.value,
        f: common_vendor.o(($event) => updateValue($event.target.value)),
        g: __props.placeholder
      } : {}, {
        h: __props.type == "number"
      }, __props.type == "number" ? {
        i: __props.password,
        j: __props.name,
        k: __props.value,
        l: common_vendor.o(($event) => updateValue($event.target.value)),
        m: __props.placeholder
      } : {}, {
        n: __props.type == "idcard"
      }, __props.type == "idcard" ? {
        o: __props.password,
        p: __props.name,
        q: __props.value,
        r: common_vendor.o(($event) => updateValue($event.target.value)),
        s: __props.placeholder
      } : {}, {
        t: __props.type == "digit"
      }, __props.type == "digit" ? {
        v: __props.password,
        w: __props.name,
        x: __props.value,
        y: common_vendor.o(($event) => updateValue($event.target.value)),
        z: __props.placeholder
      } : {}, {
        A: __props.type == "tel"
      }, __props.type == "tel" ? {
        B: __props.password,
        C: __props.name,
        D: __props.value,
        E: common_vendor.o(($event) => updateValue($event.target.value)),
        F: __props.placeholder
      } : {}, {
        G: __props.type == "safe-password"
      }, __props.type == "safe-password" ? {
        H: __props.password,
        I: __props.name,
        J: __props.value,
        K: common_vendor.o(($event) => updateValue($event.target.value)),
        L: __props.placeholder
      } : {}, {
        M: __props.type == "nickname"
      }, __props.type == "nickname" ? {
        N: __props.password,
        O: __props.name,
        P: __props.value,
        Q: common_vendor.o(($event) => updateValue($event.target.value)),
        R: __props.placeholder
      } : {}, {
        S: __props.rigTitle.length
      }, __props.rigTitle.length ? {
        T: common_vendor.t(__props.rigTitle)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55514cde"]]);
wx.createComponent(Component);
