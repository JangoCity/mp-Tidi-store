// 首页信息
export const indexInfo = [{
  id: 10001,
  title: '工作/Work',
  icon: 'icon-work',
  list: [{
    id: 101,
    title: '拼车',
    desc: '要下班了，公交太堵，头大要不拼个车',
    image: '../../static/images/work-01.png'
  }, {
    id: 102,
    title: '下午茶',
    desc: '累了吧，累了吧，累了吧，累了吧',
    image: '../../static/images/work-02.png'
  }, {
    id: 103,
    title: '宵夜',
    desc: '加班到深夜，加班到深夜，加班到深夜，',
    image: '../../static/images/work-03.png'
  }]
}, {
  id: 10002,
  title: '生活/Life',
  icon: 'icon-life',
  list: [{
    id: 101,
    title: '运动健身',
    desc: '生活生活生活生活1',
    image: '../../static/images/life-01.png'
  }, {
    id: 102,
    title: '亲子活动',
    desc: '生活生活生活生活222',
    image: '../../static/images/life-02.png'
  }, {
    id: 103,
    title: '水果',
    desc: '生活生活生活生活3333',
    image: '../../static/images/life-03.png'
  }]
}]

// 我的主页栏目列表
export const myList = [
  { id: 101, title: '我的资料', icon: 'icon-wodeziliao' },
  { id: 102, title: '我的钱包', icon: 'icon-wodeqianbao' },
  { id: 103, title: '收货地址', icon: 'icon-shouhuodizhi' },
  { id: 104, title: '我的收藏', icon: 'icon-wodeshoucang' },
  { id: 105, title: '我的消息', icon: 'icon-wodexiaoxi' }
]

// 创建收货地址类型
export const createAddressType = [
  { id: 0, name: 'home', value: '家庭住址', checked: true },
  { id: 1, name: 'office', value: '办公住址', checked: false }
]

// 创建收货地址
export const createAddressForm = {
  name: {
    id: 1001,
    label: '姓名',
    placehodleText: '收货人姓名',
    value: '',
    maxlength: 11
  },
  phone: {
    id: 1002,
    label: '手机',
    placehodleText: '请输入手机号码',
    value: '',
    maxlength: 11
  },
  address: {
    id: 1002,
    label: '地区',
    placehodleText: '选择地区',
    value: '',
    maxlength: 6
  },
  area: {
    id: 1002,
    label: '小区',
    placehodleText: '所在小区名称',
    value: '',
    maxlength: 6
  },
  number: {
    id: 1002,
    label: '门牌号',
    placehodleText: '具体的楼栋单元门牌号',
    value: '',
    maxlength: 6
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
