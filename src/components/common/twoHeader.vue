<template>
  <header id="two-header">
      <div class="back" @click="goBack">
        <svg class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="title">
        <h2>{{title}}</h2>
      </div>
  </header>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
  }
}
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#two-header {
    z-index: 13;
    background: #fff;
    width: 100%;
    display: flex;
    align-items: center;
    @include posSite(60px,0,fixed,0,0,0);
    > .back {
      padding: 5px;
      font-size: 28px;
    }
    > .title {
      flex: 1;
      text-align: center;
      h2 {
        font-weight: 550;
        font-size: 26px;
      }
    }
  }
</style>