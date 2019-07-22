<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="bg"></div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
  // import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'app',
    components: {
      // HelloWorld
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
  }

  .bg {
    width: 50px;
    height: 50px;
    background-color: $color;
  }
</style>