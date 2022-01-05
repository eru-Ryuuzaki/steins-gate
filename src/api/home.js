import { get } from '../service/request'

export function getHomeInfo() {
  return Promise.resolve(
    get({
      url: '/mall-admin/menu/treeList'
    })
  )
}
