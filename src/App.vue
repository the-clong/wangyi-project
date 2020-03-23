<template>
  <div id="app">
    <router-view />
    <Footer v-if="$route.path.indexOf('/home') > -1" />
    <Player></Player>
    <!-- shell -->
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
      a: 1
    };
  },
  created () {
    // function makeSetInterval (start) {
    //   if (start) {
    //     setTimeout(() => {
    //       console.log(new Date());
    //       console.log('外层setTime----');
    //       setTimeout(() => {
    //         console.log(new Date());
    //         console.log('里层setTime----');
    //       }, 10000);
    //       makeSetInterval(start);
    //     }, 1000);
    //   } else {
    //     console.log('停止运行');
    //   }
    // }
    // makeSetInterval(true);
    // this.test();

  },
  methods: {
  }
};
</script>

<style lang="scss">
@import '@/common/css/index.scss';

#app {
  position: absolute;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
