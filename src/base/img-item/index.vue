<template>
  <li class="image-item">
    <div class="img-container">
      <img v-lazy="playItem.picUrl"/>
      <div class="play-num" v-show="showPlayNum">
        <svg class="svg-icon" aria-hidden="true">
          <use :xlink:href="'#icon-bofang'"></use>
        </svg>
        {{playItem.playCount}}
      </div>
    </div>
    <slot name="item-title"></slot>
    <div class="item-text">{{playItem.name}}</div>
  </li>
</template>
<script>
export default {
  props: {
    playItem: {
      type: Object,
      default: function () {
        return {};
      }
    },
    showPlayNum: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    };
  },
  created () {
    // console.log(this.playItem);
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
li.image-item {
  width: 110px;
  display: inline-block;
  margin-left: 10px;
  vertical-align: top;
  .img-container {
    border-radius: 6px;
    @include wh(100%, 110px);
    position: relative;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
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
  .item-title {
    font-size: 15px;
    text-align: left;
    padding: 6px 0;
    color: #333334;
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
</style>