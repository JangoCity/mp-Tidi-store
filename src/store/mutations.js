import * as types from './mutation-types'

const mutations = {
  [types.SET_USETINFO](state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_FAVORITE](state, list) {
    state.list = list
  },
  [types.SET_PAYMENT](state, payment) {
    state.payment = payment
  },
  [types.INCREMENT](state, count) {
    state.count += 1
  },
  [types.DECREMENT](state, count) {
    if (state.count === 1) return
    state.count -= 1
  }
}

export default mutations
