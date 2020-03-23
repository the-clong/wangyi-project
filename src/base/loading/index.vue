<template>
  <div id="loading">
    <img :src="loadSrc" width="30px" height="30px" />
    <span>{{text}}</span>
    <!-- <span>{{loadingWord}}</span> -->
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    loadingWord: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadSrc: require('@/assets/image/loading.gif')
    };
  }
};
</script>
<style lang="scss">
#loading {
  width: 100%;
  text-align: center;
  padding: 5px 0;
  color: #959ba3;
  > img {
    vertical-align: middle;
  }
  > span {
    margin-left: 6px;
    vertical-align: middle;
  }
}
</style>
