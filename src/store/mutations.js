import * as types from './mutation-types'

const mutations = {
  [types.SET_USETINFO](state, userinfo) {
    state.userinfo = userinfo
    wx.setStorageSync('userinfo', userinfo)
  },
  [types.SET_CONTACT](state, contact) {
    state.contact = contact
  },
  [types.SET_PAYMENT](state, payment) {
    state.payment = payment
  },
  [types.INCREMENT](state) {
    state.count += 1
  },
  [types.DECREMENT](state) {
    if (state.count === 1) return
    state.count -= 1
  }
}

export default mutations
