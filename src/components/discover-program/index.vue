<template>
  <scroll id="discover-program" :isListInit="jdProgramList.length > 0" :scrollX="scrollX" :scrollY="scrollY">
    <ul>
      <li v-for="(item,index) in jdProgramList" :key="index">
        <div class="img-container">
          <img :src="item.picUrl" style="width: 100%;height: 100%;" />
          <div class="play-icon">
            <svg class="svg-icon" aria-hidden="true">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
          </div>
        </div>
        <div class="item-title ellipsis">{{item.program.name}}</div>
        <div class="item-text">{{item.program.radio.desc}}</div>
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
    jdProgramList: { // 歌单列表
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data () {
    return {
      scrollX: true,
      scrollY: false
    };
  }
};
</script>
  <style lang="scss">
@import '~@/common/css/mixin';
#discover-program {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  ul {
    width: fit-content;
    padding: 5px 0;
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
        .play-icon {
          position: absolute;
          bottom: 5px;
          right: 5px;
          color: #ff594b;
          font-size: 14px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: rgba(193, 192, 197, 0.6);
        }
      }
      .item-title {
        font-size: 15px;
        text-align: left;
        padding: 6px 0;
        color: #333334;
      }
      .item-text {
        overflow: hidden;
        height: 40px;
        font-size: 13px;
        line-height: 20px;
        text-align: left;
        /* padding: 3px 0; */
        white-space: normal;
        color: #999;
      }
    }
  }
}
</style>
