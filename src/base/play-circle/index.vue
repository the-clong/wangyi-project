<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" />
    </svg>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 0
    },
    dashOffset: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dashArray: Math.PI * 100
    };
  }
};
</script>
<style lang="scss">
.progress-circle {
  position: relative;
  height: 100%;
  circle {
    stroke-width: 6px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: #e6e6e6;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: red;
    }
  }
}
</style>
