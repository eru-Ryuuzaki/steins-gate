import { get, post, put, del } from '../service/request'

function getFlashList(query) {
  return Promise.resolve(
    get({
      url: '/mall-admin/flash/list',
      params: query,
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function addFlash(flashPromotion) {
  return Promise.resolve(
    post({
      url: '/mall-admin/flash',
      data: flashPromotion,
      contentType: 'application/json'
    })
  )
}

function editFlash(id, flashPromotion) {
  return Promise.resolve(
    put({
      url: `/mall-admin/flash/${id}`,
      data: flashPromotion,
      contentType: 'application/json'
    })
  )
}

function deleteFlash(id) {
  return Promise.resolve(
    del({
      url: `/mall-admin/flash/${id}`,
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function getFlashSession() {
  return Promise.resolve(
    get({
      url: '/mall-admin/flashSession/list',
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function addFlashSession(promotionSession) {
  return Promise.resolve(
    post({
      url: '/mall-admin/flashSession',
      data: promotionSession,
      contentType: 'application/json'
    })
  )
}

function editFlashSession(id, promotionSession) {
  return Promise.resolve(
    put({
      url: `/mall-admin/flashSession/${id}`,
      data: promotionSession,
      contentType: 'application/json'
    })
  )
}

function deleteFlashSession(id) {
  return Promise.resolve(
    del({
      url: `/mall-admin/flashSession/${id}`,
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

function updateFlashSessionStatus(id, status) {
  return Promise.resolve(
    put({
      url: `/mall-admin/flashSession/status/${id}`,
      params: {
        status
      },
      contentType: 'application/x-www-form-urlencoded'
    })
  )
}

export {
  getFlashList,
  addFlash,
  editFlash,
  deleteFlash,
  getFlashSession,
  addFlashSession,
  editFlashSession,
  deleteFlashSession,
  updateFlashSessionStatus
}
