import Vue from 'vue'
import { HOST, ERR_OK } from './config'
import { showNormal } from './index'
const Fly = require('flyio/dist/npm/wx') // wx.js为flyio的微信小程序入口文件
const fly = new Fly() // 创建fly实例

// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  wx.showNavigationBarLoading()
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  return config
})

// 服务器响应
fly.interceptors.response.use(
  (response, promise) => {
    let res = response.data
    let data = res.data
    let timer = null

    if (typeof data === 'string' && data !== '') {
      data = JSON.parse(data)
    }
    clearTimeout(timer)
    if (res.code === ERR_OK) {
      promise.resolve(response.data)
    } else {
      showNormal(res.message)
      timer = setTimeout(() => {
        wx.hideLoading()
      }, 1500)
    }
    wx.hideNavigationBarLoading()
    console.log('拦截器返回结果：', res)
    return res // 将请求结果返回
  },
  (err, promise) => {
    // Do something with response error
    console.log('拦截器错误消息：', err)
    promise.reject(err)
    wx.hideLoading()
  }
)

// 配置请求基地址
Vue.prototype.$http = fly
fly.config.baseURL = HOST

export default fly
