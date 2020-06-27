<template>
  <div id="footer-guide">
    <div class="foot-bg"></div>
    <ul class="foot-list">
      <router-link tag="li" v-for="(item,index) in footList" :to="item.path" :key="index">
        <div class="icon-contain">
          <svg class="svg-icon" aria-hidden="true">
            <use :xlink:href="'#icon-' + item.meta.icon"></use>
          </svg>
        </div>
        <div class="foot-text">{{item.meta.title}}</div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  data () {
    return {
      currentActiveIndex: -1,
      footList: []
    };
  },
  created () {
    const routes = this.$router.options.routes; // 获取所有路由
    this.footList = routes.slice(0, 5);// _.find(routes, { path: '/' }).children; // 获取Home路由的子节点
  },
  watch: {
    // '$route': function (route) {
    //   this.currentActiveIndex = _.findIndex(this.footList, (item) => {
    //     return item.path === route.fullPath;
    //   });
    // }
  },
  methods: {
    // changeFootItem (index) {
    //   this.currentActiveIndex = index;
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/common/css/mixin";
#footer-guide {
  width: 100%;
  position: fixed;
  /* z-index: 10; */
  bottom: 0;
  left: 0;
  height: 65px;
  /* filter: blur(1rem);
  background: rgba(232, 232, 232, 0.1); */
  .foot-bg {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    @include wh(100%, 100%);
    filter: blur(1rem);
    background: rgba(232, 232, 232, 0.1);
  }
  .foot-list {
    width: 100%;
    position: absolute;
    z-index: 10;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    li {
      flex: 1;
      text-align: center;
      padding-top: 0.5rem;
      & > .icon-contain {
        display: inline-block;
        @include wh(2rem, 2rem);
        padding-top: 0.25rem;
        border-radius: 50%;
        > .svg-icon {
          @include wh(1.5rem, 1.5rem);
        }
      }
      & > .foot-text {
        font-size: 0.4rem;
        color: #666;
        padding: 0.2rem 0;
      }
      &.router-link-active {
        .icon-contain {
          background-color: red;
          > .svg-icon {
            color: #fff;
            @include wh(1.5rem, 1.5rem);
          }
          > .foot-text {
            color: #fff;
            font-size: 0.4rem;
          }
        }
        & > .foot-text {
          color: red;
        }
      }
    }
  }
}
</style>
