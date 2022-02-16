import { get, post } from '../service/request'
export function getUserInfo() {
  // 用 Promise.resolve 包住和不包住的区别
  return Promise.resolve(
    get({
      url: '/mall-admin/admin/info'
    })
  )
}

export function getNewToken(refreshToken) {
  return Promise.resolve(
    post({
      url: '/mall-admin/admin/refreshToken',
      params: {
        refreshToken
      },
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}
