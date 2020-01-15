import axios from './axios';
import qs from 'qs';
const instance = axios;
export default {
  // data:参数  options:axios的配置  params:在put的时候使用
  fetch (url = '', data = {}, type = 'POST', options = {}) {
    instance.defaults.baseURL = '/base-api';
    const commonUrl = url;
    type = type.toUpperCase();
    options.timeout = options.timeout || 10000 // 超时时间设置，单位毫秒
    options.crossDomain = true
    options.charset = options.charset || 'UTF-8'
    options.headers = options.headers || {};
    if (type === 'GET') {
      options.params = data;
      // commonUrl = appendQueryString(commonUrl,data);
      return instance.get(commonUrl, options);
    }
    if (type === 'POST') {
      options.dataType = options.dataType || 'json';
      // options.contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8'
      options.contentType = options.contentType || 'application/json;charset=utf-8';
      return instance.post(commonUrl, data === {} ? undefined : qs.stringify(data), options);
    }
    if (type === 'PUT') {
      return instance.put(commonUrl, data, options);
    }
    if (type === 'DELETE') {
      return instance.delete(commonUrl, options);
    }
  }
};
