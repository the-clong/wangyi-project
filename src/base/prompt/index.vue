<!--弹出框提示-->
<template>
  <div id="prompt" v-show="isPromptShow">
    <div class="prompt-inner">
      {{message}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    isPromptShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // isPromptShow: false
    };
  },
  watch: {
    isPromptShow: function (isPromptShow) {
      const self = this;
      if (isPromptShow) {
        setTimeout(() => {
          self.$emit('changePromptShow', !isPromptShow);
        }, 2000);
      }
    }
  },
  mounted () {

  }
};
</script>
<style lang="scss">
#prompt {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  > .prompt-inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(48, 49, 51, 0.7);
    color: #fff;
    border-radius: 10px;
    width: 12rem;
    padding: 10px 12px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
