import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  test: '123',
  asd: 123,
  config: {
    navigationBarTitleText: '订单',
    'enablePullDownRefresh': true
  }
}
