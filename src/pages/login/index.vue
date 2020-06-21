<template>
  <div id="common-login">
    <section class="login-logo">
      <div class="logo">
        <img src="@/assets/image/logo-wangyi.png" />
      </div>
    </section>
    <section class="phone-login">
      <div class="phone-btn" @click="phoneLogin">手机号登录</div>
      <ul>
        <li v-for="(item,index) in loginWays" :key="index">
          <div class="icon-contain">
            <svg class="svg-icon" aria-hidden="true">
              <use :xlink:href="'#icon-' + item.icon"></use>
            </svg>
          </div>
        </li>
      </ul>
      <div class="accept-terms">
        同意<a>《服务条款》</a><a>《隐私策略》</a><a>《儿童隐私策略》</a>
      </div>
    </section>
    <!-- <Prompt :message="propmtMsg"></Prompt> -->
  </div>
</template>
<script>
// import Prompt from '@/components/common/prompt';
export default {
  components: {
    // Prompt
  },
  data () {
    return {
      propmtMsg: '提示信息呱唧呱唧共和国环境不会就画江湖',
      loginWays: [
        {
          icon: 'weixin'
        },
        {
          icon: 'icon'
        },
        {
          icon: 'weibo'
        },
        {
          icon: 'youxiang'
        }
      ]
    };
  },
  created () {
    console.log('created----');
  },
  methods: {
    phoneLogin () {
      this.$router.push({
        path: '/phoneLogin'
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@/common/css/mixin';
#common-login {
  background-color: #db2b1f;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .login-logo {
    position: relative;
    width: 18rem;
    height: 18rem;
    border: 1px solid #f12a24;
    border-radius: 50%;
    .logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 5rem;
      height: 5rem;
      border: 1px solid #f12a24;
      border-radius: 50%;
      padding: 0.5rem;
      & > img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
  }
  .phone-login {
    padding: 0.5rem 0;
    & > .phone-btn {
      font-weight: 500;
      width: 18rem;
      height: 2.7rem;
      line-height: 2.7rem;
      border-radius: 12rem;
      background-color: #fff;
      color: #ff3a39;
      text-align: center;
    }
    & > ul {
      display: flex;
      margin-top: 60px;
      justify-content: space-between;
      & > li {
        & > .icon-contain {
          padding: 0.5rem 0;
          font-size: 2rem;
          width: 3rem;
          height: 3rem;
          border: 1px solid #e66f66;
          border-radius: 50%;
          color: #fceae9;
          text-align: center;
        }
      }
    }
    & > .accept-terms {
      font-size: 20px;
      margin-top: 60px;
      width: 18rem;
      color: #e66f66;
      > a {
        color: #fff;
      }
    }
  }
}
</style>
