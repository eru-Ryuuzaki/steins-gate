import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import app from './app'
import permission from './permission'
import getters from './getters'
import errorLog from './errorLog'
import tagsView from './tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    permission,
    app,
    errorLog,
    tagsView
  },
  getters
})
