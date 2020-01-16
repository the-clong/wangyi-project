import Vue from 'vue';
import service from './utils/fetch'
import App from './App';
import _ from "lodash";
import './assets/iconfont/iconfont'   //加载svg的js文件
import router from './router'
Vue.prototype.$http = service;
Vue.config.productionTip = false
new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
