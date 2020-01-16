<template>
  <div id="footer-guide">
    <ul class="foot-list">
      <router-link tag="li" v-for="(item,index) in footList" :to="item.path" :key="index" :class="{'active': $route.path.indexOf(item.path) > -1}">
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
export default {
  data () {
    return {
      currentActiveIndex: -1,
      footList: []
    }
  },
  created () {
    let routes = this.$router.options.routes; //获取所有路由
    this.footList = _.find(routes, { 'path': '/home' })['children']; //获取Home路由的子节点
  },
  watch: {
    '$route': function (route) {
      this.currentActiveIndex = _.findIndex(this.footList, (item) => {
        return item.path === route.fullPath;
      });
    }
  },
  methods: {
    changeFootItem (index) {
      this.currentActiveIndex = index;
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
#footer-guide {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .foot-list {
    padding: 5px;
    display: flex;
    justify-content: space-between;
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
      }
      &.active {
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