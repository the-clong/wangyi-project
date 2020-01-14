import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from './utils/axios';
import $ from 'jquery'
import App from './App.vue'
import _ from "lodash";
import './iconfont/iconfont.js'   //加载svg的js文件
import routes from './router/index';
Vue.prototype.$http = axios;
Vue.use(VueRouter);              //千万别忘了这个
const router = new VueRouter({
  mode: 'history',
  routes,
  //判断路由跳转行为，如果有keepAlive，那么跳转到原先浏览的位置
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
});
console.log(router);
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
