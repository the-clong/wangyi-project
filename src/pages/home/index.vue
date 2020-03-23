<template>
  <div id="home">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  components: {

  },
  data () {
    return {

    };
  }
};
</script>
<style lang="scss">
#home {
  position: relative;
  padding-top: 60px;
  top: 0;
  bottom: 65px;
  width: 100%;
  height: calc(100% - 65px);
  overflow-y: auto;
}
</style>
