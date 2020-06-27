<template>
  <div ref="wrapper" id="scroll-wrapper">
    <div class="scroll-content" v-if="pullup">
      <slot></slot>
      <div class="pullup-wrapper">
        <loading-text v-show="!inPullUp" :loadingText="beforePullUpWord"></loading-text>
        <loading v-show="inPullUp" :text="PullingUpWord"></loading>
      </div>
    </div>
    <slot v-else></slot>
    <transition name="pullDown">
      <loading class="pullDown" v-show="inPullDown" :text="downLoadingText"></loading>
    </transition>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import PullUp from '@better-scroll/pull-up';
import loading from '../loading';
import loadingText from '../loading-text';
BScroll.use(PullDown);
BScroll.use(PullUp);
const PullingUpWord = '正在拼命加载中...';
export default {
  components: {
    loading, loadingText
  },
  props: {
    refreshTime: {
      type: String,
      default: ''
    },
    openPullDown: {
      type: Boolean,
      default: false
    },
    pulldown: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    // 用于一开始未出现的listscroll，出现之后为true
    isListInit: {
      type: Boolean,
      default: false
    },
    // BSCroll监听的时机
    probeType: {
      type: Number,
      default: 1
    },
    // BAScroll是否监听点击事件
    click: {
      type: Boolean,
      default: true
    },
    // 是否需要监听滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    data: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
      beforePullUpWord: '上拉加载更多',
      inPullDown: false,
      inPullUp: false,
      PullingUpWord,
      downLoadingText: '刷新中...'
    };
  },
  created () {
    this.scroll = null; // better-scroll创建的滚动对象
  },
  watch: {
    isListInit: function (isListInit) {
      // 当页面DOM渲染完成初始化scroll组件
      // isListInit由true变成false
      this.$nextTick(() => {
        // this.initScroll();
      });
    },
    data () {
      setTimeout(() => {
        this.refreshScroll();
      }, this.refreshDelay);
    },
    inPullDown: function (inPullDown) {
      console.log(inPullDown);
    }
  },
  mounted () {
    setTimeout(() => {
      if (!this.isListInit) {
        this.initScroll();
      }
    }, 300);
  },
  methods: {
    initScroll () {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        pullDownRefresh: this.pulldown,
        pullUpLoad: this.pullup
      });
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos);
        });
      }
      if (this.pulldown) {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown();
          this.$emit('onPullDown');
        });
      }
      if (this.pullup) {
        this.scroll.on('pullingUp', () => {
          this.beforePullUp();
          this.$emit('onPullUp');
        });
      }
    },
    beforePullUp () {
      this.PullingUpWord = PullingUpWord;
      this.inPullUp = true;
    },
    beforePullDown () {
      this.disable();
      this.inPullDown = true;
    },
    finish (type) {
      this['finish' + type]();
      this.enable();
      this['in' + type] = false;
    },
    refreshScroll () {
      this.scroll && this.scroll.refresh();
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    resizeScroll () {
      this.scroll && this.refreshScroll();
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    disable () {
      this.scroll && this.scroll.disable();
    },
    enable () {
      this.scroll && this.scroll.enable();
    },
    finishPullDown () {
      if (this.pulldown) {
        this.scroll && this.scroll.finishPullDown();
      }
    },
    finishPullUp () {
      if (this.pullup) {
        this.scroll && this.scroll.finishPullUp();
      }
    }
  }
};
</script>
<style lang="scss">
.scroll-content {
  min-height: calc(100% + 1px);
}
.pullDown {
  position: absolute;
  top: 0;
  left: 0;
}

.pullDown-enter-active {
  transition: all 0.2s;
}

.pullDown-enter,
.pullDown-leave-active {
  transform: translateY(-100%);
  transition: all 0.2s;
}
</style>
