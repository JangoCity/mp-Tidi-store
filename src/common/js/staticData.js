export const indexInfo = [{
  id: 10001,
  title: '工作/Work',
  icon: '',
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
  icon: '',
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

export const tabList = [
  { title: '全部', type: 'all', id: 101 },
  { title: '待付款', type: 'good', id: 102 },
  { title: '待发货', type: 'share', id: 103 },
  { title: '待收货', type: 'ask', id: 104 },
  { title: '待评价', type: 'job', id: 105 }
]

export const myList = [
  { id: 101, title: '我的资料' },
  { id: 102, title: '我的钱包' },
  { id: 103, title: '收货地址' },
  { id: 104, title: '我的收藏' },
  { id: 105, title: '我的消息' }
]

export const obj2style = style => {
  let str = []
  Object.keys(style).forEach(key => {
    str.push(`${key}:${style[key]};`)
  })
  return str.join(';')
}
