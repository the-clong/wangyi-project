<template>
  <div id="scroll-swipe">
    <scroll :data="tags" :scrollX="slideX" class="scroll-tags" ref="tagWrapper">
      <ul v-if="tags.length > 0">
        <li v-for="(item,index) in tags" :key="item.name" @click="changeTags(item,index,$event)" :class="{'active':currentTag === index}" ref="tagItem">
          {{item.name}}
        </li>
      </ul>
    </scroll>
    <slot name="classify"></slot>
    <section class="swiper-container slide-swipe-container">
      <div class="swiper-wrapper">
        <scroll ref="pullrefresh" class="scroll-list swiper-slide" :listenScroll="listenScroll" :pullup="isPullup" :pulldown="isPulldown" @onPullUp="pullUpHandle" @onPullDown="pullDownHandle" :data="itemSlide" v-for="(itemSlide,index) in swiperList" :key="index">
          <ul class="sheet-list" v-if="itemSlide.length > 0">
            <slot name="other-slide" v-if="index === 0"></slot>
            <slot name="slide-items" :item="item" v-for="item in itemSlide"></slot>
          </ul>
        </scroll>
      </div>
    </section>
  </div>
</template>
<script>
import scroll from '@/base/scroll';
import Swiper from 'Swiper';
import { mapGetters } from 'vuex';
export default {
  components: {
    scroll
  },
  props: {
    tags: {
      type: Array,
      default: function () {
        return [];
      }
    },
    swiperList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    isPullup: { // 是否开启上划
      type: Boolean,
      default: false
    },
    isPulldown: { // 是否开启下拉
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      slideSwiper: null, // 底部大的swiper
      currentTag: 0,
      slideX: true, // 代表横向滚动
      listenScroll: true // 是否监听滚动
    };
  },
  computed: {
    ...mapGetters({
      userCatIndex: 'userCatIndex'
    })
  },
  mounted () {
    this.initVideoSwiper();
  },
  watch: {
    // 监听category页面用户选中的类别
    userCatIndex (index) {
      // this.$emit('handleUserCat',index);
      this.changeTags(this.tags[index], index);
    }
  },
  methods: {
    initVideoSwiper () {
      const self = this;
      this.slideSwiper = new Swiper('.slide-swipe-container', {
        observer: true,
        observeParents: true,
        resistanceRatio: 0, // 让slide在边缘不能被拖动
        on: {
          slideChangeTransitionEnd: function () {
            self.changeTags(self.tags[this.activeIndex], this.activeIndex);
          },
          init: function () {
          }
        }
      });
    },
    changeTags (item, index, e) {
      console.log(e);
      const tagLeft = this.$refs.tagItem[index].offsetLeft;
      const tagsWidth = $('.scroll-tags ul').width();
      const tagWidth = this.$refs.tagItem[index].clientWidth;
      const len = this.tags.length;
      // 前两个和后三个不动
      if (index <= 2) {
        this.$refs.tagWrapper.scrollTo(0, 0, 500);
      } else if (index >= len - 4) {
        this.$refs.tagWrapper.scrollTo(-tagsWidth + window.innerWidth, 0, 500);
      } else {
        // 总体偏移减去一半的window宽度
        this.$refs.tagWrapper.scrollTo(-(tagLeft + tagWidth / 2 - (window.innerWidth / 2)), 0, 500);
      }
      this.currentTag = index;
      // 点击tag，进行slide切换
      this.slideSwiper.slideTo(index, 500, false);
      // 请求数据
      this.$emit('searchSlideList', { isDown: true, current: this.currentTag });
    },
    pullScroll (obj) {
      const { isDown } = obj;
      this.$nextTick(() => {
        if (isDown) {
          this.$refs.pullrefresh[this.currentTag].finish('PullDown');
        } else {
          this.$refs.pullrefresh[this.currentTag].finish('PullUp');
        }
        // 请求数据之后可以滑动
        $('.slide-swipe-container').removeClass('swiper-no-swiping');
        this.$refs.pullrefresh[this.currentTag].refreshScroll();
      });
    },
    pullDownHandle () {
      // 这个地方以后会用swiper做，切换完之后直接自动下拉刷新
      if (this.isPulldown) {
        // 请求数据的时候不让滑动
        $('.slide-swipe-container').addClass('swiper-no-swiping');
        setTimeout(() => {
          this.$refs.pullrefresh[this.currentTag].finish('PullDown');
          // 请求数据
          this.$emit('searchSlideList', { isDown: true, current: this.currentTag, isPull: true });
        }, 1000);
      }
    },
    pullUpHandle () {
      if (this.isPullup) {
        $('.slide-swipe-container').addClass('swiper-no-swiping');
        setTimeout(() => {
          this.$refs.pullrefresh[this.currentTag].finish('PullUp');
          // 请求数据
          this.$emit('searchSlideList', { isDown: false, current: this.currentTag, isPull: true });
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss">
#scroll-swipe {
  height: 100%;
  .scroll-tags {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    ul {
      white-space: nowrap; //元素不换行
      width: fit-content;
      & > li {
        font-size: 17px;
        font-weight: 430;
        display: inline-block;
        color: black;
        padding: 10px 8px;
        &.active {
          color: #ff3a3b;
          border-bottom: 2px solid #e63432;
        }
      }
    }
  }
  .slide-swipe-container {
    width: 100%;
    height: calc(100% - 40px);
    .scroll-list {
      ul.sheet-list {
        width: fit-content;
        padding: 5px 0;
        overflow-y: hidden;
      }
    }
  }
}
</style>
