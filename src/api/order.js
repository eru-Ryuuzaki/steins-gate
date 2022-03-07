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
      url: '/mall-admin/order',
      params: {
        ids: ids.toString()
      },
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function closeOrder(ids, note) {
  return Promise.resolve(
    put({
      url: `/mall-admin/order/close?ids=${ids.toString()}&note=${note}`
    })
  )
}

function deliverOrder(deliveryParamList) {
  return Promise.resolve(
    put({
      url: '/mall-admin/order/delivery',
      contentType: 'application/json',
      data: deliveryParamList
    })
  )
}

function orderDetail(id) {
  return Promise.resolve(
    get({
      url: `/mall-admin/order/${id}`,
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
      url: `/mall-admin/returnApply?ids=${ids.toString()}`
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
      data: statusParam
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
      data: returnReason
    })
  )
}

function updateReturnStatus(query) {
  return Promise.resolve(
    put({
      url: `/mall-admin/returnReason/status?${query}`,
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function updateReturnReason(id, returnReason) {
  return Promise.resolve(
    put({
      url: `/mall-admin/returnReason/${id}`,
      contentType: 'application/json',
      data: returnReason
    })
  )
}

function getSingleReturnReason(id) {
  return Promise.resolve(
    get({
      url: `/mall-admin/returnReason/${id}`,
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function deleteReturnReason(ids) {
  return Promise.resolve(
    del({
      url: `/mall-admin/returnReason?ids=${ids.toString()}`,
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function updateReceiverInfo(receiverInfoParam) {
  return Promise.resolve(
    put({
      url: '/mall-admin/order/receiverInfo',
      contentType: 'application/json',
      data: receiverInfoParam
    })
  )
}

function updateMoneyInfo(moneyInfoParam) {
  return Promise.resolve(
    put({
      url: '/mall-admin/order/moneyInfo',
      contentType: 'application/json',
      data: moneyInfoParam
    })
  )
}

function remarksOrderInfo(query) {
  return Promise.resolve(
    put({
      url: '/mall-admin/order/note',
      contentType: 'application/x-www-form-urlencoded',
      params: query
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
  setReturnReason,
  updateReturnReason,
  updateReturnStatus,
  getSingleReturnReason,
  deleteReturnReason,
  updateReceiverInfo,
  updateMoneyInfo,
  remarksOrderInfo
}
