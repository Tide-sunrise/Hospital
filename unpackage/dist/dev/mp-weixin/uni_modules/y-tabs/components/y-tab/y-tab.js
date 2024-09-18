"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_yTabs_components_js_uitls = require("../js/uitls.js");
const uni_modules_yTabs_components_js_const = require("../js/const.js");
const _sfc_main = {
  name: "y-tab",
  options: uni_modules_yTabs_components_js_const.options,
  props: {
    title: String,
    // 标题
    disabled: Boolean,
    // 是否禁用标签
    dot: Boolean,
    // 是否在标题右上角显示小红点
    badge: {
      type: [Number, String],
      default: ""
    },
    // 图标右上角徽标的内容
    // 徽标数最大数字限制,超过这个数字将变成badgeMaxCount+,如果传空字符串则不设置
    badgeMaxCount: {
      type: [Number, String],
      default: 99
    },
    name: [Number, String],
    // 标签名称，作为匹配的标识符
    titleStyle: Object,
    //	自定义标题样式
    titleClass: String,
    //	自定义标题类名
    iconType: String,
    //图标图案，为uniapp扩展组件（uni-ui）下的uni-icons的type值，customPrefix用法等同
    iconSize: {
      type: [Number, String],
      default: 16
    },
    //图标大小
    customPrefix: String,
    //自定义图标
    imageSrc: String,
    //图片路径
    //图片裁剪、缩放的模式，为uniapp内置组件->媒体组件—>image下的mode值
    imageMode: {
      type: String,
      default: "scaleToFill",
      validator(value) {
        return [
          "scaleToFill",
          "aspectFit",
          "aspectFill",
          "widthFix",
          "heightFix",
          "top",
          "bottom",
          "center",
          "left",
          "right",
          "top left",
          "top right",
          "bottom left",
          "bottom right"
        ].includes(value);
      }
    },
    //如果存在图片或图标，标题围绕它们的位置
    position: {
      type: String,
      default: "right",
      validator(value) {
        return ["top", "bottom", "left", "right"].includes(value);
      }
    },
    // 是否开启标题插槽（仅针对vue3版本下的小程序端），为true则可以自定义标题（在vue3版本下，循环生成的具名动态插槽无法渲染后备内容）
    titleSlot: {
      type: Boolean,
      default: false
    },
    // 标题插槽的name值，默认为'title'+y-tab的下标（比如第一个y-tab，它的默认插槽名称就是'title0'）
    titleSlotName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isUnmounted: false,
      index: -1,
      //内容卡片对应的下标
      // parent: null, //父元素实例
      active: false,
      //是否为激活状态
      rendered: false,
      //是否渲染过
      swipeable: false,
      //是否开启手势滑动切换
      paneStyle: null,
      //内容样式
      scrollspy: false,
      //是否为滚动导航模式
      // paneObserver: null, //pane交叉观察器
      isDisjoint: false,
      //当前pane是否与参照节点布局区域相离
      isActiveLast: false
      // 最后一个pane在滚动导航模式下是否激活对应的标签项
    };
  },
  computed: {
    computedName() {
      return !uni_modules_yTabs_components_js_uitls.isNull(this.name) ? this.name : this.index;
    },
    unqieKey() {
      return uni_modules_yTabs_components_js_uitls.getUid();
    },
    // 保证唯一的样式
    uniquePaneClass() {
      return "y-tab__pane" + this.unqieKey;
    },
    // 内容class
    paneClass() {
      return uni_modules_yTabs_components_js_uitls.toClass({ "is-active": this.active, "is-scrollspy": this.scrollspy });
    }
  },
  created() {
    this.parent = this.getParent();
  },
  mounted() {
    if (!this.parent)
      return;
    if (this.parent.childrens.indexOf(this) === -1)
      this.parent.childrens.push(this);
    this.parent.putTab({ ...uni_modules_yTabs_components_js_uitls.deepClone(this.$props || {}), key: this.unqieKey });
    this.scrollspy = this.parent.scrollspy;
    this.rendered = !this.parent.isLazyRender || this.scrollspy;
    this.$watch(() => this.$props, {
      deep: true,
      handler(props) {
        if (this.parent && props)
          this.parent.updateTab({ ...props }, this.index);
      }
    });
  },
  unmounted() {
    this.isUnmounted = true;
    this.unInit();
  },
  methods: {
    // 获取查询节点信息的对象
    getSelectorQuery() {
      let query = null;
      query = common_vendor.index.createSelectorQuery().in(this);
      return query;
    },
    // 获取元素位置信息
    getRect(selector) {
      return new Promise((resolve, reject) => {
        selector = `.${this.uniquePaneClass}` + (!uni_modules_yTabs_components_js_uitls.isNull(selector) ? " " + selector : "");
        this.getSelectorQuery().select(selector).boundingClientRect().exec((rect) => {
          resolve(rect[0] || {});
        });
      });
    },
    // 卸载组件的处理
    unInit() {
      this.disconnectObserver();
      if (this.parent) {
        const index = this.parent.childrens.findIndex((item) => item === this);
        this.parent.childrens.splice(index, 1);
        this.parent.tabs.splice(index, 1);
        this.parent.tabRects.splice(index, 1);
      }
    },
    //获取父元素实例
    getParent(name = "y-tabs") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    // 断掉观察，释放资源
    disconnectObserver() {
      var _a;
      this.paneObserver && ((_a = this.paneObserver) == null ? void 0 : _a.disconnect());
    },
    // 观察 - 标签内容滚动时定位标签项
    async observePane(top) {
      this.disconnectObserver();
      const paneObserver = common_vendor.index.createIntersectionObserver(this, { thresholds: [0, 0.01, 0.99, 1] });
      paneObserver.relativeToViewport({ top: -top });
      paneObserver.observe(`.${this.uniquePaneClass} .y-tab__pane--wrap`, (res) => {
        if (!this.isActiveLast) {
          this.isDisjoint = res.intersectionRatio <= 0 && res.boundingClientRect.top < res.relativeRect.top;
        } else {
          this.isDisjoint = res.intersectionRatio > 0 && res.boundingClientRect.bottom <= res.relativeRect.bottom;
        }
        if (this.parent.isLoaded && !this.parent.lockedScrollspy)
          this.parent.setActivedIndexToScroll();
      });
      this.paneObserver = paneObserver;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.rendered ? true : $data.active
  }, ($data.rendered ? true : $data.active) ? {} : {}, {
    b: $data.index,
    c: common_vendor.n($options.uniquePaneClass),
    d: common_vendor.n($options.paneClass),
    e: common_vendor.s($data.paneStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2d763a4b"]]);
wx.createComponent(Component);
