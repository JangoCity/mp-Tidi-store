// 生成单个随机颜色
export function getRandomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
}

// 生成一组随机颜色
export function getArrRandomColor(length) {
  let arr = []
  for (let i = 0; i < length; i++) {
    arr.push(getRandomColor())
  }
  return arr
}

// 获取openId
export const getUserInfo = () => {

}

export const obj2style = style => {
  let str = []
  Object.keys(style).forEach(key => str.push(`${key}:${style[key]};`))
  return str.join(';')
}

export function showModal(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showSuccess(text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showFail(text) {
  wx.showToast({
    title: text,
    icon: 'fail'
  })
}
