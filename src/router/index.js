
import Vue from "vue";
import VueRouter from 'vue-router';
import home from './home';
import common from './common';
Vue.use(VueRouter);
export default new VueRouter({
  mode: 'history',
  routes: [
    ...home,
    ...common
  ],
  // 判断路由跳转行为，如果有keepAlive，那么跳转到原先浏览的位置(主要用于移动端vue缓存)
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  beforeEach (to, from, next) {
    document.title = to.meta.title || 'ap-web-new';
    next();
  }
});