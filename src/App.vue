<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {
  },
  created () {
    this.test();
  },
  methods: {
    async test () {
      let aaa = await this.$http.fetch('/simi/playlist', { id: '347230', timestamp: 1503019930000 }, 'GET');
      let playlists = aaa.playlists;
      _.map(playlists, (item, index) => {
        console.log(item);
        console.log(index);
      });
    }
  }
}
</script>

<style lang="scss">
@import './style/common';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>