// 工具函数库
import {
  HOST
} from './config'

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

export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export const obj2style = style => {
  let str = []
  Object.keys(style).forEach(key => str.push(`${key}:${style[key]};`))
  return str.join(';')
}

// http get工具函数 获取数据
export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}

function request(url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: HOST + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
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
