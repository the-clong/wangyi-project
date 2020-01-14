<template>
  <div id="footer-guide">
    <ul class="foot-list">
      <router-link tag="li" v-for="(item,index) in footList" :to="item.path" :key="index">
        <svg class="svg-icon" aria-hidden="true">
          <use :xlink:href="'#icon-' + item.icon"></use>
        </svg>
        <div class="foot-text">{{item.text}}</div>
      </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
            icon: 'pengyou',
            path: '/friends'
          },
          {
            text: '账号',
            icon: 'zhanghao',
            path: '/account'
          },
        ]
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
      display:flex;
      justify-content:space-between;
      li {
        flex: 1;
        text-align: center;
        padding-top: 0.5rem;
        & > .svg-icon {
          @include wh(1.5rem,1.5rem);
        }
        & > .foot-text {
          font-size: 0.5rem;
          color: #666;
        }
      }
    }
  }
</style>