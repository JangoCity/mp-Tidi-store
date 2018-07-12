import Vue from 'vue'
import App from './App'
// import lodash from 'lodash'

// import './common/stylus/index.styl'
Vue.config.productionTip = false
// 注入lodash 局部可以使用this.$lodash来调用
// Vue.prototype.$lodash = lodash

App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main', // 首页
      'pages/order-list/main', // 订单列表
      'pages/order-detail/main', // 订单详情
      'pages/goods-detail/main', // 商品详情
      'pages/bill-detail/main', // 账单详情
      'pages/column-list/main', // 栏目列表
      'pages/buy/main', // 购买
      'pages/my/main', // 我的
      'pages/my-profile/main', // 我的资料
      'pages/bind-phone/main', // 绑定手机
      'pages/my-wallet/main', // 我的钱包
      'pages/my-address/main', // 收货地址
      'pages/my-favorite/main', // 我的收藏
      'pages/my-notice/main' // 我的消息
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '梯递',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#333', // 底部bar字体颜色
      selectedColor: '#e60012', // 字体选中颜色
      backgroundColor: '#fff', // bar整体背景颜色
      borderStyle: 'black', // bar上方border颜色
      position: 'bottom',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: 'static/images/icon-home@3x.png',
        selectedIconPath: 'static/images/icon-home-active@3x.png'
      }, {
        pagePath: 'pages/order-list/main',
        text: '订单',
        iconPath: 'static/images/icon-order@3x.png',
        selectedIconPath: 'static/images/icon-order-active@3x.png'
      }, {
        pagePath: 'pages/my/main',
        text: '我的',
        iconPath: 'static/images/icon-my@3x.png',
        selectedIconPath: 'static/images/icon-my-active@3x.png'
      }]
    }
  }
}
