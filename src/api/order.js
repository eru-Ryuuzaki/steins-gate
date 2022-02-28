import { get, del, put } from '../service/request'

function getOrderList(query) {
  return Promise.resolve(
    get({
      url: `/mall-admin/order/list?${query}`
    })
  )
}

function deleteOrder(ids) {
  return Promise.resolve(
    del({
      url: `/mall-admin/order?ids=${ids}`
    })
  )
}

function closeOrder(ids, note) {
  return Promise.resolve(
    put({
      url: `/mall-admin/order/close?ids=${ids}&note=${note}`
    })
  )
}

function deliverOrder(orders) {
  return Promise.resolve(
    put({
      url: '/mall-admin/order/delivery',
      deliveryParamList: orders
    })
  )
  // return Promise.resolve(
  //   put({
  //     url: '/mall-admin/order/delivery',
  //     data: {
  //       deliveryParamList: orders
  //     }
  //   })
  // )
}

function orderDetail(id) {
  return Promise.resolve(
    get({
      url: `/mall-admin/order/${id}`
    })
  )
}

export { getOrderList, deleteOrder, closeOrder, deliverOrder, orderDetail }
