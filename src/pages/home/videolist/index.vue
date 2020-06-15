<template>
  <div id="videolist" class="preview-container">
    <Header />
    <swipe-slide :tags="videoTags" :swiperList="videoSwiperList" :isPullup="isPullup" :isPulldown="isPulldown" @searchSlideList="searchVideoList" ref="swipeSlide">
      <li slot-scope="props" slot="slide-items">
        <section class="video-item" v-if="props.item.creator">
          <div class="image">
            <div class="video-group">
              {{props.item.videoGroupName}}
            </div>
            <div class="play-num">
              <svg class="svg-icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              {{props.item.playCount}}万
            </div>
            <img v-lazy="props.item.videoImage" width="100%" height="210" />
            <div class="duration">
              <svg class="svg-icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
              </svg>
              {{props.item.playDuration}}
            </div>
          </div>
          <div class="title">{{props.item.title}}</div>
          <section class="video-handle">
            <div class="video-creator">
              <div class="creator-avater">
                <img v-lazy="props.item.creator.avatarUrl" width="100%" height="100%" />
              </div>
              <div class="creator-name">
                {{props.item.creator.nickname}}
              </div>
            </div>
            <div class="user-handle">
              <svg class="svg-icon" aria-hidden="true">
                <use xlink:href="#icon-zanpress"></use>
              </svg>
            </div>
            <div class="user-handle">
              <svg class="svg-icon" aria-hidden="true">
                <use xlink:href="#icon-pinglun"></use>
              </svg>
            </div>
          </section>
        </section>
      </li>
    </swipe-slide>
  </div>
</template>
<script>
import _ from 'lodash';
import Video from '@/common/js/video';
import Header from '@/components/common/header';
import * as videoApi from '@/api/video';
import swipeSlide from '@/components/swipe-slide';
import { randomBySum } from '@/common/js/util';
export default {
  components: {
    Header, swipeSlide
  },
  data () {
    return {
      limit: 18, 
      videoTags: [],
      videoX: true,
      currentTag: 0,
      videoTagsInit: false,
      currentItem: {},
      videoSwiper: null,
      isPullup: true,
      isPulldown: true,
      videoSwiperList: [] // 下面总的container
    };
  },
  created () {
    this.initTopTagsList();
  },
  methods: {
    async initTopTagsList () {
      const res = await videoApi.searchVideoGroupList();
      // 随机挑选出16个元素
      this.videoTags = _.map(randomBySum(16, res.data.length), item => {
        const temp = res.data[item];
        temp.offset = 0;
        return temp;
      });
      const len = this.videoTags.length;
      this.videoSwiperList = Array.from({ length: len }, item => []);
      this.searchVideoList({ isDown: true, current: 0 });
    },
    async searchVideoList (obj) {
      const self = this;
      const tags = this.videoTags;
      const { current, isDown, isPull } = obj;
      const pageParam = {
        offset: this.videoTags[current].offset,
        limit: this.limit
      };
      const res = await videoApi.searchVideoItem(tags[current].id);
      // 一开始渲染slide的scroll或者用户滑动进行加载数据，不然就用原始的数据
      if (pageParam.offset === 0 || isPull) {
        const datas = _.map(res.datas, item => {
          return new Video({
            id: item.data.vid,
            title: item.data.title,
            videoImage: item.data.coverUrl,
            commentCount: item.data.commentCount,
            shareCount: item.data.shareCount,
            creator: item.data.creator,
            videoGroup: item.data.videoGroup,
            playCount: self.countCheck(item.data.playTime),
            playDuration: self.formatTime(item.data.durationms)
          });
        });
        if (isDown) {
          this.$set(this.videoSwiperList, current, datas);
        } else {
          const currentSwiperList = this.videoSwiperList[current];
          currentSwiperList.splice(pageParam.offset, 0, ...datas);
          this.$set(this.videoSwiperList, current, currentSwiperList);
        }
        this.videoTags[current].offset += this.limit;
        this.$refs.swipeSlide.pullScroll({ isDown });
      }
    },
    countCheck (count) {
      return Math.round(count / 10000);
    },
    formatTime (time) {
      const num = time / 1000;
      let minute = num / 60 | 0;
      let second = (num % 60) | 0;
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    }
  }
};
</script>
<style lang="scss">
#videolist {
  ul > li {
    background-color: #f8f8f8;
    padding-bottom: 8px;
    .video-item {
      background-color: #fff;
      padding: 8px 10px;
      > .image {
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        & > .video-group {
          position: absolute;
          right: 5px;
          top: 5px;
          padding: 0 10px;
          height: 25px;
          color: #fff;
          font-size: 13px;
          text-align: center;
          line-height: 25px;
          font-weight: 450;
          border-radius: 12px;
          border: 1px solid #fff;
        }
        & > .play-num {
          position: absolute;
          left: 7px;
          bottom: 7px;
          color: #fff;
          font-size: 14px;
        }
        & > .duration {
          position: absolute;
          right: 7px;
          bottom: 7px;
          color: #fff;
          font-size: 14px;
        }
      }
      > .title {
        padding: 8px 0;
        font-weight: 450;
        font-size: 20px;
        line-height: 30px;
      }
      & > .video-handle {
        border-top: 1px solid #eaeaea;
        display: flex;
        align-items: center;
        padding: 8px 0;
        & > .video-creator {
          flex: 1;
          > .creator-avater {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            display: inline-block;
            vertical-align: middle;
          }
          > .creator-name {
            display: inline-block;
            vertical-align: middle;
          }
        }
        & > .user-handle {
          font-size: 22px;
          width: 50px;
          padding: 10px 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
