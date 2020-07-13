<template>
  <div id="song-sheet" class="preview-container">
    <two-header title="歌单广场"></two-header>
    <swipe-slide :tags="userCatList" :swiperList="sheetSwiperList" :isPulldown="isPulldown" :isPullup="isPullup" @searchSlideList="initRecoSongSheet" ref="swipeSlide">
      <div class="classify" slot="classify" @click="goSheetCategory">
        <svg class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-leimu"></use>
        </svg>
      </div>
      <div class="sheet-banner swiper-container" v-show="sheetBanner.length > 0 && currentTag === 0" slot="other-slide">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in sheetBanner" :key="item.id">
            <img :src="item.picUrl" width="100%" />
            <div class="title">
              {{item.name}}
            </div>
            <div class="play-back">
              <svg class="svg-icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              {{item.playCount}}
            </div>
          </div>
          <div class="mask"></div>
        </div>
      </div>
      <img-item slot-scope="props" slot="slide-items" :playItem="props.item" :showPlayNum="showPlayNum"></img-item>
    </swipe-slide>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Swiper from 'Swiper';
import imgItem from '@/base/img-item';
import Song from '@/common/js/song';
import twoHeader from '@/components/common/twoHeader';
import * as discover from '@/api/discover';
import swipeSlide from '@/components/swipe-slide';
export default {
  components: {
    twoHeader, swipeSlide, imgItem
  },
  data () {
    return {
      jingpinLastTime: '', // 精品需要加的时间字段
      showPlayNum: true, // 是否展示playNum
      limit: 18, // 每页条数
      currentTag: -1, // 当前点击的tag
      sheetX: true,
      isPullup: true,
      isPulldown: false,
      isShowBanner: true, // progress之后展示banner
      currentIndex: -1, // banner的activeIndex
      sheetBanner: [], // 歌单的滑动banner
      catUserList: [], // 自己的类别
      sheetSwiperList: [] // 歌单列表的swiper
    };
  },
  computed: {
    ...mapGetters({
      userCatList: 'userCatList',
      sheetCatList: 'sheetCatList'
    })
  },
  watch: {
    'sheetBanner.length': function (len) {
      if (len > 0) {
        setTimeout(() => { this.initSheetSwiper(); }, 500);
      }
    }
  },
  created () {
    this.mySwiper = null;
    this.initCatAllList();
  },
  methods: {
    goSheetCategory () {
      this.$router.push({
        path: '/songSheet/category'
      });
    },
    initSheetSwiper () {
      const self = this;
      this.mySwiper = new Swiper('.sheet-banner', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        on: {
          progress (progress) {
            for (let i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              var slideProgress = this.slides[i].progress;
              const translate = slideProgress * 50 + 'px';
              const scale = 1 - Math.abs(slideProgress) / 8;
              let zIndex = 100 - Math.abs(Math.round(10 * slideProgress));
              // 修正zIndex区分两个slide滑到中间时候都在mask上方，改成一个在上一个在下
              if (zIndex === 95) {
                zIndex = slideProgress < 0 ? 94 : 96;
              }
              slide.transform('translateX(' + translate + ') scale(' + scale + ')');
              slide.css('zIndex', zIndex);
              slide.css('opacity', 1);
              if (Math.abs(slideProgress) > 1.95) {
                slide.css('opacity', 0);
              }
              // active的slide透明度是1
              if (Math.abs(slideProgress) === 0) {
                self.currentIndex = i - 3;
              }
            }
          },
          setTransition: function (transition) {
            // 解决在滑动的过程中translate太快的抖动效果
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transition(transition);
            }
          },
          init: function () {
            self.isShowBanner = true;
          }
        }
      });
    },
    async initCatAllList () {
      // 如果新加载页面用请求数据
      const res = await discover.getCategoryList();
      this.setSheetCatList(res);
      const len = this.userCatList.length;
      this.sheetSwiperList = Array.from({ length: len }, item => []);
      this.initRecoSongSheet({ isDown: true, current: 0 });
    },
    async initRecoSongSheet (obj) {
      const { isDown, current, isPull } = obj;
      const pageParam = {
        offset: this.userCatList[current].offset,
        limit: this.limit,
        cat: current === 0 ? '全部' : this.userCatList[current].name
      };
      // 一上来是全部歌单
      if (current !== this.currentTag) {
        this.currentTag = current;
      }
      // 一开始渲染slide的scroll或者用户滑动进行加载数据，不然就用原始的数据
      if (pageParam.offset === 0 || isPull) {
        let res = null;
        if (pageParam.cat !== '精品') {
          res = await discover.searchSongSheetsList(pageParam);
        } else {
          // 通过updateTime进行分页
          pageParam.before = this.jingpinLastTime || '';
          pageParam.cat = '全部';
          res = await discover.searchHighSheetsList(pageParam);
          this.jingpinLastTime = res.lasttime;
        }
        const datas = res.playlists.map(item => new Song({
          id: item.id,
          name: item.name,
          picUrl: item.coverImgUrl,
          playCount: item.playCount
        }));
        if (isDown) {
          if (current === 0 && pageParam.offset === 0) {
            this.sheetBanner = datas.slice(0, 3);
          }
          this.$set(this.sheetSwiperList, current, datas.slice(3, 21));
        } else {
          const currentSwiperList = this.sheetSwiperList[current];
          currentSwiperList.splice(pageParam.offset, 0, ...datas);
          this.$set(this.sheetSwiperList, current, currentSwiperList);
        }
        this.userCatList[current].offset += this.limit;
        this.$refs.swipeSlide.pullScroll({ isDown });
      }
    },
    ...mapActions(['setSheetCatList'])
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#song-sheet {
  height: 100%;
  #scroll-swipe {
    position: relative;
    .classify {
      position: absolute;
      right: 0;
      top: 0;
      background: #fff;
      font-size: 20px;
      padding: 7px 5px;
      z-index: 10;
      box-shadow: -15px 0 25px #fff;
    }
  }
  .sheet-banner {
    width: 375px;
    position: relative;
    padding: 15px 0;
    .swiper-wrapper {
      .mask {
        position: absolute;
        z-index: 94;
        width: 320%;
        left: 0;
        top: 0;
        height: 100%;
        background: #fff;
        opacity: 0.6;
        filter: alpha(opacity=60);
      }
      .swiper-slide {
        border-radius: 10px;
        position: relative;
        width: 156px;
        height: 200px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 0 15px #999;
        > .title {
          line-height: 19px;
          padding: 3px 5px;
        }
        .play-back {
          position: absolute;
          right: 2px;
          top: 0;
          color: #fff;
          padding: 3px;
          font-size: 13px;
          > svg {
            font-size: 12px;
          }
        }
      }
    }
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.4s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(100%);
  }
}
</style>
