<template>
  <div id="footer-guide">
    <ul class="foot-list">
      <router-link tag="li" @click.native="changeFootItem(index)" v-for="(item,index) in footList" :to="item.path" :key="index" :class="{'active': currentActiveIndex === index}">
        <div class="icon-contain">
          <svg class="svg-icon" aria-hidden="true">
            <use :xlink:href="'#icon-' + item.icon"></use>
          </svg>
        </div>
        <div class="foot-text">{{item.text}}</div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentActiveIndex: -1,
      footList: [{
        text: '发现',
        icon: 'faxian',
        path: '/discover'
      },
      {
        text: '视频',
        icon: 'shipin',
        path: '/videolist'
      },
      {
        text: '我的',
        icon: 'profile',
        path: '/profile'
      },
      {
        text: '朋友',
        icon: 'pengyou1',
        path: '/friends'
      },
      {
        text: '账号',
        icon: 'zhanghao',
        path: '/account'
      },
      ]
    }
  },
  created () {
    let route = this.$route.matched;  // 当前路由
    let routes = this.$router.options.routes; //当前路由的同级路由
    console.log(route);
    console.log(_.find(routes, { 'path': route[0]['path'] }));
    // _.find(this.footList,{path: })
    console.log('created------');
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
      console.log('click------');
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