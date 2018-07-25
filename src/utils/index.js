import fly from './fly'

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
export const getOpenId = (userinfo, callback) => {
  if (!userinfo) return
  wx.login({
    success: async (res) => {
      if (res.code) {
        // 获取openId
        let params = { code: res.code }
        let data = await fly.get('auth', params)
        let openid = data.openid

        // 根据openId获取用户信息
        params = {
          openid,
          wechat_name: userinfo.nickName,
          image: userinfo.avatarUrl,
          sex: userinfo.gender
        }
        let login = await fly.post('login', params)
        // 将uid和openid挂在userinfo并存于Storage
        userinfo.uid = login.user.id
        userinfo.openid = openid

        console.log('userinfo====', userinfo)
        wx.setStorageSync('userinfo', userinfo)
        callback instanceof Function && callback(userinfo)
      } else {
        showModal({
          title: '获取用户登录态失败！',
          content: res.errMsg
        })
      }
    }
  })
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

export function showNormal(text) {
  wx.showToast({
    title: text,
    icon: 'none'
  })
}
