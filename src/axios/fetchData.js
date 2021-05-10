import _axios from './axiosConfig'
import Axios from 'axios'
import Vue from 'vue'

/**
 * Custom general axios package class
 * @param query Request body
 * @returns {*}
 * @author box
 */

const fetchData = query => {
  return _axios({
    url: query.url,
    method: query.method || 'POST',
    params: {
      access_token: sessionStorage.getItem('access_token'),
      ...query.params
    }, // 请求参数
    responseType: query.responseType || 'json',
    auth: query.auth || { username: sessionStorage.getItem('access_token') },
    data: query.data || '',
    headers: query.headers
  })
}

const fetchFile = query => {
  const formData = new FormData()
  formData.append('smfile', query.file)

  return Axios({
    url: query.url,
    method: 'post',
    data: formData,
    headers: query.headers
  })
}

Vue.prototype.$fetchData = fetchData
Vue.prototype.$fetchFile = fetchFile
