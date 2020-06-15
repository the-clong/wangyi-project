<template>
  <div id="header-title">
    <section class="icon-contain">
      <svg class="svg-icon" aria-hidden="true">
        <use xlink:href="#icon-yuyin"></use>
      </svg>
    </section>
    <section class="header-search">
      <input :placeholder="placeholder" @compositionstart="startChinese" @compositionupdate="updateChinese" @compositionend="endChinese" />
    </section>
    <section class="header-img">
      <a href="/login" v-if="isNeedLogin">登录</a>
    </section>
  </div>
</template>
<script>
import * as searchApi from '@/api/search';
import * as userApi from '@/api/user';
import { mapMutations } from 'vuex';
import Song from '@/common/js/song';
export default {
  data () {
    return {
      placeholder: '',
      isNeedLogin: false,
      songs: []
    };
  },
  created () {
    console.log(aaa); // 如果此时访问a报错 a is not defined
    const aaa = 1;
    this.getLoginUserInfo();
    this.searchDefault();
  },
  methods: {
    startChinese (e) {
      console.log('start-----');
    },
    updateChinese (e) {
      console.log('update-------');
    },
    endChinese (e) {
      console.log('end-----');
    },
    // 登录显示播放器，未登录显示登录按钮
    async getLoginUserInfo () {
      const statusRes = await userApi.getLoginStatusAction();
      const accountInfo = JSON.parse(sessionStorage.getItem('accountInfo')) || {};
      if (statusRes.code === 200 && accountInfo.id === statusRes.profile.userId) {
        this.searchUserPlayList(accountInfo.id);
      } else {
        this.isLogin = true;
      }
    },
    // 获取用户播放列表
    async searchUserPlayList (uid) {
      const userPlayRes = await searchApi.searchUserRecordAction({ uid, type: 1 });
      console.log(userPlayRes);
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
    // 查询默认搜索关键字
    async searchDefault () {
      const defaultRes = await searchApi.searchDefaultAction();
      if (defaultRes.code === 200) {
        this.placeholder = defaultRes.data.showKeyword;
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
@import "~@/common/css/mixin";
#header-title {
  position: fixed;
  top: 0;
  width: 100%;
  @include flexBetween();
  height: 60px;
  padding: 0 5px;
  z-index: 10;
  .icon-contain {
    padding: 0 13px;
    font-size: 20px;
  }
  .header-search {
    flex: 1;
    & > input {
      text-align: center;
      padding-left: 10px;
      @include wh(100%, 35px);
      border-radius: 35px;
      outline-style: none;
      border: 0px;
      background-color: #f7f7f7;
    }
  }
  .header-img {
    vertical-align: middle;
    padding: 0 12px;
    min-width: 56px;
    & > a {
      font-size: 16px;
      color: #666;
    }
  }
}
</style>
