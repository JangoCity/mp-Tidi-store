import config from '../config'

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
      url: config.host + url,
      success: (res) => {
        if (res.data.code === 10000) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
