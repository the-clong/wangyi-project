<template>
  <div id="login-phone">
    <div class="number-container">
      <Header></Header>
      <p class="prompt">未注册手机号登录将自动创建账号</p>
      <div class="phone-number">
        <span>86</span><input v-model="phone.number" placeholder="输入手机号" id="phoneNumber" type="text" class="needsclick" />
      </div>
      <div class="phone-password">
        <input v-model="phone.password" placeholder="输入密码" id="phonePwd" type="password" />
      </div>
      <a class="login-btn" @click="validateLogin">立即登录</a>
    </div>
    <Prompt :message="phone.errorMessage" :isPromptShow="isPromptShow" @changePromptShow="changePromptShow"></Prompt>
  </div>
</template>
<script>
import $ from 'jquery';
import Header from './header';
import Prompt from '@/base/prompt';
import { mapActions } from 'vuex';
export default {
  components: {
    Header, Prompt
  },
  data () {
    return {
      phone: {
        number: '',
        password: '',
        errorMessage: ''
      },
      oldNum: 0,
      isPromptShow: false
    };
  },
  created () {
    localStorage.clear();
  },
  watch: {
    'phone.number': function (num) {
      if (!isNaN(num)) {
        this.oldNum = this.phone.number;
      }
      this.phone.number = this.oldNum.trim();
    }
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    // 对方身份都是
    validateLogin () {
      const num = $('#phoneNumber').val();
      const pwd = $('#phonePwd').val();
      if (!num && !pwd) {
        this.isPromptShow = true;
        this.phone.errorMessage = '请输入手机号和密码';
      } else if (!(/^1[3456789]\d{9}$/.test(num))) {
        this.isPromptShow = true;
        this.phone.errorMessage = '手机号格式不正确';
        return false;
      } else {
        this.startLogin(num, pwd);
      }
    },
    changePromptShow (isPromptShow) {
      this.isPromptShow = isPromptShow;
    },
    async startLogin (phone, password) {
      const res = await this.$http.fetch('/login/cellphone', { phone, password }, 'GET');
      if (res.code === 200 && res.loginType) {
        this.setUserInfo(res).then(() => {
          this.$router.push({
            path: '/home'
          });
        });
      } else {
        this.isPromptShow = true;
        this.phone.errorMessage = res.msg;
      }
    }
  }
};
</script>
<style lang="scss">
@import '~@/common/css/mixin';
#login-phone {
  padding: 10px 15px;
  .number-container {
    .phone-number {
      padding: 20px 0;
      border-bottom: 1px solid #d1d1d1;
      font-size: 1.3rem;
      > input {
        width: calc(100% - 3rem);
        margin-left: 10px;
        font-size: 1.3rem;
        height: 30px;
      }
    }
    .phone-password {
      padding: 10px 0;
      border-bottom: 1px solid #d1d1d1;
      > input {
        width: 100%;
        font-size: 1.2rem;
      }
    }
    .login-btn {
      margin-top: 1rem;
      width: 100%;
      @include lh(2.8rem, 1.2rem);
      display: block;
      background-image: linear-gradient(to right, #ff594b, #ff1d11);
      border-radius: 1.5rem;
      color: #fff;
    }
  }
}
</style>
