import Vue from 'vue'
import { HOST, ERR_OK } from './config'
const Fly = require('flyio/dist/npm/wx') // wx.js为flyio的微信小程序入口文件
const fly = new Fly() // 创建fly实例

// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  return config
})

// 服务器响应
fly.interceptors.response.use(
  (response, promise) => {
    let res = response.data
    let data = res.data

    if (typeof data === 'string' && data !== '') {
      data = JSON.parse(data)
    }

    if (res.code === ERR_OK) {
      promise.resolve(response.data)
    } else {
      wx.showLoading({
        title: res.message
      })
    }
    wx.hideLoading()
    console.log('拦截器返回结果：', data)
    // 将请求结果返回
    return data
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
