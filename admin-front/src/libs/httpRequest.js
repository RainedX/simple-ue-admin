import axios from 'axios'
import store from '../store'
import { getLocal } from './local'

class HttpRequest {
  constructor () {
    this.BASE_URL = process.env.BASE_URL
    this.timeout = 3000
    this.queue = {}
  }
  merge (options) {
    return {
      ...options,
      baseURL: this.BASE_URL,
      timeout: this.timeout,
      method: options.method || 'get'
    }
  }
  setInterceptor (instance, url) {
    instance.interceptors.request.use(config => {
      config.headers.Authorization = getLocal('token') || ''
      if (Object.keys(this.queue).length === 0) {
        store.commit('showLoading')
      }
      this.queue[url] = url
      return config
    })
    instance.interceptors.response.use(res => {
      delete this.queue[url]
      if (Object.keys(this.queue).length === 0) {
        store.commit('hideLoading')
      }
      return res.data
    })
  }
  request (options) {
    let instance = axios.create()
    let config = this.merge(options)

    this.setInterceptor(instance, options.url)
    return instance(config)
  }
}

export default new HttpRequest()
