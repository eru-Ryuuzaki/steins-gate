import { get } from '../service/request'
export function getUserInfo() {
  return Promise.resolve(
    get({
      url: '/mall-admin/admin/info'
    })
  )
}
