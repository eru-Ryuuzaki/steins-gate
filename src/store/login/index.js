export default {
  // 这样写就能不用写 return 了是这个意思吧
  state: () => ({
    token: null,
    refreshToken: null,
    tokenHead: null
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
    }
  },
  actions: {
    // 进行异步操作

    // 验证登录信息是否过期或者是否存在
    loginVerify() {}
  },
  getters: {},
  namespaced: true
}
