import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/main',
    component: () => import('@/views/main/Main.vue')
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
