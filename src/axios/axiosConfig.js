import Axios from 'axios'
import Vue from 'vue'
import { Notify } from 'quasar'
import { dbConfig } from 'src/config'

/**
 * axios initialization
 */

const axios = Axios.create({
  // baseURL: Vue.prototype.$baseURL,
  timeout: Vue.prototype.$timeOut
})

axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Accept-Encoding'] = 'Accept-Encoding: gzip, deflate'

if (process.env.DEV) {
  axios.defaults.baseURL = dbConfig.host
} else if (process.env.PROD) {
  axios.defaults.baseURL = dbConfig.host
}

axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access_token')
    if (token && config.type) {
      config.headers.Authorization = 'Bearer ' + token
      switch (config.type) {
        case 'FORM-DATA':
          config.transformRequest = [data => { return 'args=' + JSON.stringify(data) }]
          break
        default:
          break
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const defaultNotify = {
      message: '未知错误',
      icon: 'warning',
      color: 'warning',
      position: 'top',
      timeout: 1500
    }
    switch (error.response.status) {
      case 403:
        defaultNotify.message = '拒绝访问(403)'
        Notify.create(defaultNotify)
        break
      case 404:
        defaultNotify.message = '资源不存在(404)'
        Notify.create(defaultNotify)
        break
      case 408:
        defaultNotify.message = '请求超时(404)'
        Notify.create(defaultNotify)
        break
      case 500:
        defaultNotify.message = '服务器错误(500)'
        Notify.create(defaultNotify)
        break
      case 501:
        defaultNotify.message = '服务未实现(501)'
        Notify.create(defaultNotify)
        break
      case 502:
        defaultNotify.message = '网络错误(502)'
        Notify.create(defaultNotify)
        break
      case 503:
        defaultNotify.message = '服务不可用(503)'
        Notify.create(defaultNotify)
        break
      case 504:
        defaultNotify.message = '网络超时(504)'
        Notify.create(defaultNotify)
        break
      case 505:
        defaultNotify.message = 'HTTP版本不受支持(505)'
        Notify.create(defaultNotify)
        break
      default:
        Notify.create(defaultNotify)
        break
    }
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      defaultNotify.message = '网络异常'
      Notify.create(defaultNotify)
    }
    return Promise.reject(error)
  }
)

export default axios
