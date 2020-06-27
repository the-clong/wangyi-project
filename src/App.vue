<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer v-if="$route.path !== '/login' && $route.path !== '/phoneLogin'" />
    <Player v-if="$route.path !== '/login' && $route.path !== '/phoneLogin'"></Player>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import Footer from '@/components/common/footer';
import Player from '@/components/common/player';
import * as userApi from '@/api/user';
import * as searchApi from '@/api/search';
import Song from '@/common/js/song';
export default {
  name: 'app',
  components: {
    Footer, Player
  },
  data () {
    return {
      songs: []
    };
  },
  created () {

  },
  watch: {
    $route (to, from) {
      // 不是登录页面并且当前用户播放列表为空进行请求
      if (to.path !== '/phoneLogin' && to.path !== '/login' && this.songs.length === 0) {
        this.getLoginUserInfo();
      }
    }
  },
  mounted () {
    console.log(document.cookie);
  },
  methods: {
    // 登录显示播放器，未登录显示登录按钮
    async getLoginUserInfo () {
      const statusRes = await userApi.getLoginStatusAction();
      const accountInfo = JSON.parse(localStorage.getItem('accountInfo')) || {};
      if (statusRes.code === 200 && accountInfo.id === statusRes.profile.userId) {
        this.searchUserPlayList(accountInfo.id);
      } else {
        this.isLogin = true;
      }
    },
    // 获取用户播放列表
    async searchUserPlayList (uid) {
      const userPlayRes = await searchApi.searchUserRecordAction({ uid, type: 1 });
      if (userPlayRes.code === 200) {
        this.songs = _.map(userPlayRes.weekData, (item) => {
          const song = item.song;
          return new Song({
            name: song.name,
            artist: _.map(song.ar, 'name').slice(0, 3).join('/'),
            id: song.id,
            picUrl: song.al.picUrl
          });
        });
        this.setPlayList(this.songs);
        this.setCurrentIndex(0);
      }
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }
};
</script>

<style lang="scss">
@import '@/common/css/index.scss';
@import '@/common/css/mixin.scss';
#app {
  overflow-y: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  @include posSite(100%);
  background-color: #fff;
  > .preview-container {
    margin-top: 65px;
    margin-bottom: 65px;
    width: 100%;
    height: calc(100% - 130px);
  }
}
</style>
