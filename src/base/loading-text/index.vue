<template>
  <div class="loading-word">
    <span>
      {{loadingText}}
    </span>
  </div>
</template>
<script>
export default {
  props: ['loadingText']
};
</script>
<style lang="scss" scoped>
.loading-word {
  text-align: center;
  z-index: 100;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 15px;
  height: 25px;
  line-height: 25px;
  color: #959ba3;
  span {
    vertical-align: middle;
    margin-left: 5px;
    font-size: 12px;
    padding-top: 12px;
  }
}
</style>
