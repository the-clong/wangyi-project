<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer v-if="$route.path !== '/login' && $route.path !== '/phoneLogin'"/>
    <Player></Player>
  </div>
</template>
<script>
import Footer from '@/components/common/footer';
import Player from '@/components/common/player';
export default {
  name: 'app',
  components: {
    Footer, Player
  },
  data () {
    return {
      a: 1,
      test: ''
    };
  },
  created () {
  },
  mounted () {
    console.log(document.cookie);
  },
  methods: {

  }
};
</script>

<style lang="scss">
@import "@/common/css/index.scss";
@import "@/common/css/mixin.scss";
#app {
  overflow-y: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
