import axios from 'axios'
import { BASE_URL, TIME_OUT } from './config'
import { Message } from 'element-ui'
import store from '../store/index'
import router from '../router/index'
import { Loading } from 'element-ui'

// 创建基本请求
function createHttp(options) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
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

    config.headers.token = store.state.token || sessionStorage.getItem('token')

    Loading.service({
      lock: true,
      text: '加载中......',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    return config
  })

  // 这一块还有挺多没弄懂的
  // res / errer 与 resolve / reject 的关系

  // 处理返回信息, 应该是配合 validateStatus 使用的
  instance.interceptors.response.use(
    (res) => {
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        // 因为是单例模式，所以这样就行了，虽然感觉不太好，但是暂时没想到别的方法
        // 或者直接弄个实例挂在 vue 上？
        Loading.service().close()
      })
      const code = res.data.code
      if (code === 200) {
        // return Promise.resolve(res.data || {})
        // 到时候返回的时候回封装成 promise 对象
        return res.data || {}
      } else if (code === 401) {
        Message({
          message: '身份过期，请重新登录',
          type: 'error',
          duration: 1000
        })
        // 保留最后停留的页面
        store.state.lastRoute = router.currentRoute ? router.currentRoute : null
        router.push('/login')
        // .then(() => {
        //   return Promise.reject(res)
        // })
      } else if (code === 403) {
        Message({
          message: '没有权限',
          type: 'error',
          duration: 1000
        })
      } else {
        Message({
          message: '未知错误',
          type: 'error',
          duration: 1000
        })
      }
    },
    (error) => {
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        Loading.service().close()
      })
      // 调试用：打印响应失败原因
      console.log(error.response.message)
      // error 这里到时候返回的不是 promise 对象，所以 要加这个
      // 该返回的数据则是axios.catch(err)中接收的数据
      return Promise.reject(error)
    }
  )
  return instance(options)
}

const post = (options) => createHttp(Object.assign(options, { method: 'POST' }))
const get = (options) => createHttp(Object.assign(options, { method: 'GET' }))
const put = (options) => createHttp(Object.assign(options, { method: 'PUT' }))
const del = (options) =>
  createHttp(Object.assign(options, { method: 'DELETE' }))

export default {
  install(Vue) {
    Vue.prototype.$post = post
    Vue.prototype.$get = get
    Vue.prototype.$put = put
    Vue.prototype.$del = del
  }
}
