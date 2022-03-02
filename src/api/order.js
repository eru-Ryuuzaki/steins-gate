import { get, del, put, post } from '../service/request'

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
      contentType: 'application/json',
      deliveryParamList: orders
    })
  )
}

function orderDetail(orderId) {
  return Promise.resolve(
    get({
      url: `/mall-admin/order/${orderId}`,
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function getReturnApplyOrderList(query) {
  return Promise.resolve(
    get({
      url: `/mall-admin/returnApply/list?${query}`
    })
  )
}

function deleteReturnApplyOrder(ids) {
  return Promise.resolve(
    del({
      url: `/mall-admin/returnApply?ids=${ids}`
    })
  )
}

function getReturnApplyOrderDetail(id) {
  return Promise.resolve(
    get({
      url: `/mall-admin/returnApply/${id}`
    })
  )
}

function updateApplyStatus(id, statusParam) {
  return Promise.resolve(
    put({
      url: `/mall-admin/returnApply/status/${id}`,
      contentType: 'application/json',
      statusParam
    })
  )
}

function getReturnReasonOrderList(query) {
  return Promise.resolve(
    get({
      url: `/mall-admin/returnReason/list?${query}`
    })
  )
}

function setReturnReason(returnReason) {
  return Promise.resolve(
    post({
      url: '/mall-admin/returnReason',
      contentType: 'application/json',
      data: {
        returnReason
      }
    })
  )
}

export {
  getOrderList,
  deleteOrder,
  closeOrder,
  deliverOrder,
  orderDetail,
  getReturnApplyOrderList,
  deleteReturnApplyOrder,
  getReturnApplyOrderDetail,
  updateApplyStatus,
  getReturnReasonOrderList,
  setReturnReason
}
