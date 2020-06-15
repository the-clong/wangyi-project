<template>
  <scroll id="discover-scroll" :isListInit="songsList.length > 0" :scrollX="scrollX" :scrollY="scrollY">
    <ul>
      <img-item v-for="item in songsList" :key="item.id" :playItem="item" :showPlayNum="showPlayNum"></img-item>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript">
import scroll from '@/base/scroll';
import imgItem from '@/base/img-item';
export default {
  components: {
    scroll, imgItem
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
  }
}
</style>
