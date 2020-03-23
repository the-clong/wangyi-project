<template>
  <scroll id="discover-scroll" :isListInit="songsList.length > 0" :scrollX="scrollX" :scrollY="scrollY">
    <ul>
      <li v-for="(item,index) in songsList" :key="index">
        <div class="img-container">
          <img :src="item.picUrl" style="width: 100%;height: 100%;" />
          <div class="play-num" v-show="showPlayNum">
            <svg class="svg-icon" aria-hidden="true">
              <use :xlink:href="'#icon-bofang'"></use>
            </svg>
            {{item.playCount}}万</div>
        </div>
        <div class="item-text">{{item.name}}</div>
      </li>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript">
import scroll from '@/base/scroll';
export default {
  components: {
    scroll
  },
  props: {
    songsList: { // 歌单列表
      type: Array,
      default: function () {
        return [];
      }
    },
    showPlayNum: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollX: true,
      scrollY: false
    };
  },
  mounted () {

  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#discover-scroll {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  ul {
    width: fit-content;
    padding: 5px 0;
    /* overflow-x: auto; */
    overflow-y: hidden;
    white-space: nowrap; //元素不换行
    & > li {
      width: 110px;
      display: inline-block;
      margin-left: 10px;
      vertical-align: top;
      .img-container {
        border-radius: 6px;
        @include wh(100%, 110px);
        position: relative;
        overflow: hidden;
        .play-num {
          position: absolute;
          top: 3px;
          right: 8px;
          color: #fff;
          font-size: 14px;
          font-weight: 450;
          text-shadow: 2px 2px 2px #696969;
        }
      }
      .item-text {
        overflow: hidden;
        height: 40px;
        font-size: 15px;
        line-height: 20px;
        text-align: left;
        padding: 3px 0;
        white-space: normal;
        color: #333334;
      }
      &:last-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
