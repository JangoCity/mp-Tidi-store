const state = {
  userinfo: {
    avatarUrl: '../../static/images/unlogin.png',
    phone: '未绑定',
    name: ''
  }, // 用户信息
  favoriteList: [], // 收藏列表
  count: 1, // 购买总数
  payment: 0 // 支付方式，默认余额
}

export default state
