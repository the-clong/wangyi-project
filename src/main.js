import Vue from 'vue';
import axios from './utils/axios';
import $ from 'jquery'
import App from './App.vue'
import _ from "lodash";
Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
