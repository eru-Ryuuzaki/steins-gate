import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

// 免登陆页面 名单
// const whiteList = ['/login', '/auth-redirect']

export const constantRouterMap = [
  {
    path: '/main',
    name: '/main',
    component: () => import('@/views/main/Main.vue')
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  { path: '/', redirect: 'main' }
]

export const asyncRouterMap = []

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

// 如果只有 router.beforeEach((to) => {}) 的话会渲染不出来的
router.beforeEach((to, from, next) => {
  // const loginStore = store.state.login
  // console.log(store)
  if (to.path !== '/login') {
    const token = localStorage.getItem('token')
    // 判断是否存在登录信息
    if (token) {
      // 还没存
      // console.log('bingo', store.getters['login/roles'])
      const roles =
        store.getters['login/roles'] && store.getters['login/roles'].length > 0
      if (roles) {
        next()
      } else {
        // 保留原本要去的路径
        next({ path: `/login?redirect=${to.path}` })
      }
    } else {
      // 把目前想要去的路径存在 url 到时候再取出来
      next({ path: `/login?redirect=${to.path}` })
    }
  } else {
    next()
  }
})

export default router
