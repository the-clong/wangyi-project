import Vue from 'vue';
import service from './utils/fetch';
import App from './App';
import _ from 'lodash';
import './assets/iconfont/iconfont'; // 加载svg的js文件
// import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import router from './router';
import store from './store';
// fastclick.attach(document.body);
Vue.prototype.$http = service;
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  loading: require('@/assets/image/default.png')
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.Token) { // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else if (store.state.Token && (to.fullPath === '/login' || to.fullPath === '/phoneLogin')) { // 如果是已经登录的
    next({
      path: '/discover'
    });
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
