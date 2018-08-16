// 首页信息
export const indexInfo = [{
  id: 10001,
  title: '工作/Work',
  icon: 'icon-work',
  list: []
}, {
  id: 10002,
  title: '生活/Life',
  icon: 'icon-life',
  list: []
}]

// 我的主页栏目列表
export const myList = [
  { id: 101, title: '我的资料', icon: 'icon-wodeziliao' },
  { id: 102, title: '我的钱包', icon: 'icon-wodeqianbao' },
  { id: 103, title: '收货地址', icon: 'icon-shouhuodizhi' },
  { id: 104, title: '我的收藏', icon: 'icon-wodeshoucang' },
  { id: 105, title: '我的消息', icon: 'icon-wodexiaoxi' },
  { id: 106, title: '常见问题', icon: 'icon-wenti' }
]

// 创建收货地址类型
export const createAddressType = [
  { id: 1, name: 'home', value: '家庭住址', checked: true },
  { id: 2, name: 'office', value: '办公住址', checked: false }
]

// 创建收货地址
export const createAddressForm = {
  name: {
    id: 1001,
    label: '姓名',
    placehodleText: '收货人姓名',
    value: '',
    type: 'value',
    maxlength: 4
  },
  phone: {
    id: 1002,
    label: '手机',
    placehodleText: '请输入手机号码',
    value: '',
    type: 'number',
    maxlength: 11
  },
  address: {
    id: 1002,
    label: '地区',
    placehodleText: '选择地区',
    value: '',
    type: 'value',
    maxlength: 20
  },
  area: {
    id: 1002,
    label: '小区',
    placehodleText: '所在小区名称',
    value: '',
    type: 'value',
    maxlength: 20
  },
  number: {
    id: 1002,
    label: '门牌号',
    placehodleText: '具体的楼栋单元门牌号',
    value: '',
    type: 'value',
    maxlength: 20
  }
}

// 支付方式
export const paymentList = [{
  type: '0',
  icon: 'icon-yuezhifu balance',
  text: '余额支付'
}, {
  type: '1',
  icon: 'icon-weixinzhifu wechat',
  text: '微信支付'
}]
