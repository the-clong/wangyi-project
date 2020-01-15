<template>
  <div id="home">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
export default {
  components: {
    Footer, Header
  },
  data () {
    return {

    }
  }
}
</script>