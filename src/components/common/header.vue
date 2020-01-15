<template>
  <div id="header-title">
    <section class="icon-contain">
      <svg class="svg-icon" aria-hidden="true">
        <use xlink:href="#icon-zhanghao"></use>
      </svg>
    </section>
    <section class="header-search">
      <input placeholder="请输入" />
    </section>
    <section class="header-img">
      <a href="">登录</a>
      <!-- <img src="http://p4.music.126.net/RLeBJe4D1ZzUtltxfoKDMg==/109951163250239066.jpg?param=30y30" /> -->
    </section>
  </div>
</template>
<script>
export default {
  created () {
    console.log('created----');
  }
}
</script>
<style lang="scss">
@import 'src/style/mixin';
#header-title {
  position: fixed;
  right: 0;
  left: 0;
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vh 1vw;
  .icon-contain {
    padding-left: 1rem;
  }
  .header-search {
    & > input {
      padding-left: 0.7rem;
      @include wh(17rem, 2.2rem);
      border-radius: 6vw;
      outline-style: none;
      border: 0px;
      background-color: #f7f7f7;
    }
  }
  .header-img {
    vertical-align: middle;
    padding-right: 13px;
    & > a {
      font-size: 30px;
      color: #666;
    }
  }
}
</style>