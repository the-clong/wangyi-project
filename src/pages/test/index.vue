<!--下拉框父组件-->
<template>
  <div class="infinity-sroll-container" style="height: 100%;">
    <div>
      <div data-site="start" ref="start" id="firstItemId"></div>
      <div class="item" v-for="(n, i) in showList" :key="i" :style="{backgroundColor: colors[n % 10]}">
        {{n}}
      </div>
      <div class="end" data-site="end" ref="end" id="lastItemId"></div>
    </div>
  </div>
</template>
<script>
import ListScroll from '@/common/js/test';
export default {
  data () {
    return {
      showList: [],
      showStart: 10,
      colors: [
        '#CCCC33',
        '#CCCCCC',
        '#FFFFCC',
        '#0099FF',
        '#33CC99',
        '#FFFFFF',
        '#ff9900',
        '#99CC33',
        '#99CCFF',
        '#CC9999'
      ]
    };
  },
  created () {
    this.showList = Array.from({ length: 10 }, (item, index) => index);
  },
  watch: {
    // 'showStart': function (val) {
    //   this.showList = Array.from({ length: 10 }, (item, index) => val + index);
    // }
  },
  mounted () {
    const self = this;
    const ccc = new ListScroll({
      firstItemId: 'firstItemId',
      lastItemId: 'lastItemId',
      itemHeight: 200,
      container: document.getElementsByClassName('infinity-sroll-container')[0],
      listSize: this.showList.length,
      renderFunction: function (firstIndex) {
        console.log(firstIndex);
        for (let i = 0; i < 10; i++) {
          self.showList[i] = i + self.showStart;
        }
        // if (self.showList.length > 30) {
        //   self.showList.splice(0, 10);
        // }
        self.showStart += 10;
      }
    });
    console.log(ccc);
    ccc.startObserver();
    // const io = new IntersectionObserver((entries) => {
    //   console.log('in-----');
    //   if (entries[0] && entries[0].isIntersecting) {
    //     if (entries[0].target.dataset.site === 'end') {
    //       this.showStart += 10;
    //     } else {
    //       this.showStart = (this.showStart - 10 <= 1) ? 1 : (this.showStart - 10);
    //     }
    //   }
    // }, {
    //   threshold: [0,0.1,0.5]
    // });
    // io.observe(this.$refs.start);
    // io.observe(this.$refs.end);
  }
};
</script>
<style lang="scss">
.infinity-sroll-container {
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    font-weight: bold;
  }
  .end {
    position: relative;
    top: -400px;
  }
}
</style>
