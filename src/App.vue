<template>
  <div>
      <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
  import Footer from './components/common/footer'
  export default {
    name: 'app',
    components: {
      Footer
    },
    created() {
      this.test();
    },
    methods: {
      async test() {
        var aaa = await this.$http.get('/simi/playlist?id=347230&timestamp=1503019930000');
        var playlists = aaa.playlists;
        console.log(playlists);
        _.map(playlists,(item,index) => {
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
    margin-top: 60px;
    background-color: #fff;
  }
</style>