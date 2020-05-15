import axios from 'axios'
import { debounce } from 'lodash'
import router from '../router'
import { Message, Modal } from 'view-design'
import config from './index'

axios.defaults.baseURL = config.baseURL
axios.defaults.timeout = 1000 * 10

axios.interceptors.request.use(function (config) {
  if (config.url.includes('?')) {
    config.url = `${config.url}&_t=${new Date().getTime()}`
  } else {
    config.url = `${config.url}?_t=${new Date().getTime()}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

const authError = debounce(message => {
  Message.error(message || 'Response error')
}, 300)

const loginExpired = debounce(() => {
  Modal.warning({
    title: '登录错误',
    content: '<p>未登录或登录已超时，请重新登录!</p>',
    onOk: () => {
      router.push({
        name: 'login'
      })
    }
  })
}, 500)

axios.interceptors.response.use(_res => {
  let res = _res.data
  if (res.code === 15 || res.code === 16) {
    loginExpired()
  } else if (res.code !== 0) {
    authError(res.message)
  }
  return res
}, error => {
  if (!axios.isCancel(error)) {
    authError(error.message)
  } else if (axios.isCancel(error) && error.message) {
    authError(error.message)
    console.warn(error.message)
  } else {
    console.warn('Request canceled')
  }
  return Promise.reject(error.response)
})

export default axios

/*
source && source.cancel() // 先旧取消请求，在发送新请求
source = this.$http.CancelToken.source()
this.$http.get(url, {
  cancelToken: source.token
}).then(res => {
  if (res.data) {
    this.tableData = res.data.list || []
    this.tableTotal = res.data.count
  }
})
*/
