import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 如果只有 router.beforeEach((to) => {}) 的话会渲染不出来的
// router.beforeEach((to) => {
//   if (to.path === '/') {
//     // 判断登录信息是否可用或者过期
//     // 看是不是第一次的话就看 vuex 有没有就行了
//     const refreshToken = localStorage.getItem('refreshToken')
//     if (!refreshToken) {
//       return '/login'
//     } else {
//     }
//   } else if (to.path !== '/login') {
//   }
// })

export default router
