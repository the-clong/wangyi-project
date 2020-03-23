<template>
  <div id="videolist">
    <Header />
    <scroll :data="videoTags" :scrollX="videoX" class="scroll-tags">
      <ul v-if="videoTags.length > 0">
        <li v-for="(item,index) in videoTags" :key="index" @click="changeTags(item,index)" :class="{'active':currentTag === index}">
          {{item.name}}
        </li>
      </ul>
    </scroll>
    <scroll :refreshTime="refreshTime" ref="pullrefresh" class="scroll-list" :listenScroll="listenScroll" :pullup="isPullup" :pulldown="isPulldown" @onPullUp="pullUpHandle" @onPullDown="pullDownHandle" :data="videoList">
      <ul v-if="videoList.length > 0">
        <li v-for="(item,index) in videoList" :key="index">
          <section class="video-item" v-if="item.creator">
            <div class="image">
              <div class="video-group">
                {{item.videoGroupName}}
              </div>
              <div class="play-num">
                <svg class="svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang"></use>
                </svg>
                {{item.playCount}}万
              </div>
              <img v-lazy="item.videoImage" width="100%" height="210" />
              <div class="duration">
                <svg class="svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-paihangbang"></use>
                </svg>
                {{item.playDuration}}
              </div>
            </div>
            <div class="title">{{item.title}}</div>
            <section class="video-handle">
              <div class="video-creator">
                <div class="creator-avater">
                  <img v-lazy="item.creator.avatarUrl" width="100%" height="100%" />
                </div>
                <div class="creator-name">
                  {{item.creator.nickname}}
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
      </ul>
    </scroll>
  </div>
</template>
<script>
import _ from 'lodash';
import Video from '@/common/js/video';
import Header from '@/components/common/header';
import * as videoApi from '@/api/video';
import scroll from '@/base/scroll';
import { randomBySum } from '@/common/js/util';
export default {
  components: {
    scroll, Header
  },
  data () {
    return {
      videoTags: [],
      videoX: true,
      currentTag: 0,
      currentItem: {},
      isVideoInit: false,
      listenScroll: true,
      isPullup: true,
      isPulldown: true,
      refreshTime: '',
      videoList: []
    };
  },
  created () {
    this.initTopTagsList();
  },
  mounted () {
  },
  methods: {
    async initTopTagsList () {
      const res = await videoApi.searchVideoGroupList();
      // 随机挑选出16个元素
      this.videoTags = _.map(randomBySum(16, res.data.length), item => {
        return res.data[item];
      });
      this.currentItem = this.videoTags[0];
      this.searchVideoList(true);
    },
    async searchVideoList (isTag) {
      const self = this;
      const res = await videoApi.searchVideoItem(this.currentItem.id);
      const datas = _.map(res.datas, item => {
        return new Video({
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
      if (isTag) {
        this.videoList = datas;
        this.$refs.pullrefresh.finish('PullDown');
      } else {
        this.videoList = [...this.videoList, ...datas];
        this.$refs.pullrefresh.finish('PullUp');
      }
      this.$refs.pullrefresh.refreshScroll();
    },
    changeTags (item, index) {
      this.currentTag = index;
      this.currentItem = item;
    },
    pullDownHandle (val) {
      // 这个地方以后会用swiper做，切换完之后直接自动下拉刷新
      setTimeout(() => {
        this.$refs.pullrefresh.finish('PullDown');
        this.searchVideoList(true);
      }, 1000);
    },
    pullUpHandle () {
      setTimeout(() => {
        this.$refs.pullrefresh.finish('PullUp');
        this.searchVideoList(false);
      }, 1000);
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
  .scroll-list {
    position: relative;
    overflow-y: hidden;
    width: 100%;
    height: calc(100% - 40px);
    ul > li {
      background-color: #f8f8f8;
      padding-bottom: 8px;
      & > .video-item {
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
}
</style>
