"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_yTabs_components_js_uitls = require("./uitls.js");
const touchMixin = function() {
  return {
    data() {
      return {
        tonchOpt: {
          direction: "",
          //滑动方向
          startX: "",
          //开始滑动的x坐标
          startY: "",
          //开始滑动的y坐标
          nextIndex: -1,
          //下一个切换的标签下标
          moved: false,
          //是否为一次水平滑动
          deltaX: 0,
          deltaY: 0,
          startTimestamp: 0,
          nestedSwipeable: true
          //对于嵌套的上级tabs，是否允许水平滑动（下级tabs滑动边界时才允许上级tabs滑动）
        },
        windowWidth: 414
        //可使用窗口宽度
      };
    },
    computed: {
      // 是否允许水平滑动
      horizontalSwipe() {
        return this.swipeable && this.tonchOpt.nestedSwipeable && !this.scrollspy;
      }
    },
    created() {
      var _a;
      this.nestedTabs = this.getNestedTabs();
      this.windowWidth = ((_a = common_vendor.index.getSystemInfoSync()) == null ? void 0 : _a.windowWidth) || 414;
    },
    methods: {
      //获取嵌套的上级tabs实例
      getNestedTabs(name = "y-tabs") {
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
      touchStart(event) {
        this.releaseScrollspyLock();
        if (!this.horizontalSwipe)
          return;
        this.resetTouchStatus();
        this.tonchOpt.startX = event.touches[0].clientX;
        this.tonchOpt.startY = event.touches[0].clientY;
        this.tonchOpt.startTimestamp = uni_modules_yTabs_components_js_uitls.now();
      },
      touchMove(event) {
        var _a;
        if (!this.horizontalSwipe)
          return;
        const touch = event.touches[0];
        const clientX = touch.clientX < 0 ? 0 : touch.clientX > this.windowWidth ? this.windowWidth : touch.clientX;
        this.tonchOpt.deltaX = this.tonchOpt.startX - clientX;
        this.tonchOpt.deltaY = this.tonchOpt.startY - touch.clientY;
        const offsetX = Math.abs(this.tonchOpt.deltaX);
        const offsetY = Math.abs(this.tonchOpt.deltaY);
        if (!this.tonchOpt.direction || offsetX < 10 && offsetY < 10) {
          this.tonchOpt.direction = uni_modules_yTabs_components_js_uitls.getDirection(offsetX, offsetY);
        }
        if (this.tonchOpt.direction === "horizontal") {
          const { dataLen, contentWidth, currentIndex, tabs, swipeAnimated } = this;
          const isRight = this.tonchOpt.deltaX < 0;
          if (isRight && currentIndex === 0 || !isRight && currentIndex === dataLen - 1) {
            this.setNestTabsSwipe(true);
            return;
          } else {
            this.setNestTabsSwipe(false);
          }
          this.tonchOpt.nextIndex = currentIndex + (isRight ? -1 : 1);
          if ((_a = tabs[this.tonchOpt.nextIndex]) == null ? void 0 : _a.disabled)
            return;
          this.tonchOpt.moved = true;
          if (swipeAnimated) {
            const offsetWidth = contentWidth * currentIndex * -1 + offsetX * (isRight ? 1 : -1);
            this.changeTrackStyle(true, 0, offsetWidth);
            this.setDx(this.tonchOpt.deltaX, false);
          }
          event.preventDefault();
        }
      },
      touchEnd() {
        if (this.tonchOpt.moved) {
          const deltaTime = uni_modules_yTabs_components_js_uitls.now() - this.tonchOpt.startTimestamp;
          const distance = Math.abs(this.tonchOpt.deltaX);
          const speed = (distance / deltaTime).toFixed(4);
          const isChange = speed > 0.25 || distance >= Number(this.swipeThreshold);
          const currIndex = this.currentIndex;
          const targetIndex = isChange ? this.tonchOpt.nextIndex : currIndex;
          this.touchEndForPane(this.tonchOpt.deltaX, currIndex, targetIndex, isChange);
        }
      },
      // 重置触摸状态
      resetTouchStatus() {
        this.tonchOpt.direction = "";
        this.tonchOpt.deltaX = 0;
        this.tonchOpt.deltaY = 0;
        this.tonchOpt.nextIndex = -1;
        this.tonchOpt.moved = false;
        this.tonchOpt.startTimestamp = 0;
        this.setNestTabsSwipe(true);
      },
      // 设置嵌套的上级tabs是否可水平滑动
      setNestTabsSwipe(value) {
        if (!this.nestedTabs)
          return;
        this.nestedTabs.tonchOpt.nestedSwipeable = value;
      }
    }
  };
};
exports.touchMixin = touchMixin;
