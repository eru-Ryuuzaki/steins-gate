import { getUserInfo, getNewToken } from '@/api/login'
export default {
  // 这样写就能不用写 return 了是这个意思吧
  state: () => ({
    token: null,
    refreshToken: null,
    tokenHead: null,

    roleId: null,

    menus: [],
    icon: '', // 这里应该是默认头像
    username: '该用户未设置昵称',
    roles: []
  }),
  mutations: {
    setLoginInfo(state, res) {
      state.token = res.token
      state.refreshToken = res.refreshToken
      state.tokenHead = res.tokenHead
      // 这里判断一下支不支持 localStrorage 好点。有时间再做
      // 有时间做一下加密
      localStorage.setItem('token', res.token)
      localStorage.setItem('refreshToken', res.refreshToken)
      localStorage.setItem('tokenHead', res.tokenHead)
    },

    setUserInfo(state, res) {
      state.menus = res.menus
      state.icon = res.icon
      state.username = res.username
      state.roles = res.roles

      // 存对象 先序列化(不存本地了)
      // localStorage.setItem('menus', JSON.stringify(res.menus))
      // localStorage.setItem('icon', res.icon)
      // localStorage.setItem('username', res.username)
      // localStorage.setItem('roles', JSON.stringify(res.roles))
    },

    // 无感刷新token
    resetToken(state, res) {
      state.token = state.refreshToken || localStorage.getItem('refreshToken')
      localStorage.setItem(
        'token',
        state.refreshToken || localStorage.getItem('refreshToken')
      )
      localStorage.removeItem('refreshToken')
      console.log('清空 refreshToken')
    },

    // 清空用户信息
    removeUserInfo(state) {
      state.token = null
      state.refreshToken = null
      state.tokenHead = null
      state.menus = null
      state.icon = null
      state.username = null
      state.roles = null
      localStorage.removeItem('token')
      localStorage.removeItem('tokenHead')
      localStorage.removeItem('refreshToken')
    }
  },

  // 进行异步操作
  actions: {
    // 获取角色信息
    getUserInfo({ commit, state }) {
      // 比较两者区别

      // get({
      //   url: '/mall-admin/admin/info'
      // })
      // .then((res) => {
      //   console.log(res)
      //   commit('setUserInfo', res)
      //   return res
      // })

      // return getUserInfo().then((res) => {
      //   commit('setUserInfo', res)
      //   resolve(res.roles)
      // })

      // 要调用 resolve 的话要先 new Promise
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          // console.log('执行到这里了', res)
          commit('setUserInfo', res)
          // console.log('拿到信息了')
          resolve(res.roles)
        })
      })
    },

    getNewToken({ commit, state }, refreshToken) {
      return new Promise((resolve, reject) => {
        getNewToken(refreshToken).then(
          (res) => {
            console.log('获取新的token信息：', res)
            commit('setLoginInfo', res)
            resolve()
          },
          (err) => {
            // refreshtoken 也不能用的情况
            commit('removeUserInfo')
            console.log(err)
          }
        )
      })
    }
  },
  getters: {
    roles: (state) => state.roles
  },
  namespaced: true
}
