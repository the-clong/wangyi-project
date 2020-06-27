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
export default {
  data () {
    return {
      placeholder: '',
      isNeedLogin: false,
      songs: []
    };
  },
  created () {
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
    // 查询默认搜索关键字
    async searchDefault () {
      const defaultRes = await searchApi.searchDefaultAction();
      if (defaultRes.code === 200) {
        this.placeholder = defaultRes.data.showKeyword;
      }
    }
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
