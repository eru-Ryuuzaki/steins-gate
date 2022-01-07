import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  // 递归检查 meta 里面的信息看看是否有这个路由权限
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export default {
  state: {
    routes: [],
    addrouters: []
  },
  mutations: {
    // 灵异事件
    // setRouters(state, routes) {
    //   state.addrouters = routes,
    //   state.routes = constantRoutes.concat(routes)
    // },
    setRouters(state, routes) {
      state.addrouters = routes
      state.routes = constantRoutes.concat(routes)
    }
  },

  // 进行异步操作
  actions: {
    generateRoutes({ commit, state }, roles) {
      return new Promise((resolve) => {
        let accessedRoutes
        if (roles.includes('超级管理员')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('setRouters', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  },
  getters: {},
  namespaced: true
}
