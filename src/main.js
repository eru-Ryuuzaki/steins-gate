import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'
import './assets/css/index.less'

// 按需引入组件
import { registerUi } from './register-element-ui'
import http from './service/request'

Vue.config.productionTip = false

Vue.use(registerUi)
Vue.use(http)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
