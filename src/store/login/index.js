import { getUserInfo } from '@/api/login'
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
      localStorage.setItem('token', res.token)
      localStorage.setItem('refreshToken', res.refreshToken)
      localStorage.setItem('tokenHead', res.tokenHead)
    },

    setUserInfo(state, res) {
      state.menus = res.menus
      state.icon = res.icon
      state.username = res.username
      state.roles = res.roles

      // 存对象 先序列化
      localStorage.setItem('menus', JSON.stringify(res.menus))
      localStorage.setItem('icon', res.icon)
      localStorage.setItem('username', res.username)
      localStorage.setItem('roles', JSON.stringify(res.roles))
    },

    // 待补充
    removeUserInfo() {}
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

      return getUserInfo().then((res) => {
        commit('setUserInfo', res)
      })
    }
  },
  getters: {
    roles: (state) => state.roles
  },
  namespaced: true
}
