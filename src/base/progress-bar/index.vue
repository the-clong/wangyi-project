<template>
  <div id="progress-bar">
    <div class="progress-inner" @click="handleProgress">
      <div class="progress"></div>
      <!--下面不能使用stop，因为使用stop之后外层click事件就捕获不到了-->
      <div class="progress-btn-wrapper" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd">
        <div class="progress-btn" ref="progressBtn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
const progressBtnWidth = 16;
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent: function (percent) {
      if (percent > 0 && !this.touch.isInit) {
        const barWidth = $('.progress-inner')[0].clientWidth - progressBtnWidth;
        this._offset(barWidth * percent);
      }
    }
  },
  created () {
    this.touch = {
      isInit: false,
      start: 0,
      left: 0
    };
  },
  mounted () {
    // console.log($('.progress-btn')[0].clientWidth);
  },
  methods: {
    touchStart (e) {
      this.touch.start = e.touches[0].pageX;
      this.touch.left = $('.progress')[0].clientWidth;
      this.touch.isInit = true;
    },
    touchMove (e) {
      if (!this.touch.isInit) {
        return;
      }
      const delta = e.touches[0].pageX - this.touch.start;// 间距
      const offsetWidth = Math.min($('.progress-inner')[0].clientWidth -
        progressBtnWidth, Math.max(0, this.touch.left + delta));// 注意边界,不大于整个progressBar - btn,不小于0
      this._offset(offsetWidth);
      // 这里得用progress的width / 总的长度
      this.triggerPercent('move');
    },
    touchEnd (e) {
      this.touch.isInit = false;
      this.triggerPercent('end');
      // 记录btn的位置
    },
    _offset (barWidth) {
      $('.progress').css('width', barWidth);
      $('.progress-btn-wrapper').css('transform', `translate3d(${barWidth}px,0,0)`);
    },
    triggerPercent (target) {
      const progressWidth = $('.progress')[0].clientWidth;
      const innerWidth = $('.progress-inner')[0].clientWidth - progressBtnWidth;
      if (target === 'move') {
        this.$emit('percentChange', progressWidth / innerWidth);
      } else if (target === 'end') {
        this.$emit('percentChangeEnd', progressWidth / innerWidth);
      }
    },
    handleProgress (e) {
      const barWidth = $('.progress')[0].clientWidth;
      const end = e.pageX;
      const start = this.$refs.progressBtn.getBoundingClientRect().x;
      this._offset(barWidth + end - start - progressBtnWidth / 2);
      this.triggerPercent('end');
    }
  }
};
</script>
  <style lang="scss">
#progress-bar {
  height: 30px;
  .progress-inner {
    height: 4px;
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    top: 13px;
    > .progress {
      height: 100%;
      background: #db2b1f;
      position: absolute;
    }
    > .progress-btn-wrapper {
      position: absolute;
      left: -7px;
      top: -13px;
      width: 30px;
      height: 30px;
      > .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 5px solid #f1f1f1;
        border-radius: 50%;
        background: #d44439;
      }
    }
  }
}
</style>
