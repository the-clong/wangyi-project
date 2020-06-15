<template>
  <div id="discover-item">
    <div class="item-title">
      <div class="first-level">
        {{levelTitle}}
      </div>
      <div class="title-bottom">
        <div class="sub-title">
          {{subTitle}}
        </div>
        <div class="title-btn">
          {{btnText}}
        </div>
      </div>
    </div>
    <!--将songsList传递给孙子组件-->
    <discover-scroll v-bind="$attrs" v-if="itemType === 'scroll'"></discover-scroll>
    <discover-slide v-bind="$attrs" v-if="itemType === 'slide'"></discover-slide>
    <discover-program v-bind="$attrs" v-if="itemType === 'program'"></discover-program>
    <discover-rank v-bind="$attrs" v-if="itemType === 'rank'"></discover-rank>
  </div>
</template>
<script type="text/ecmascript">
import discoverScroll from '../discover-scroll';
import discoverSlide from '../discover-slide';
import discoverProgram from '../discover-program';
import discoverRank from '../discover-rank';
export default {
  components: {
    discoverScroll, discoverSlide, discoverProgram, discoverRank
  },
  props: {
    itemType: { // 代表discoverItem是slide还是scroll
      type: String,
      default: 'scroll'
    },
    btnText: {// 右上角按钮
      type: String,
      default: '查看更多'
    },
    isShowIcon: { // 标题旁边的小图标
      type: Boolean,
      default: false
    },
    levelTitle: String, // 标题
    subTitle: String, // 二级标题
    iconBtn: String // 标题旁边的小图标
  },
  data () {
    return {

    };
  },
  mounted () {

  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#discover-item {
  margin-top: 25px;
  & > .item-title {
    padding: 5px 10px;
    .first-level {
      color: #b2b2b2;
      font-size: 1.1rem;
    }
    > .title-bottom {
      padding-top: 10px;
      overflow: hidden;
      .sub-title {
        float: left;
        font-weight: 500;
        font-size: 24px;
        margin-top: 5px;
      }
      & > .title-btn {
        float: right;
        border-radius: 40px;
        border: 1px solid #e6e6e6;
        @include lh(95px,28px);
        width: 6rem;
      }
    }
  }
}
</style>
