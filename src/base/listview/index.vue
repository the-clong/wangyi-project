<template>
  <scroll id="list-view" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scrollView" :data="listData">
    <ul class="address-list" v-if="listData.length > 0">
      <li class="list-group" v-for="(item,index) in listData" :key="index" ref="listGroup">
        <h2>{{item.title}}</h2>
        <ul class="singer-list">
          <li class="singer-item" v-for="(singer,index1) in item.items" :key="index1" @click="selectSinger(singer)">
            <img v-lazy="singer.avater" />
            <div class="singer-name">{{singer.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="address-slide" @touchmove.stop.prevent="onSlideMove" @touchstart="onSlideStart">
      <ul>
        <li v-for="(item,index) in caculateSlideList" :key="index" :class="{'active': index === activeIndex}" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="fixed-title" ref="fixedTitle" v-show="isShowFixed">{{fixedTitle}}</div>
  </scroll>
</template>
<script type="text/ecmascript">
import $ from 'jquery';
import scroll from '@/base/scroll';
const headHeight = 25;
const showcutHeight = 20;
export default {
  components: {
    scroll
  },
  props: {
    listData: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
      listenScroll: true, // 是否监听滚动事件
      probeType: 3, // BSScroll监听滚动事件时机
      slideList: [],
      activeIndex: 0,
      fixedTitle: '',
      diff: -1, // 当前Item与顶部的距离
      isShowFixed: false // 是否展示fixedTitle
    };
  },
  created () {
    this.touch = {
      y1: 0,
      y2: 0,
      touchIndex: 0
    };
    this.posArray = []; // 记录每个歌手group的posy
  },
  watch: {
    listData: function (listData) {
      // 加载完数据之后，处理每个list-group的高度
      setTimeout(() => {
        this.caculatePos(listData);
      }, 30);
    },
    diff: function (diff) {
      if (diff < headHeight) {
        this.$refs.fixedTitle.style.transform = `translate3d(0,${diff - headHeight}px,0)`;
      } else {
        this.$refs.fixedTitle.style.transform = 'translate3d(0,0,0)';
      }
    }
  },
  computed: {
    caculateSlideList () {
      return this.listData.map((item, index) => {
        return item.title.substr(0, 1);
      });
    }
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(this.$refs.listGroup);
    });
  },
  methods: {
    selectSinger (singer) {
      this.$emit('select', singer);
    },
    caculatePos (listData) {
      const listGroup = this.$refs.listGroup;
      let height = 0;
      listGroup.map((item, index) => {
        height += item.clientHeight;
        this.posArray.push(height);
      });
      this.fixedTitle = this.listData[0].title;
    },
    scrollView (pos) {
      const y = pos.y;
      const activeIndex = this.posArray.findIndex((item, index) => {
        if (y <= 0) {
          this.isShowFixed = true;
          this.diff = item + y;
        } else {
          this.isShowFixed = false;
        }
        return index === 0 ? item > -y && -y >= 0 : item > -y && this.posArray[index - 1] <= -y;
      });
      this.activeIndex = Math.max(activeIndex, 0);
      this.fixedTitle = this.listData[this.activeIndex].title;
    },
    onSlideStart (e) {
      this.touch.touchIndex = parseInt($(e.target).attr('data-index'));
      this.touch.y1 = e.touches[0].pageY;
      this.scrollToBar(this.touch.touchIndex);
    },
    onSlideMove (e) {
      this.touch.y2 = e.touches[0].pageY;
      const delta = (this.touch.y2 - this.touch.y1) / showcutHeight | 0;// 相当于Math.floor
      const touchIndex = delta + this.touch.touchIndex;
      this.scrollToBar(touchIndex);
    },
    scrollToBar (index) {
      // 上边界
      if (index < 0) {
        index = 0;
      }
      // 下边界
      if (index > this.$refs.listGroup.length - 1) {
        index = this.$refs.listGroup.length - 1;
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    }
  }
};
</script>
<style lang="scss">
#list-view {
  position: relative;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  ul.address-list {
    > li.list-group {
      > h2 {
        color: #fff;
        background: #d44439;
        padding: 4.5px 10px;
        font-size: 16px;
      }
      .singer-list {
        & > .singer-item {
          padding: 8px;
          border-bottom: 1px solid #eaeaea;
          > img,
          .singer-name {
            vertical-align: middle;
          }
          > img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
          }
          > .singer-name {
            display: inline-block;
          }
        }
      }
    }
  }
  .address-slide {
    z-index: 10;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    & > ul > li {
      color: #696969;
      font-size: 14px;
      padding: 3px 8px;
      font-weight: 500;
      text-align: center;
      &.active {
        color: #d44439;
      }
    }
  }
  .fixed-title {
    position: absolute;
    width: 100%;
    top: 0;
    height: 25px;
    padding-left: 10px;
    line-height: 25px;
    background: #d44439;
    color: #fff;
  }
}
</style>
