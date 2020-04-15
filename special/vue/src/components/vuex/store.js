import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  actions: {
    asyncadd({commit, state}){
      setTimeout(() => {
        commit('add', 2)
      },1000)
    }
  },
  mutations: {
    add(state, num){
      state.count+=num
    }
  }
})