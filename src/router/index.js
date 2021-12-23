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
// if (to.path !== '/login') {
//   const token = localCache.getCache('token')
//   if (!token) {
//     return '/login'
//   }
// }
// if (to.path === '/main') {
//   return firstMenu.url
// }
// })

export default router
