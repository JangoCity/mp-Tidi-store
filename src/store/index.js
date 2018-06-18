// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      if (state.count === 1) return
      state.count -= 1
    }
  }
})

export default store
