import axios from 'axios';
// import { Ajax } from './ajax'
import _ from 'lodash';
// import { Message } from 'element-ui'
import store from '@/store';
const CancelToken = axios.CancelToken;
const pending = {};
// 创建 axios 实例,初始化配置
const service = axios.create({
  withCredentials: true,
  // headers: { 'Content-Type': 'application/json;charset=utf-8' },
  responseType: 'json'
});
// key: 请求标识；isRequest 完成请求后也需要执行删除记录，所以添加此参数避免执行无用操作
const removePending = (config, isRequest = false) => {
  // 请求响应将队列制空
  const requestData = getRequestIdentify(config);
  _.forEach(pending, function (value, key) {
    if (requestData === key) {
      if (isRequest) {
        value();
      }
      delete pending[key];
    }
  });
};
const getRequestIdentify = (config) => {
  const url = config.url;
  return config.method === 'get' ? encodeURIComponent(url) : encodeURIComponent(config.url + JSON.stringify(config.data));
};
// 请求拦截器
service.interceptors.request.use(config => {
  // 拦截重复请求
  // removePending(config, true);
  const requestData = getRequestIdentify(config);
  config.cancelToken = new CancelToken((c) => {
    pending[requestData] = c;
  });
  if (store.state.Token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `token ${store.state.Token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
// 添加响应拦截器
service.interceptors.response.use((response) => {
  const { data, config } = response;
  // 拦截重复请求
  // removePending(config);
  return data;
}, (err) => {
  if (err && err.response) {
    return Promise.reject(err);
    // Message.error({
    //   message: err.message,
    //   duration: 5 * 1000
    // })
  }
}
);
export default service;
