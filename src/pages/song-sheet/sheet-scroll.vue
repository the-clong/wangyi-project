<template>
  <div id="song-sheets-item">
    <two-header :title="pageParam.cat"></two-header>
    <scroll ref="pullrefresh" class="scroll-list" :listenScroll="listenScroll" :pullup="isPullup" @onPullUp="pullUpHandle" :data="playListItems">
      <ul class="sheet-list" v-if="playListItems.length > 0">
        <img-item :playItem="item" :showPlayNum="showPlayNum" v-for="item in playListItems" :key="item.id"></img-item>
      </ul>
    </scroll>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Song from '@/common/js/song';
import twoHeader from '@/components/common/twoHeader';
import scroll from '@/base/scroll';
import * as discover from '@/api/discover';
import imgItem from '@/base/img-item';
export default {
  components: {
    scroll, twoHeader, imgItem
  },
  data () {
    return {
      showPlayNum: true,
      listenScroll: true,
      isPullup: true,
      isPulldown: false,
      playListItems: [],
      pageParam: {
        offset: 0,
        limit: 18,
        cat: ''
      }
    };
  },
  mounted () {
    // 判断是从类别页面跳转还是用户直接进行刷新的
    if (this.sheetCatList.length > 0) {
      this.pageParam.cat = this.$route.params.id;
      this.initSheetsItem();
    } else {
      this.$router.go(-2);
    }
  },
  computed: {
    ...mapGetters({
      sheetCatList: 'sheetCatList'
    })
  },
  methods: {
    async initSheetsItem () {
      const res = await discover.searchSongSheetsList(this.pageParam);
      const data = res.playlists.map(item => new Song({
        id: item.id,
        name: item.name,
        picUrl: item.coverImgUrl,
        playCount: item.playCount
      }));
      this.playListItems = this.playListItems.length > 0 ? [...this.playListItems, ...data] : data;
      this.pageParam.offset = this.pageParam.offset + this.pageParam.limit;
    },
    pullUpHandle () {
      if (this.isPullup) {
        setTimeout(() => {
          this.$refs.pullrefresh.finish('PullUp');
          // 请求数据
          this.initSheetsItem();
        }, 1000);
      }
    }
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#song-sheets-item {
  background-color: #fff;
  @include posSite(100%, 30,absolute, 0, 0);
  padding-top: 65px;
  .scroll-list {
    position: relative;
    overflow-y: hidden;
    height: 100%;
  }
}
</style>
