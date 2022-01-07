import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import permission from './permission'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    permission
  }
})
