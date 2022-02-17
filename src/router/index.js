import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Layout from '@/layout'

Vue.use(VueRouter)

// 免登陆页面 名单
const whiteList = ['/login']

// 所有用户通用路由权限
export const constantRoutes = [
  {
    /*
    在配置文件里以冒号的形式设置参数。我们在/src/router/index.js文件里配置路由。
    {
      path:'/params/:newsId/:newsTitle',
      component:Params
    }
    <router-link  to="/params/198/jspang"> params</router-link>
    接收参数
    {{ $route.params.newsId}}
    {{ $route.params.newsTitle}}
    */
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  }
  // { path: '/', redirect: '/home' }
]

export const asyncRoutes = [
  {
    path: '/pms',
    name: 'pms',
    redirect: '/pms/product',
    meta: { title: '商品管理', icon: 'icon', noCache: true },
    component: Layout,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'product',
        component: () => import('@/views/pms/Product.vue'),
        name: 'product',
        meta: { title: '商品列表', icon: 'icon', noCache: true }
      },
      {
        path: 'add-product',
        name: 'add-product',
        component: () => import('@/views/pms/AddProduct.vue'),
        meta: { title: '添加商品', icon: 'icon', noCache: true }
      },
      {
        path: 'brand-management',
        name: 'brand-management',
        component: () => import('@/views/pms/BrandManagement.vue'),
        meta: { title: '品牌管理', icon: 'icon', noCache: true }
      },
      {
        path: 'product-classification',
        name: 'product-classification',
        component: () => import('@/views/pms/ProductClassification.vue'),
        meta: { title: '商品分类', icon: 'icon', noCache: true }
      },
      {
        path: 'product-category',
        name: 'product-category',
        component: () => import('@/views/pms/ProductCategory.vue'),
        meta: { title: '商品类型', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    redirect: '/permission/user-list',
    meta: { title: '权限管理', icon: 'icon', noCache: true },
    component: Layout,
    children: [
      {
        path: 'meun-list',
        component: () => import('@/views/permission/MenuList.vue'),
        name: 'meun-list',
        meta: { title: '菜单列表', icon: 'icon', noCache: true }
      },
      {
        path: 'user-list',
        name: 'user-list',
        component: () => import('@/views/permission/UserList.vue'),
        meta: { title: '用户列表', icon: 'icon', noCache: true }
      },
      {
        path: 'role-list',
        name: 'role-list',
        component: () => import('@/views/permission/RoleList.vue'),
        meta: { title: '角色列表', icon: 'icon', noCache: true }
      },
      {
        path: 'source-list',
        name: 'source-list',
        component: () => import('@/views/permission/SourceList.vue'),
        meta: { title: '资源列表', icon: 'icon', noCache: true }
      }
    ]
  },
  // 匹配不到的就跳到 404
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

// 重置路由（应该在切换用户时调用）
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router  解决切换用户的问题
}

// 如果只有 router.beforeEach((to) => {}) 的话会渲染不出来的
router.beforeEach(async (to, from, next) => {
  // const loginStore = store.state.login
  // console.log(store)
  // console.log(to.path)
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
        // next({ path: `/login?redirect=${to.path}` })
        try {
          // 什么时候会抛出错误呢？（√）

          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const roles = await store.dispatch('login/getUserInfo')

          // console.log('准备动态添加路由啦', roles)
          // 把这个角色拥有的路由权限加上去
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )

          // 动态添加路由
          router.addRoutes(accessRoutes)
          // console.log(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // console.log('捕获到错误', error)
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    } else {
      // 把目前想要去的路径存在 url 到时候再取出来

      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    next()
  }
})

export default router
