"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_yTabs_components_js_uitls = require("../js/uitls.js");
const uni_modules_yTabs_components_js_const = require("../js/const.js");
const uni_modules_yTabs_components_js_touchMixin = require("../js/touchMixin.js");
const _sfc_main = {
  name: "y-tabs",
  options: uni_modules_yTabs_components_js_const.options,
  emits: uni_modules_yTabs_components_js_const.emits,
  props: uni_modules_yTabs_components_js_const.props,
  mixins: [uni_modules_yTabs_components_js_touchMixin.touchMixin()],
  data() {
    return {
      isUnmounted: false,
      //标记组件是否卸载
      isLoaded: false,
      //标记组件内部是否已经初始化完成
      // initTimer: null,
      currentIndex: null,
      //当前选中下标
      lastIndex: null,
      //上一个选中的下标
      // childrens: [], // 存放子组件数组
      tabs: [],
      //存放标签栏数据
      tabRects: [],
      //存放标签节点信息等数据
      reseted: true,
      //组件是否重置完成
      shouldSetDx: true,
      //是否可以执行setDx函数
      // 元素节点信息
      stickyRect: {},
      wrapRect: {},
      //标签栏
      contentRect: {},
      // 标签内容容器
      barRect: {},
      //滑块
      dependOffsetRect: {},
      //标签栏吸顶设置offset时的模拟元素
      extraWidth: 0,
      //标签栏navLeft、navRight插槽宽度
      extraHeight: 0,
      //标签栏navLeft、navRight插槽高度
      // 标签栏的scroll-view相关
      scrollLeft: 0,
      //设置横向滚动条位置
      scrollTop: 0,
      //设置竖向滚动条位置
      scrollViewRect: 0,
      //标签栏scroll-view的节点信息
      scrollDetail: { scrollLeft: 0, scrollTop: 0 },
      //标签栏scroll-view滚动时的详情信息
      // 标签栏滑块动画相关
      barOffset: 0,
      //滑块偏移量：水平展示为left值，垂直为top值
      barAnimated: false,
      //是否开启滑块切换动画（首次不开启）
      barCalcedWidth: void 0,
      barCalcedHeight: void 0,
      disabledSetLine: false,
      //是否允许标签切换时设置滑块位置
      firstSetLine: true,
      //是否首次设置滑块，是则透明度为0，避免translate3d设置时会有一瞬间的闪动
      // 内容区域相关
      paneScrollTop: 0,
      //设置内容区域scroll-view的竖向滚动条位置
      trackStyle: null,
      //内容区域滑动轨道样式
      lockedScrollspy: false,
      //锁定滚动导航模式下点击标签栏触发的pane交互观察器的回调执行
      // 标签栏吸顶相关
      // dependObserver: null,
      isFixed: false,
      //标签栏是否吸顶
      cssSticky: false,
      // 是否使用css的sticky实现
      fixedRelativeHeight: 0,
      // 标签栏垂直吸顶时，获取参照节点高度
      vWrapHeight: 0,
      // 标签栏垂直且吸顶时的视口可见区域的标签容器高度
      // 标签栏渐变相关
      // tranObserver: null,
      transparentBgColor: "rgba(255,255,255,0)",
      //标签栏透明背景色
      rgba: {
        R: "",
        G: "",
        B: "",
        A: ""
      }
    };
  },
  computed: {
    // 传入的实际值
    realValue() {
      return this.modelValue;
    },
    // 标签栏是否垂直展示
    isVertical() {
      return this.direction === "vertical";
    },
    // 标签栏垂直展示时允许垂直滚动
    scrollY() {
      return this.isVertical;
    },
    // 标签栏是否允许横向滚动
    scrollX() {
      return !this.isVertical && this.tabs.length > Number(this.scrollThreshold);
    },
    // js模式时，是否处于吸顶模式
    jsFixed() {
      return !this.cssSticky && this.isFixed;
    },
    // 是否省略过长的标题文字
    isEllipsis() {
      return (!this.scrollX || this.isVertical) && this.ellipsis;
    },
    // 是否为滚动导航
    scrollNav() {
      return this.scrollspy && !this.isVertical;
    },
    // 是否为侧边栏导航
    sidebarNav() {
      return this.scrollspy && this.isVertical;
    },
    // 样式风格为滑块
    isLine() {
      return this.type === "line";
    },
    // 样式风格为胶囊，type为button、line-button
    isPills() {
      return ["button", "line-button"].includes(this.type);
    },
    // 用于滑块切换的样式风格，仅支持type为line、button、line-button
    isSlideBlock() {
      return this.isLine || this.isPills;
    },
    // 滑块切换模式为线性运动
    isLineMode() {
      return this.isLine && this.barAnimateMode === "linear";
    },
    // 滑块切换模式为毛毛虫运动
    isWormMode() {
      return this.isLine && this.barAnimateMode.indexOf("worm") >= 0;
    },
    // 当前激活标签的name值
    currentName() {
      if (uni_modules_yTabs_components_js_uitls.isNull(this.currentIndex))
        return "";
      const { name, index } = this.tabs[this.currentIndex] || {};
      return !uni_modules_yTabs_components_js_uitls.isNull(name) ? name : index;
    },
    // 标签数量
    dataLen() {
      return this.tabs.length;
    },
    // 滑动动画时长(ms)
    msDuration() {
      return this.animated ? Number(this.duration) * 1e3 : 0;
    },
    // 在设置滚动条位置时使用动画过渡
    // （scroll-view的过渡动画时长为300ms，不能设置，因此为300ms时使用scroll-view自身的过渡，否则模拟一组数据实现过渡,setInterval时间不准确，暂时不做）
    scrollWithAnimation() {
      return this.animated && this.reseted;
    },
    // 保证标签页唯一的样式
    uniqueTabsClass() {
      return "y-tabs" + uni_modules_yTabs_components_js_uitls.getUid();
    },
    // 标签页class
    tabsClass() {
      return uni_modules_yTabs_components_js_uitls.toClass(
        {
          "is-fixed": this.isFixed,
          "is-vertical": this.isVertical,
          //标签栏是否垂直
          "is-scrollNav": this.scrollNav,
          //滚动导航
          "is-sidebarNav": this.sidebarNav,
          //侧边栏导航
          "is-areaScroll": !this.pageScroll
          //pane是否为区域滚动
        },
        `y-tabs--${this.type}`
      );
    },
    // 标签栏容器class
    wrapClass() {
      return uni_modules_yTabs_components_js_uitls.toClass(
        {
          "is-fixed": this.jsFixed,
          "is-transparent": this.transparent,
          "is-vertical": this.isVertical
        },
        `is-${this.type}`
      );
    },
    // 标签栏class
    navClass() {
      return uni_modules_yTabs_components_js_uitls.toClass({ "is-vertical": this.isVertical, "is-shrink": this.shrink }, `is-${this.type}`);
    },
    // 滑块class
    barClass() {
      return uni_modules_yTabs_components_js_uitls.toClass({ "is-vertical": this.isVertical }, `is-${this.type}`);
    },
    // 内容卡片class
    contentClass() {
      return uni_modules_yTabs_components_js_uitls.toClass({ "is-scrollspy": this.scrollspy, "is-vertical": this.isVertical });
    },
    stickyStyle() {
      const style = {};
      if (this.sticky) {
        if (this.cssSticky) {
          style.position = "sticky";
          style.zIndex = this.zIndex;
          style.top = uni_modules_yTabs_components_js_uitls.addUnit(this.offsetTop);
        } else {
          if (this.closeCssSticky)
            style.position = "relative";
          ["width", "height"].forEach((key) => style[key] = uni_modules_yTabs_components_js_uitls.addUnit(this.stickyRect[key]));
        }
      } else {
        style.position = "relative";
      }
      return style;
    },
    // 标签栏容器样式
    innerWrapStyle() {
      const style = {};
      const background = !this.transparent ? this.background : this.transparentBgColor;
      if (!uni_modules_yTabs_components_js_uitls.isNull(background))
        style.background = background;
      if (this.sticky && !this.cssSticky) {
        style.position = this.isFixed ? "fixed" : "static";
        style.top = uni_modules_yTabs_components_js_uitls.addUnit(this.offsetTop);
        style.left = uni_modules_yTabs_components_js_uitls.addUnit(this.stickyRect.left);
        style.width = uni_modules_yTabs_components_js_uitls.addUnit(this.stickyRect.width);
        style.zIndex = this.zIndex;
      }
      if (this.isVertical && this.isFixed) {
        style.height = uni_modules_yTabs_components_js_uitls.addUnit(Math.min(this.fixedRelativeHeight, this.wrapRect.height));
      }
      return style;
    },
    // 标签栏样式
    navStyle() {
      const style = {};
      if (this.type === "card")
        style.borderColor = this.color;
      return style;
    },
    // 标签栏吸顶的依赖元素样式
    dependStyle() {
      return { top: `-${Number(this.stickyThreshold)}px` };
    },
    // 模拟标签栏吸顶时设置offset的样式
    dependOffsetStyle() {
      return { top: `${this.offsetTop}px` };
    },
    dependTranStyle() {
      return { height: `${Number(this.transparentOffset)}px` };
    },
    // 滑块透明度
    lineOpacity() {
      return !this.isSlideBlock || this.currentIndex === null || this.firstSetLine ? 0 : 1;
    },
    // 滑块容器动画样式
    barAnimatedStyle() {
      const x = !this.isVertical ? `${this.barOffset}px` : 0;
      const y = !this.isVertical ? 0 : `${this.barOffset}px`;
      const style = {
        opacity: this.lineOpacity,
        transform: `translate3d(${x},${y},0)`,
        transition: this.barAnimated ? `all ${this.duration}s linear` : "none"
      };
      if ((this.isPills || this.autoLineBarHeight) && this.isVertical)
        style.height = uni_modules_yTabs_components_js_uitls.addUnit(this.barCalcedHeight);
      return style;
    },
    // line风格的底部条宽度自适应选中标签宽度，仅对barAnimateMode为linear生效
    autoLineBarWidth() {
      return this.isLine && this.barAnimateMode === "linear" && this.barWidth === "auto";
    },
    // line风格的底部条高度自适应选中标签高度，仅对barAnimateMode为linear生效
    autoLineBarHeight() {
      return this.isLine && this.barAnimateMode === "linear" && this.barHeight === "auto";
    },
    // 滑块内容样式
    barInnerStyle() {
      const style = {};
      style.transition = this.barAnimated ? `all ${this.duration}s linear` : "none";
      const width = !uni_modules_yTabs_components_js_uitls.isNull(this.barCalcedWidth) ? uni_modules_yTabs_components_js_uitls.addUnit(this.barCalcedWidth) : null;
      const height = !uni_modules_yTabs_components_js_uitls.isNull(this.barCalcedHeight) ? uni_modules_yTabs_components_js_uitls.addUnit(this.barCalcedHeight) : null;
      if (width)
        style.width = width;
      if (height)
        style.height = height;
      switch (this.type) {
        case "line":
          if (this.color)
            style.backgroundColor = this.color;
          if (this.isVertical && width)
            style.borderRadius = width;
          if (!this.isVertical && height)
            style.borderRadius = height;
          break;
        case "button":
          if (this.color)
            style.backgroundColor = this.color;
          if (height)
            style.borderRadius = height;
          break;
        case "line-button":
          if (this.color)
            style.borderColor = this.color;
          if (height)
            style.borderRadius = height;
          break;
      }
      return style;
    },
    // 标签栏scroll-view样式
    scrollStyle() {
      if (!this.isVertical)
        return { width: `calc(100% - ${this.extraWidth}px)` };
      return { height: `calc(100% - ${this.extraHeight}px)` };
    },
    // 标签水平展示时到中心点的宽度 
    tabCenterWidth() {
      var _a, _b;
      const wrapW = (_a = this.wrapRect) == null ? void 0 : _a.width;
      const viewW = (_b = this.scrollViewRect) == null ? void 0 : _b.width;
      const width = viewW < wrapW ? viewW : wrapW - this.extraWidth;
      return width / 2;
    },
    // 标签垂直展示时到中心点的高度
    tabCenterHeight() {
      var _a, _b;
      const wrapH = (_a = this.wrapRect) == null ? void 0 : _a.height;
      const viewH = (_b = this.scrollViewRect) == null ? void 0 : _b.height;
      const height = viewH < wrapH ? viewH : wrapH - this.extraHeight;
      return height / 2;
    },
    // 内容宽度
    contentWidth() {
      var _a;
      let width = ((_a = this.contentRect) == null ? void 0 : _a.width) || 0;
      return width;
    },
    // 页面级滚动，非导航模式下，如果标签栏吸顶，记录上一个pane的滚动位置，保证切换切换回来时自动定位
    pageScrollLocate() {
      return this.pageScroll && !this.scrollspy && this.isFixed;
    }
  },
  watch: {
    // 监听子组件数组长度变化，赋index值
    "tabs.length"() {
      const lastIndex = this.childrens.length - 1;
      this.childrens.forEach((child, index) => {
        child.index = index;
        child.isActiveLast = this.activeLast ? lastIndex === index : false;
        const tab = this.tabs[index];
        if (tab)
          this.$set(tab, "index", index);
      });
    },
    // 监听选中标识符变化,用于绑定的v-model变化时激活对应的标签
    realValue(value) {
      if (this.isLoaded && value !== this.currentName)
        this.setCurrentIndexByName(value);
    },
    // 监听选中下标变化
    currentIndex(newIdx, oldIdx) {
      if (uni_modules_yTabs_components_js_uitls.isNull(newIdx))
        return;
      this.lastIndex = oldIdx;
      if (this.scrollspy)
        this.childrens.forEach((child, index) => child.isDisjoint = index < newIdx);
      this.$nextTick(() => {
        this.setLine();
        if (!this.scrollspy) {
          this.changeStatus(newIdx, oldIdx);
          this.changeStyle();
        }
      });
    },
    // 监听背景色变化，重新获取rgba各值
    background: {
      immediate: true,
      handler(value) {
        if (this.transparent) {
          const color = uni_modules_yTabs_components_js_uitls.getColor(uni_modules_yTabs_components_js_uitls.isNull(value) ? "rgba(255,255,255,0)" : value);
          if (color.length) {
            const [R, G, B, A] = color;
            this.rgba = { R, G, B, A: parseFloat(A) };
          } else {
            throw new Error("元素背景颜色必须为RGBA");
          }
        }
      }
    },
    isFixed(val) {
      this.$emit("sticky-change", { isFixed: val });
      this.updateTabsWrapRect();
      this.clearScrollPostion();
    },
    // 更新滑块计算宽度
    barWidth: {
      immediate: true,
      handler(val) {
        if (val !== "auto")
          this.barCalcedWidth = val;
      }
    },
    // 更新滑块计算高度
    barHeight: {
      immediate: true,
      handler(val) {
        if (val !== "auto")
          this.barCalcedHeight = val;
      }
    }
  },
  created() {
    this.childrens = [];
  },
  mounted() {
  },
  unmounted() {
    this.isUnmounted = true;
    this.unInit();
  },
  // 组件创建了Observer监听，当切换页面时页面不一定会销毁， 因此tabs组件也没有销毁，就无法触发destroyed或unmounted钩子，导致unInit方法不会调用从而断开监听。
  // 在页面隐藏后，组件仍然保持监听，会因为获取不到元素的节点信息而报错：Cannot read property 'bottom' of null
  // 因此在组件失活后手动断开监听来解决这个报错
  activated() {
    this.createObserver();
  },
  deactivated() {
    this.destroyObserver();
  },
  methods: {
    // 卸载组件的处理
    unInit() {
      this.destroyObserver();
    },
    // @exposed-api 重置组件的一些状态
    reset(callback) {
      this.reseted = false;
      this.barAnimated = false;
      this.lockedScrollspy = true;
      this.disabledSetLine = false;
      this.firstSetLine = true;
      this.shouldSetDx = true;
      this.scrollLeft = 0;
      this.scrollTop = 0;
      this.scrollDetail = { scrollLeft: 0, scrollTop: 0 };
      this.paneScrollTop = 0;
      this.barCalcedWidth = this.barWidth;
      this.barCalcedHeight = this.barHeight;
      this.$nextTick(() => {
        this.reseted = true;
        this.resize(callback);
      });
    },
    // @exposed-api 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘
    async resize(callback) {
      this.init(() => {
        callback && callback();
      });
    },
    // @exposed-api 滚动到指定的标签页，在滚动导航模式下可用
    scrollTo(name) {
      this.$nextTick(() => {
        this.setCurrentIndexByName(name);
        this.scrollToCurrentContent(false);
      });
    },
    // 添加tab
    putTab(props) {
      const defaultSlotName = "title" + this.tabs.length;
      this.tabs.push({
        ...props,
        //标题插槽名，默认以"title"+下标命名，如果用户设置了titleSlotName，就使用titleSlotName
        //vue3只有H5、app支持自定义标签插槽,因此通过titleSlot控制vue3下的小程序端是否使用插槽，否则直接显示标题
        defaultSlotName,
        //标题的默认插槽名
        titleSlotName: this.getTitleSlotName(defaultSlotName, props == null ? void 0 : props.titleSlotName),
        //标题的实际插槽名
        show: this.scrollspy
        //是否显示内容（滚动导航模式默认显示）
      });
      this.$nextTick(() => {
        this.initTimer && clearTimeout(this.initTimer);
        this.initTimer = setTimeout(() => this.init(), 5);
      });
    },
    // 更新tab
    updateTab(props, index) {
      const tab = this.tabs[index];
      Object.entries(props || {}).forEach((ele) => this.$set(tab, ele[0], ele[1]));
      this.$set(tab, "titleSlotName", this.getTitleSlotName(tab.defaultSlotName, props == null ? void 0 : props.titleSlotName));
    },
    // 获取标题插槽名
    getTitleSlotName(defaultSlotName, titleSlotName) {
      return !uni_modules_yTabs_components_js_uitls.isNull(titleSlotName) ? titleSlotName : defaultSlotName;
    },
    // 标签项class
    tabClass(index, tab) {
      return uni_modules_yTabs_components_js_uitls.toClass(
        {
          "is-active": this.currentIndex === index,
          "is-disabled": tab.disabled,
          "is-animated": this.isSlideBlock,
          "is-shrink": this.shrink,
          "y-tabs__ellipsis": this.isEllipsis,
          "y-tab__prev": index === this.currentIndex - 1,
          //与当前标签相邻的前面的标签
          "y-tab__next": index === this.currentIndex + 1
          //与当前标签相邻的后面的标签
        },
        `is-${this.type}`,
        `y-tab_${index}`,
        tab.titleClass
      );
    },
    // 标签区域class
    titleClass(tab) {
      return uni_modules_yTabs_components_js_uitls.toClass({ "y-tabs__ellipsis": this.isEllipsis }, `y-tab__title--${tab.position}`);
    },
    // 标签文字class
    textClass(tab) {
      return uni_modules_yTabs_components_js_uitls.toClass({ "y-tabs__ellipsis": this.isEllipsis }, `y-tab__text--${tab.position}`);
    },
    // 标签项style
    tabStyle(index) {
      const activated = this.currentIndex === index;
      if (activated && this.type === "card")
        return { background: this.color };
      else
        return {};
    },
    // 标题style
    titleStyle(tab) {
      const activated = this.currentIndex === tab.index;
      let { titleActiveColor: color, titleInactiveColor: defColor } = this;
      switch (this.type) {
        case "line":
          if (uni_modules_yTabs_components_js_uitls.isNull(color))
            color = "#323233";
          if (uni_modules_yTabs_components_js_uitls.isNull(defColor))
            defColor = "#646566";
          break;
        case "text":
          if (uni_modules_yTabs_components_js_uitls.isNull(color))
            color = this.color;
          if (uni_modules_yTabs_components_js_uitls.isNull(defColor))
            defColor = "#323233";
          break;
        case "card":
          if (uni_modules_yTabs_components_js_uitls.isNull(color))
            color = "#fff";
          if (uni_modules_yTabs_components_js_uitls.isNull(defColor))
            defColor = this.color;
          break;
        case "button":
          if (uni_modules_yTabs_components_js_uitls.isNull(color))
            color = "#fff";
          if (uni_modules_yTabs_components_js_uitls.isNull(defColor))
            defColor = "#323233";
        case "line-button":
          if (uni_modules_yTabs_components_js_uitls.isNull(color))
            color = this.color;
          if (uni_modules_yTabs_components_js_uitls.isNull(defColor))
            defColor = "#323233";
          break;
      }
      const titleStyle = activated ? this.titleActiveStyle : this.titleInactiveStyle;
      const style = {
        color: activated ? color : defColor,
        ...titleStyle || {},
        ...tab.titleStyle || {}
      };
      return style;
    },
    // 徽标格式化
    formatBadge(tab) {
      if (!uni_modules_yTabs_components_js_uitls.isNull(tab == null ? void 0 : tab.badge) && !uni_modules_yTabs_components_js_uitls.isNull(tab == null ? void 0 : tab.badgeMaxCount) && (tab == null ? void 0 : tab.badge) > (tab == null ? void 0 : tab.badgeMaxCount)) {
        return (tab == null ? void 0 : tab.badgeMaxCount) + "+";
      } else {
        return tab == null ? void 0 : tab.badge;
      }
    },
    // 初始化操作
    async init(callback) {
      var _a, _b;
      try {
        this.stickyRect = await this.getRect(".y-tabs__sticky");
        this.wrapRect = await this.getRect(".y-tabs__wrap");
        this.scrollViewRect = await this.getRect(".y-tabs__scroll");
        this.barRect = await this.getRect(".y-tabs__bar");
        this.contentRect = await this.getRect(".y-tabs__content");
        this.dependOffsetRect = await this.getRect(".y-tabs__depend--offset");
        const r1 = await this.getRect(".y-tabs__nav-left");
        const r2 = await this.getRect(".y-tabs__nav-right");
        this.extraWidth = (r1 == null ? void 0 : r1.width) + (r2 == null ? void 0 : r2.width);
        this.extraHeight = (r1 == null ? void 0 : r1.height) + (r2 == null ? void 0 : r2.height);
        const barWidth = (_a = this.barRect) == null ? void 0 : _a.width;
        const barHeight = (_b = this.barRect) == null ? void 0 : _b.height;
        if (this.isLine) {
          if (!this.isVertical && barWidth > 0)
            this.barCalcedWidth = barWidth;
          if (this.isVertical && barHeight > 0)
            this.barCalcedHeight = barHeight;
        }
        await this.updateTabRect(true);
        await this.createObserver();
        this.setCurrentIndexByName(this.realValue);
        await this.setLine();
        this.emitLoaded();
      } finally {
        callback && callback();
      }
    },
    // 触发组件内部初始化完成的事件"loaded"
    emitLoaded() {
      if (this.isLoaded)
        return;
      this.$nextTick(() => {
        this.isLoaded = true;
        this.$emit("loaded");
      });
    },
    // 创建观察器
    async createObserver() {
      await this.observeSticky();
      await this.observerTransparent();
      await this.observePane();
    },
    // 销毁观察器
    destroyObserver() {
      var _a;
      ["dependObserver", "tranObserver"].forEach((name) => this.disconnectObserver(name));
      (_a = this.childrens) == null ? void 0 : _a.forEach((child) => child.disconnectObserver());
    },
    // 断掉观察，释放资源
    disconnectObserver(observerName) {
      const observer = this[observerName];
      observer && observer.disconnect();
    },
    // 观察 - 标签栏吸顶
    async observeSticky() {
      if (!this.sticky)
        return;
      if (!this.closeCssSticky)
        this.checkSupportCssSticky();
      this.disconnectObserver("dependObserver");
      const dependObserver = common_vendor.index.createIntersectionObserver(this, {
        thresholds: [0, 0.95, 0.98, 1]
      });
      const offsetTop = Number(this.offsetTop);
      dependObserver.relativeToViewport({ top: -offsetTop });
      dependObserver.observe(`.${this.uniqueTabsClass} .y-tabs__depend`, (res) => {
        this.isFixed = res.intersectionRatio <= 0 && res.boundingClientRect.top <= offsetTop;
        if (this.isVertical && this.isFixed)
          this.fixedRelativeHeight = res.relativeRect.height;
      });
      this.dependObserver = dependObserver;
    },
    // 检测是否支持css sticky
    async checkSupportCssSticky() {
      const sys = common_vendor.index.getSystemInfoSync();
      const os = sys.platform.toLowerCase();
      if (os === "android" && Number(sys.system) > 8) {
        this.cssSticky = true;
      }
      this.cssSticky = await this.checkComputedStyle();
      if (os === "ios") {
        this.cssSticky = true;
      }
      console.log("cssSticky:" + this.cssSticky);
    },
    // 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
    checkComputedStyle() {
      return new Promise((resolve) => {
        common_vendor.index.createSelectorQuery().in(this).select(".y-tabs__sticky").fields({
          computedStyle: ["position"]
          //指定样式名列表，返回节点对应样式名的当前值（仅 App 和微信小程序支持）
        }).exec((e) => {
          var _a;
          return resolve("sticky" === ((_a = e == null ? void 0 : e[0]) == null ? void 0 : _a.position));
        });
      });
    },
    // H5通过创建元素的形式嗅探是否支持css sticky
    // 判断浏览器是否支持sticky属性
    checkCssStickyForH5() {
    },
    // 观察 - 透明渐变标签栏
    async observerTransparent() {
      if (!this.transparent)
        return;
      const transOffset = Number(this.transparentOffset);
      const screenHeight = common_vendor.index.getSystemInfoSync().screenHeight;
      const rect = await this.getRect(".y-tabs__depend--transparent");
      const visibleHeight = screenHeight - rect.top;
      const length = 30;
      const increment = 1 / transOffset * Math.floor(transOffset / length);
      const thresholds = Array.from({ length: length + 1 }, (_, i) => {
        let value = Number((i * increment).toFixed(3));
        if (value > 1)
          value = 1;
        if (value < 0)
          value = 0;
        return value;
      });
      this.disconnectObserver("tranObserver");
      const tranObserver = common_vendor.index.createIntersectionObserver(this, { thresholds });
      tranObserver.relativeToViewport({ bottom: -visibleHeight });
      tranObserver.observe(".y-tabs__depend--transparent", (res) => {
        const { A, R, G, B } = this.rgba || {};
        let opacity = res.boundingClientRect.top > res.relativeRect.top ? res.intersectionRatio + A : 1;
        opacity = Math.min(Math.max(A, opacity), 1);
        this.transparentBgColor = `rgba(${R},${G},${B},${opacity})`;
      });
      this.tranObserver = tranObserver;
    },
    // 观察 - 标签内容滚动时定位标签项
    async observePane() {
      var _a, _b;
      if (!this.scrollspy)
        return;
      const top = this.pageScroll ? Number(this.offsetTop) + (this.scrollNav ? ((_a = this.wrapRect) == null ? void 0 : _a.height) || 0 : 0) : ((_b = this.contentRect) == null ? void 0 : _b.top) || 0;
      this.childrens.forEach(async (child) => await child.observePane(top));
    },
    // 标签点击事件
    onClick(index) {
      const { title, disabled, computedName } = this.childrens[index];
      if (disabled) {
        this.$emit("disabled", computedName, title);
      } else {
        this.$emit("click", computedName, title);
        uni_modules_yTabs_components_js_uitls.callInterceptor({
          interceptor: this.beforeChange,
          args: [computedName],
          done: () => {
            this.disabledSetLine = false;
            this._lockDx();
            this.setCurrentIndex(index);
            setTimeout(() => this.scrollToCurrentContent(), 0);
          }
        });
      }
    },
    // 更正活动选项卡的索引
    setCurrentIndexByName(name) {
      const matched = this.childrens.find((child) => child.computedName === name);
      const defaultIndex = this.childrens[0] ? this.childrens[0].index : 0;
      this.setCurrentIndex(matched ? matched.index : defaultIndex);
    },
    // 设置当前下标
    setCurrentIndex(currentIndex) {
      const newIndex = this.findAvailableTab(currentIndex);
      if (!uni_modules_yTabs_components_js_uitls.isDef(newIndex))
        return;
      const shouldEmit = newIndex !== this.currentIndex;
      const shouldEmitChange = this.currentIndex !== null;
      const { title, computedName, rendered } = this.childrens[newIndex];
      if (this.isLazyRender && !this.scrollspy && !rendered)
        this.$emit("rendered", computedName, title);
      this.currentIndex = newIndex;
      if (shouldEmit) {
        this.$emit("update:modelValue", computedName);
        if (shouldEmitChange)
          this.$emit("change", computedName, title);
      }
    },
    // 查询可用tab
    findAvailableTab(index) {
      var _a;
      const diff = index < this.currentIndex ? -1 : 1;
      while (index >= 0 && index < this.tabs.length) {
        if (!((_a = this.tabs[index]) == null ? void 0 : _a.disabled)) {
          return index;
        }
        index += diff;
      }
    },
    // 设置滑块位置
    async setLine() {
      if (this.isDynamic)
        await this.updateTabRect(false);
      const rect = this.tabRects[this.currentIndex];
      if (this.isSlideBlock && !this.disabledSetLine) {
        if (this.isPills || this.autoLineBarWidth || this.autoLineBarHeight) {
          if (!this.isVertical)
            this.barCalcedWidth = rect == null ? void 0 : rect.width;
          else
            this.barCalcedHeight = rect == null ? void 0 : rect.height;
        }
        this.barOffset = rect == null ? void 0 : rect.barOffset;
        if (!this.barAnimated) {
          this.delayedFn(
            () => {
              this.barAnimated = true;
              this.firstSetLine = false;
            },
            "barAnimatedTimer"
          );
        }
      }
      this.delayedFn(() => this.scrollIntoView(), "scrollIntoViewTimer");
    },
    // 将激活的tab滚动到可见区域中
    async scrollIntoView() {
      if (!this.scrollX && !this.scrollY)
        return;
      const rect = this.tabRects[this.currentIndex];
      const fieldName = !this.isVertical ? "scrollLeft" : "scrollTop";
      let scrollOffset = this.scrollToCenter ? rect == null ? void 0 : rect.scrollOffset : rect == null ? void 0 : rect[!this.isVertical ? "offsetLeft" : "offsetTop"];
      if (scrollOffset < 0)
        scrollOffset = 0;
      this[fieldName] = scrollOffset;
    },
    // 滚动到当前标签内容
    async scrollToCurrentContent(immediate = false) {
      var _a, _b;
      if (!this.scrollspy)
        return;
      this.lockedScrollspy = true;
      let { scrollTop = 0 } = await this.getScrollViewRect();
      let { top = 0 } = await this.childrens[this.currentIndex].getRect();
      if (this.pageScroll) {
        if (this.scrollNav && this.sticky) {
          top -= ((_a = this.dependOffsetRect) == null ? void 0 : _a.top) || 0;
          top -= ((_b = this.wrapRect) == null ? void 0 : _b.height) || 0;
        }
      } else {
        const rect = await this.getRect(".y-tabs__content");
        top -= (rect == null ? void 0 : rect.top) || 0;
      }
      scrollTop += top;
      scrollTop = Math.max(0, scrollTop);
      scrollTop += Math.random() * 0.1;
      if (this.pageScroll) {
        const duration = immediate ? 0 : this.msDuration;
        common_vendor.index.pageScrollTo({ scrollTop, duration });
        this.handleTransparentColor(duration);
      } else {
        this.paneScrollTop = scrollTop;
      }
      this.unLockedPane(scrollTop);
    },
    // 标签栏scroll-view滚动时触发
    handleScrollByNav(e) {
      this.scrollDetail = e == null ? void 0 : e.detail;
    },
    // 释放滚动锁
    releaseScrollspyLock() {
      this.lockedScrollspy = false;
    },
    // 释放pane滚动锁
    async unLockedPane(scrollTop) {
      await this.callNextTick();
      const ms = (this.pageScroll ? this.msDuration : 300) + 50;
      this.intervalFn(async (clear) => {
        const rect = await this.getScrollViewRect();
        if (rect.scrollTop >= scrollTop - 5 && rect.scrollTop <= scrollTop + 5) {
          this.releaseScrollspyLock();
          clear();
        }
      }, "paneLockedTimer", ms);
    },
    // 处理因调用uni.pageScrollTo使页面快速滚动而无法触发透明标签栏的observe监听
    handleTransparentColor(ms = 0) {
      ms = ms + 50;
      this.intervalFn(async (clear) => {
        const { scrollTop = 0 } = await this.getScrollViewRect();
        if (ms > 0) {
          let opacity = scrollTop < this.transparentOffset ? scrollTop * 0.01 : 1;
          if (opacity < 1)
            ms -= 50;
          else
            ms = 0;
          const { A, R, G, B } = this.rgba || {};
          opacity = Math.min(Math.max(A, opacity), 1);
          this.transparentBgColor = `rgba(${R},${G},${B},${opacity})`;
        } else {
          clear();
        }
      }, "transparentColorTimer", 50);
    },
    // 设置内容区域滚动时激活的下标
    setActivedIndexToScroll() {
      const childs = this.childrens.filter((o) => o.isDisjoint);
      let index = 0;
      if (childs.length > 0) {
        const dIndex = childs[childs.length - 1].index;
        index = dIndex === this.childrens.length - 1 ? dIndex : dIndex + 1;
      }
      if (index !== this.currentIndex)
        this.setCurrentIndex(index);
    },
    // 状态变更
    changeStatus(newIdx, oldIdx) {
      this.tabs[oldIdx] && (this.tabs[oldIdx].show = false);
      this.tabs[newIdx] && (this.tabs[newIdx].show = true);
      this.childrens[newIdx] && (this.childrens[newIdx].rendered = true);
      this.childrens.forEach((child, index) => child.active = newIdx === index);
    },
    // 样式切换
    async changeStyle() {
      this.changeTrackStyle(false);
      await this.callNextTick();
      this.changePaneStyle();
    },
    // 改变标签内容滑动轨道样式
    changeTrackStyle(isSlide = false, duration, offsetWidth = 0) {
      const left = isSlide ? offsetWidth + "px" : -100 * this.currentIndex + "%";
      duration = uni_modules_yTabs_components_js_uitls.isNull(duration) ? this.duration : duration;
      this.trackStyle = {
        transform: `translate(${left}, 0px) translateZ(0px)`,
        transition: this.animated ? `transform ${duration}s linear` : "none"
      };
    },
    // 改变标签内容样式
    async changePaneStyle() {
      var _a, _b, _c;
      const curr = this.childrens[this.currentIndex];
      if (!curr)
        return;
      let viewScrollTop = null;
      if (this.pageScrollLocate) {
        const rect2 = await this.getScrollViewRect();
        viewScrollTop = rect2 == null ? void 0 : rect2.scrollTop;
        if (!uni_modules_yTabs_components_js_uitls.isNull(this.lastIndex))
          this.$set(this.tabs[this.lastIndex], "scrollTop", viewScrollTop);
      }
      curr.paneStyle = null;
      const rect = await curr.getRect(".y-tab__pane--wrap");
      const panStyle = { height: (rect == null ? void 0 : rect.height) + "px" };
      this.tabs.filter((o) => !o.show).forEach((tab) => {
        const pane = this.childrens[tab.index];
        if (pane)
          pane.paneStyle = panStyle;
      });
      if (this.pageScrollLocate) {
        let scrollTop = (_a = this.tabs[this.currentIndex]) == null ? void 0 : _a.scrollTop;
        if (uni_modules_yTabs_components_js_uitls.isNull(scrollTop)) {
          const rect2 = await ((_c = (_b = this.childrens) == null ? void 0 : _b[this.lastIndex]) == null ? void 0 : _c.getRect());
          scrollTop = viewScrollTop + (rect2 == null ? void 0 : rect2.top) - this.wrapRect.height - this.offsetTop + 2;
        }
        if (!uni_modules_yTabs_components_js_uitls.isNull(scrollTop))
          this.$nextTick(() => common_vendor.index.pageScrollTo({ scrollTop, duration: 0 }));
      }
    },
    // 清除标签内容的滚动位置
    clearScrollPostion() {
      if (this.pageScrollLocate)
        this.tabs.forEach((tab) => this.$set(tab, "scrollTop", null));
    },
    // 获取标签栏scroll-view当前的滚动偏移量
    getTabScrollOffset() {
      return new Promise((resolve, reject) => {
        const nodeRef = this.getSelectorQuery().select(`.${this.uniqueTabsClass} .y-tabs__scroll`);
        const fieldName = !this.isVertical ? "scrollLeft" : "scrollTop";
        nodeRef.scrollOffset((res) => resolve((res == null ? void 0 : res[fieldName]) || 0)).exec();
      });
    },
    // 获取页面或内容区域的滚动高度
    getScrollViewRect() {
      return new Promise((resolve, reject) => {
        const nodeRef = this.pageScroll ? common_vendor.index.createSelectorQuery().selectViewport() : this.getSelectorQuery().select(
          `.${this.uniqueTabsClass} .y-tabs__content-scrollview`
        );
        nodeRef.scrollOffset((res) => resolve(res || {})).exec();
      });
    },
    // 更新标签栏wrap的节点信息
    updateTabsWrapRect() {
      if (!this.isVertical)
        return;
      this.$nextTick(async () => {
        this.wrapRect = await this.getRect(".y-tabs__wrap");
        this.scrollViewRect = await this.getRect(".y-tabs__scroll");
        this.tabRects.forEach((item) => {
          const res = this.getTabOffset(item);
          this.$set(item, "barOffset", res.barOffset);
          this.$set(item, "scrollOffset", res.scrollOffset);
        });
      });
    },
    //更新标签节点信息
    async updateTabRect(isFull = false) {
      var _a, _b;
      if (isFull) {
        const isInit = ((_a = this.scrollDetail) == null ? void 0 : _a.scrollLeft) === 0 && ((_b = this.scrollDetail) == null ? void 0 : _b.scrollTop) === 0;
        const rects = await this.getBatchRect(this.tabs.map((_, i) => `.y-tab_${i}`));
        this.tabRects = this.tabs.map((tab, index) => {
          var _a2, _b2, _c, _d;
          const r = rects[index] || {};
          const result = {
            index,
            //记录tab下标
            width: r.width,
            //标签宽度
            height: r.height,
            //标签高度
            left: r == null ? void 0 : r.left,
            //标签左边界距屏幕左边界的距离
            top: r == null ? void 0 : r.top,
            //标签上边界距屏幕上边界的距离
            leftSpace: 0,
            //与上一个tab的水平间隙
            topSpace: 0,
            //与上一个tab的垂直间隙
            offsetLeft: 0,
            //标签左边界距scroll-view左边界的距离
            offsetTop: 0,
            //标签上边界距scroll-view上边界的距离
            barOffset: 0,
            //滑块水平/垂直偏移量
            scrollOffset: 0
            //croll-view水平/垂直的滚动偏移量
          };
          let prevRight = (_a2 = rects[index - 1]) == null ? void 0 : _a2.right;
          let prevBottom = (_b2 = rects[index - 1]) == null ? void 0 : _b2.bottom;
          if (!isInit) {
            const { scrollLeft, scrollTop } = this.scrollDetail || {};
            result.left += scrollLeft;
            result.top += scrollTop;
            prevRight += scrollLeft;
            prevBottom += scrollTop;
          }
          result.leftSpace = result.left - (index === 0 ? (_c = this.scrollViewRect) == null ? void 0 : _c.left : prevRight);
          result.topSpace = result.top - (index === 0 ? (_d = this.scrollViewRect) == null ? void 0 : _d.top : prevBottom);
          return result;
        });
      } else {
        const idxs = [this.currentIndex];
        if (!uni_modules_yTabs_components_js_uitls.isNull(this.lastIndex))
          idxs.push(this.lastIndex);
        const rects = await this.getBatchRect(idxs.map((i) => `.y-tab_${i}`));
        const keys = ["width", "height", "top", "left"];
        idxs.forEach((i, idx) => {
          var _a2;
          const matched = (_a2 = this.tabRects) == null ? void 0 : _a2[i], rect = rects == null ? void 0 : rects[idx];
          if (matched && rect)
            keys.forEach((key) => this.$set(matched, key, rect == null ? void 0 : rect[key]));
        });
      }
      let tabRects = [];
      if (isFull) {
        tabRects = this.tabRects;
      } else {
        const start = !uni_modules_yTabs_components_js_uitls.isNull(this.lastIndex) ? Math.min(this.lastIndex, this.currentIndex) : this.currentIndex;
        tabRects = this.tabRects.filter((_, i) => i >= start);
      }
      tabRects.forEach((item, i) => {
        const prev = this.tabRects[item.index - 1] || {};
        if (!this.isVertical) {
          this.$set(item, "offsetLeft", item.index === 0 ? item.leftSpace : prev.offsetLeft + prev.width + item.leftSpace);
        } else {
          this.$set(item, "offsetTop", item.index === 0 ? item.topSpace : prev.offsetTop + prev.height + item.topSpace);
        }
        const res = this.getTabOffset(item);
        this.$set(item, "barOffset", res.barOffset);
        this.$set(item, "scrollOffset", res.scrollOffset);
      });
    },
    // 获取动态偏移量等数据
    getTabOffset({ width, height, offsetLeft, offsetTop }) {
      if (!this.isVertical) {
        const cLeft = offsetLeft + width / 2;
        const barOffset = this.isLine && !this.autoLineBarWidth ? cLeft - this.barRect.width / 2 : offsetLeft;
        let scrollOffset = cLeft - this.tabCenterWidth;
        if (scrollOffset < 0)
          scrollOffset = 0;
        return { barOffset, scrollOffset };
      } else {
        const cTop = offsetTop + height / 2;
        const barOffset = this.isLine && !this.autoLineBarHeight ? cTop - this.barRect.height / 2 : offsetTop;
        const scrollOffset = cTop - this.tabCenterHeight;
        return { barOffset, scrollOffset };
      }
    },
    // pane触摸结束事件
    async touchEndForPane(deltaX, currIndex, targetIndex, isChange) {
      const isAnimatedMode = !this.isVertical && (this.isLineMode || this.isWormMode);
      isAnimatedMode && (this.disabledSetLine = true);
      isChange ? this.setCurrentIndex(targetIndex) : this.changeTrackStyle(false);
      if (isAnimatedMode)
        await this.handleWormAnimated(deltaX, currIndex, targetIndex, isChange);
      if (this.isDynamic) {
        await this.callNextTick();
        this.disabledSetLine = false;
        this.setLine();
      }
      this.unlockDx();
    },
    // 内容滑动结束时的毛毛虫动画模拟
    handleWormAnimated(deltaX, currIndex, targetIndex, isChange) {
      return new Promise((resolve) => {
        this.barAnimated = false;
        const duration = this.msDuration, increment = 10;
        const endX = isChange ? this.contentWidth * (deltaX <= 0 ? -1 : 1) : 0;
        const dxList = Array.from({ length: duration / increment }, (_, i) => {
          const currDx = uni_modules_yTabs_components_js_uitls.progress((i + 1) * increment, deltaX, endX, duration);
          return this.getBarPostion(currIndex, currDx);
        });
        this.intervalFn((clear) => {
          if (dxList.length === 0) {
            this.$emit("slide-end", { targetIndex });
            clear();
            resolve();
          } else {
            const values = dxList.shift();
            if (values) {
              this.barOffset = values.barOffset;
              this.barCalcedWidth = values.barCalcedWidth;
              this.$emit("slide-change", {
                dx: values.dx,
                rate: values.rate,
                targetIndex
              });
            }
          }
        }, "barIntervalTimer", increment);
      });
    },
    //锁定dx，用于避免在swiper被动触发滚动时候执行setDx中的代码
    _lockDx() {
      this.shouldSetDx = false;
    },
    //在swiper的@animationfinish中通知y-tabs对setDx的锁定，若在父组件中调用了setDx，则必须调用unlockDx
    unlockDx() {
      this.$nextTick(() => {
        this.barAnimated = true;
        this.shouldSetDx = true;
      });
    },
    /**
     * @exposed-api 设置滑块的水平偏移量
     * @param {number} dx 横向滑动的值
     * @param {boolean} isSwiper 代表是否为swiper组件滑动时调用
     */
    setDx(dx, isSwiper = true) {
      if (this.isVertical)
        return;
      if (!this.shouldSetDx && isSwiper)
        return;
      if (!this.isLineMode && !this.isWormMode)
        return;
      if (isSwiper) {
        this.handleDx(dx);
      } else {
        this.handleDx(dx, false);
      }
    },
    // 设置滑块偏移量及宽度
    handleDx(deltaX, isSwiper = true) {
      const values = this.getBarPostion(this.currentIndex, deltaX);
      if (!values)
        return;
      this.barAnimated = false;
      const { barOffset, barCalcedWidth, dx, rate, targetIndex } = values || {};
      this.barOffset = barOffset;
      this.barCalcedWidth = barCalcedWidth;
      if (!isSwiper)
        this.$emit("slide-change", { dx, rate, targetIndex });
    },
    // 获取滑块应变化的位置
    getBarPostion(currIndex, dx) {
      var _a, _b, _c;
      let barOffset = this.barOffset;
      let barCalcedWidth = this.barCalcedWidth;
      dx = Math.floor(dx);
      const isRight = dx <= 0;
      let dxRate = dx / (this.contentWidth + 0.1);
      const currSwiperIndex = currIndex + parseInt(dxRate);
      if (currSwiperIndex !== currIndex)
        dxRate = dxRate - (currSwiperIndex - currIndex);
      let nextIndex = currSwiperIndex + (isRight ? -1 : 1);
      nextIndex = Math.max(0, nextIndex);
      nextIndex = Math.min(nextIndex, this.dataLen - 1);
      if (currSwiperIndex === nextIndex)
        return null;
      const nextOffset = (_a = this.tabRects[nextIndex]) == null ? void 0 : _a.barOffset;
      const currOffset = (_b = this.tabRects[currSwiperIndex]) == null ? void 0 : _b.barOffset;
      let distanceX = Math.abs(nextOffset - currOffset);
      if (this.isLineMode) {
        barOffset = currOffset + dxRate * distanceX;
        if (this.autoLineBarWidth) {
          const organWidth = this.tabRects[currSwiperIndex].width;
          const width = this.tabRects[nextIndex].width;
          const diff = width - organWidth;
          if (diff !== 0)
            barCalcedWidth = organWidth + diff * Math.abs(dxRate);
        }
      } else if (this.isWormMode) {
        const organWidth = (_c = this.barRect) == null ? void 0 : _c.width;
        if (this.barAnimateMode === "worm") {
          const isHalf = Math.abs(dxRate) >= 0.5;
          dxRate = Math.abs(dxRate * 2);
          let calcedWidth = 0;
          if (!isHalf) {
            calcedWidth = organWidth + dxRate * distanceX;
            if (isRight)
              barOffset = currOffset - dxRate * distanceX;
          } else {
            calcedWidth = organWidth + (2 - dxRate) * distanceX;
            if (!isRight)
              barOffset = currOffset + (dxRate - 1) * distanceX;
            else
              barOffset = nextOffset;
          }
          barCalcedWidth = Math.max(calcedWidth, organWidth);
        } else {
          const maxWidth = distanceX * 0.5;
          const extendWidth = (distanceX - maxWidth) / 2;
          const extendRange = extendWidth / distanceX;
          const shrinkWidth = maxWidth + extendWidth;
          const shrinkRange = shrinkWidth / distanceX;
          const changeWidth = maxWidth - organWidth;
          const rate = Math.abs(dxRate);
          if (rate < extendRange) {
            const addWidth = changeWidth / extendRange * rate;
            barCalcedWidth = Math.max(organWidth + addWidth, organWidth);
            if (!isRight) {
              barOffset = currOffset + extendWidth / extendRange * dxRate;
            } else {
              barOffset = currOffset + dxRate * distanceX - addWidth;
            }
          } else {
            const reduceWidth = changeWidth / shrinkRange * (1 - rate);
            barCalcedWidth = Math.max(organWidth + reduceWidth, organWidth);
            if (!isRight) {
              barOffset = currOffset + extendWidth + shrinkWidth / shrinkRange * (dxRate - extendRange);
            } else {
              barOffset = currOffset + dxRate * distanceX - reduceWidth;
            }
          }
        }
      }
      return {
        barOffset,
        //底部条偏移量
        barCalcedWidth,
        //底部条宽度 
        dx,
        //滑动距离
        targetIndex: nextIndex,
        //滑动到的目标下标
        rate: Math.abs(dx / this.contentWidth)
        //滑动比例
      };
    },
    // 获取查询节点信息的对象
    getSelectorQuery() {
      let query = null;
      query = common_vendor.index.createSelectorQuery().in(this);
      return query;
    },
    // 获取元素位置信息
    getRect(selector) {
      return new Promise((resolve, reject) => {
        if (!selector)
          reject("Parameter is empty");
        const query = this.getSelectorQuery();
        query.select(`.${this.uniqueTabsClass} ${selector}`).boundingClientRect();
        query.exec((data) => resolve(Array.isArray(data) ? data[0] : data));
      });
    },
    // 批量查询节点信息
    getBatchRect(selectors) {
      return new Promise((resolve, reject) => {
        if (!selectors)
          reject("Parameter is empty");
        const query = this.getSelectorQuery();
        const prefix = `.${this.uniqueTabsClass} `;
        selectors.forEach((seletor) => {
          query.select(prefix + seletor).boundingClientRect();
        });
        query.exec((data) => resolve(data || []));
      });
    },
    // 延时执行函数，用于执行指定动画时长(duration)完成后需要触发的逻辑
    delayedFn(cb, name, ms) {
      const self = this;
      function clear() {
        if (self[name]) {
          clearTimeout(self[name]);
          self[name] = null;
        }
      }
      clear();
      this[name] = setTimeout(() => {
        cb && cb();
        clear();
      }, uni_modules_yTabs_components_js_uitls.isNull(ms) ? this.msDuration : ms);
    },
    // 定时器
    intervalFn(cb, name, ms) {
      const self = this;
      function clear() {
        if (self[name]) {
          clearInterval(self[name]);
          self[name] = null;
        }
      }
      clear();
      this[name] = setInterval(() => {
        cb && cb(clear);
      }, ms);
    },
    // 包装一下nextTick的调用：部分用户使用了uView库，该库对$nextTick进行了重写但是未判空，因此传入一个空函数避免报错
    callNextTick() {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          resolve && resolve();
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s($options.dependOffsetStyle),
    b: common_vendor.s($options.dependStyle),
    c: _ctx.transparent
  }, _ctx.transparent ? {
    d: common_vendor.s($options.dependTranStyle)
  } : {}, {
    e: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: tab.iconType || tab.imageSrc
      }, tab.iconType || tab.imageSrc ? common_vendor.e({
        b: tab.iconType
      }, tab.iconType ? {
        c: "3efb49c4-0-" + i0,
        d: common_vendor.p({
          ["custom-prefix"]: tab.customPrefix,
          type: tab.iconType,
          size: Number(tab.iconSize)
        })
      } : {}, {
        e: tab.imageSrc
      }, tab.imageSrc ? {
        f: tab.imageMode,
        g: tab.imageSrc
      } : {}) : {}, {
        h: tab.titleSlot
      }, tab.titleSlot ? {
        i: common_vendor.d(tab.titleSlotName)
      } : {
        j: common_vendor.t(tab.title)
      }, {
        k: common_vendor.n($options.textClass(tab)),
        l: common_vendor.n($options.titleClass(tab)),
        m: common_vendor.s($options.titleStyle(tab)),
        n: tab.dot || tab.badge
      }, tab.dot || tab.badge ? common_vendor.e({
        o: tab.dot
      }, tab.dot ? {} : {}, {
        p: tab.badge
      }, tab.badge ? {
        q: common_vendor.t($options.formatBadge(tab))
      } : {}) : {}, {
        r: tab.key,
        s: common_vendor.o(($event) => $options.onClick(index), tab.key),
        t: common_vendor.n($options.tabClass(index, tab)),
        v: common_vendor.s($options.tabStyle(index))
      });
    }),
    f: $options.isSlideBlock
  }, $options.isSlideBlock ? {
    g: common_vendor.n($options.barClass),
    h: common_vendor.s($options.barAnimatedStyle),
    i: common_vendor.s($options.barInnerStyle),
    j: common_vendor.s(_ctx.barStyle)
  } : {}, {
    k: common_vendor.n($options.navClass),
    l: common_vendor.s($options.navStyle),
    m: $options.scrollX,
    n: $options.scrollY,
    o: $options.scrollWithAnimation,
    p: $data.scrollLeft,
    q: $data.scrollTop,
    r: common_vendor.s($options.scrollStyle),
    s: common_vendor.o((...args) => $options.handleScrollByNav && $options.handleScrollByNav(...args)),
    t: common_vendor.s($options.innerWrapStyle),
    v: common_vendor.s(_ctx.wrapStyle),
    w: common_vendor.n($options.wrapClass),
    x: common_vendor.s($options.stickyStyle),
    y: _ctx.scrollspy && !_ctx.pageScroll
  }, _ctx.scrollspy && !_ctx.pageScroll ? {
    z: $options.scrollWithAnimation,
    A: $data.paneScrollTop
  } : {}, {
    B: common_vendor.n({
      "is-scrollspy": _ctx.scrollspy
    }),
    C: common_vendor.s($data.trackStyle),
    D: common_vendor.n($options.contentClass),
    E: common_vendor.o((...args) => _ctx.touchStart && _ctx.touchStart(...args)),
    F: common_vendor.o((...args) => _ctx.touchMove && _ctx.touchMove(...args)),
    G: common_vendor.o((...args) => _ctx.touchEnd && _ctx.touchEnd(...args)),
    H: common_vendor.n($options.uniqueTabsClass),
    I: common_vendor.n($options.tabsClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3efb49c4"]]);
wx.createComponent(Component);
