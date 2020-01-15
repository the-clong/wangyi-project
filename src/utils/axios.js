import axios from 'axios';
// import { Ajax } from './ajax'
import _ from 'lodash';
const CancelToken = axios.CancelToken;
// import { Message } from 'element-ui'
const pending = {};
// 创建 axios 实例,初始化配置
const service = axios.create({
  withCredentials: true,
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  responseType: 'json'
});
// key: 请求标识；isRequest 完成请求后也需要执行删除记录，所以添加此参数避免执行无用操作
const removePending = (config, isRequest = false) => {
  // 请求响应将队列制空
  const requestData = getRequestIdentify(config)
  _.forEach(pending, function (value, key) {
    if (requestData === key) {
      if (isRequest) {
        value()
      }
      delete pending[key]
    }
  })
}
const getRequestIdentify = (config) => {
  const url = config.url
  return config.method === 'get' ? encodeURIComponent(url) : encodeURIComponent(config.url + JSON.stringify(config.data))
}
// 请求拦截器
service.interceptors.request.use(config => {
  // 拦截重复请求
  removePending(config, true)
  const requestData = getRequestIdentify(config)
  config.cancelToken = new CancelToken((c) => {
    pending[requestData] = c
  })
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use((response) => {
  const { data, config } = response
  // 拦截重复请求
  removePending(config)
  return data;
}, (err) => {
  if (err && err.response) {
    switch (status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.statusText}`
    }
    // Message.error({
    //   message: err.message,
    //   duration: 5 * 1000
    // })
  }
}
)
export default service
