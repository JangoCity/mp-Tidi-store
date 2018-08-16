const state = {
  userinfo: {
    avatarUrl: '../../static/images/unlogin.png',
    phone: '未绑定',
    name: ''
  }, // 用户信息
  contact: { name: '请选择收货地址', phone: '', province: '', city: '', area: '', district: '', address: '', id: '' }, // 默认地址
  count: 1, // 购买数量
  payment: 1 // 支付方式，默认余额
}

export default state
