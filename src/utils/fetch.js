import axios from './axios';
import store from '@/store';
import router from '@/router';
import * as types from '@/store/mutation-type';
import qs from 'qs';
const instance = axios;
export default {
  // data:参数  options:axios的配置  params:在put的时候使用
  fetch (url = '', data = {}, type = 'POST', options = {}) {
    instance.defaults.baseURL = '/base-api';
    const commonUrl = url;
    type = type.toUpperCase();
    options.timeout = options.timeout || 10000; // 超时时间设置，单位毫秒
    options.crossDomain = true;
    options.charset = options.charset || 'UTF-8';
    options.headers = options.headers || {};
    let axiosRes = null;
    if (type === 'GET') {
      options.params = data;
      // commonUrl = appendQueryString(commonUrl,data);
      axiosRes = instance.get(commonUrl, options);
    }
    if (type === 'POST') {
      options.dataType = options.dataType || 'json';
      // options.contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8';
      options.contentType = options.contentType || 'application/json;charset=utf-8';
      axiosRes = instance.post(commonUrl, data === {} ? undefined : qs.stringify(data), options);
    }
    if (type === 'PUT') {
      axiosRes = instance.put(commonUrl, data, options);
    }
    if (type === 'DELETE') {
      axiosRes = instance.delete(commonUrl, options);
    }
    axiosRes.then((res) => {

    }).catch((err) => {
      switch (err.status) {
        case 400:
          err.message = '错误请求';
          break;
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.USER_LOGOUT);
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          });
          err.message = '未授权，请重新登录';
          break;
        case 403:
          err.message = '拒绝访问';
          break;
        case 404:
          err.message = '请求错误,未找到该资源';
          break;
        case 405:
          err.message = '请求方法未允许';
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器端出错';
          break;
        case 501:
          err.message = '网络未实现';
          break;
        case 502:
          err.message = '网络错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网络超时';
          break;
        case 505:
          err.message = 'http版本不支持该请求';
          break;
        default:
          err.message = `连接错误${err.response.statusText}`;
      }
    });
    return axiosRes;
  }
};
