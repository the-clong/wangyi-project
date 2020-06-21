<template>
  <div id="login-header">
    <div class="go-back">
      <svg class="svg-icon" aria-hidden="true">
        <use xlink:href="#icon-zhanghao"></use>
      </svg>
    </div>
    <header>手机号登录</header>
  </div>
</template>
<script>

</script>
<style lang="scss">
@import '~@/common/css/mixin';
#login-header {
  display: flex;
  padding: 10px;
  font-size: 1.6rem;
  font-weight: 500;
  > .go-back {
    width: 2rem;
    height: 2rem;
  }
  > header {
    text-align: center;
    width: calc(100% - 2rem);
  }
}
</style>
