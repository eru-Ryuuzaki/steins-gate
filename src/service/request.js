import axios from 'axios'
import { BASE_URL, TIME_OUT } from './config'
import { Message, Loading } from 'element-ui'
import store from '../store/index'
import router from '../router'

// 创建基本请求
function createHttp(options) {
  // 为啥没配置 withCredentials 也跨域了。还是理解错了

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
    // withCredentials: true  和 cookie 相关
  })

  // 感觉这里的没啥用，会被后面的覆盖
  // instance.defaults.headers.common.token =
  //   store.state.token || sessionStorage.getItem('token')

  // 判断的是 http 的状态码，不是请求体的状态码
  instance.defaults.validateStatus = (status) => {
    return status >= 200 && status < 300
  }

  // 处理请求信息
  instance.interceptors.request.use((config) => {
    // 这个必须配置吗？
    config.headers['Content-Type'] =
      options.contentType || 'application/json; charset=UTF-8'

    // 如果这样取的话，那存在 vuex 还有什么意义？
    const tokenHead = store.state.tokenHead || localStorage.getItem('tokenHead')
    const token = store.state.token || localStorage.getItem('token')

    config.headers.Authorization = tokenHead + token

    Loading.service({
      lock: true,
      text: '加载中......',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    console.log('请求拦截', config)
    return config
  })

  // 终于明白为啥 res 不需要用 promise 封装而 error 要了 ！！！
  // promise 源码会给你答案
  // then 在 promise 实例上
  // 好像还不算特别理解
  // 到时候去看看 axios 的 use 的 catch 那块
  // 看和佳华的聊天记录

  // 处理返回信息, 应该是配合 validateStatus 使用的
  instance.interceptors.response.use(
    async (res) => {
      // this.$nextTick(() => {
      //   // 以服务的方式调用的 Loading 需要异步关闭
      //   // 因为是单例模式，所以这样就行了，虽然感觉不太好，但是暂时没想到别的方法
      //   // 或者直接弄个实例挂在 vue 上？
      //   Loading.service().close()
      // })
      // 好像不能直接用 this.$nextTick
      setTimeout(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        Loading.service().close()
      }, 0)
      // console.log('响应拦截', res)
      const code = res.data.code
      if (code === 200) {
        // return Promise.resolve(res.data || {})
        // 到时候返回的时候回封装成 promise 对象
        return res.data.data || {}
      } else if (code === 401) {
        // 应该清空用户状态（token之类的）
        // console.log('过期信息', res)
        const refreshToken = localStorage.getItem('refreshToken')
        store.commit('login/removeUserInfo')
        if (refreshToken) {
          await store.dispatch('login/getNewToken', refreshToken)
          await store.dispatch('login/getUserInfo')
          // 刷新路由，保持原本的操作
          // 这样获取路由不知道符不符合规范
          const fullPath = window.location.pathname
          router.replace({
            path: '/redirect' + fullPath
          })
          return Promise.reject(new Error('正在刷新token'))
        }
        Message({
          message: '身份过期，请重新登录',
          type: 'error',
          duration: 1000
        })
        router.push('/login')
        return Promise.reject(res.data.code)
        // 保留最后停留的页面
        // store.state.lastRoute = router.currentRoute ? router.currentRoute : null
        // router.push('/login')
        // .then(() => {
        //   return Promise.reject(res)
        // })
      } else if (code === 403) {
        Message({
          message: '没有权限',
          type: 'error',
          duration: 1000
        })
        return Promise.reject(res)
      } else {
        Message({
          message: '未知错误',
          type: 'error',
          duration: 1000
        })
        return Promise.reject(res)
      }
    },
    (error) => {
      setTimeout(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        Loading.service().close()
      }, 0)
      // 调试用：打印响应失败原因
      // console.log('响应拦截', error)
      console.log(error.response.message)
      // error 这里到时候返回的不是 promise 对象，所以要加这个，到时候就可以 .then 了
      // 该返回的数据则是axios.catch(err)中接收的数据
      return Promise.reject(error)
    }
  )
  return instance(options)
}

export const post = (options) =>
  createHttp(Object.assign(options, { method: 'POST' }))
export const get = (options) =>
  createHttp(Object.assign(options, { method: 'GET' }))
export const put = (options) =>
  createHttp(Object.assign(options, { method: 'PUT' }))
export const del = (options) =>
  createHttp(Object.assign(options, { method: 'DELETE' }))

export default {
  install(Vue) {
    Vue.prototype.$post = post
    Vue.prototype.$get = get
    Vue.prototype.$put = put
    Vue.prototype.$del = del
  }
}
