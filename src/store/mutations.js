import * as types from './mutation-types'

const mutations = {
  [types.SET_USETINFO](state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_FAVORITE](state, list) {
    state.list = list
  }
}

export default mutations
