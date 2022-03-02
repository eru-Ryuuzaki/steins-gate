// 物流信息
const orderTrack = [
  { title: '订单已提交，等待付款', time: '2017-04-01 12:00:00' },
  { title: '订单付款成功', time: '2017-04-01 12:00:00' },
  {
    title: '在北京市进行下级地点扫描，等待付款',
    time: '2017-04-01 12:00:00'
  },
  {
    title: '在分拨中心广东深圳公司进行卸车扫描，等待付款',
    time: '2017-04-01 12:00:00'
  },
  {
    title: '到达目的地网点广东深圳公司，快件将很快进行派送',
    time: '2017-04-01 12:00:00'
  },
  { title: '订单已签收，期待再次为您服务', time: '2017-04-01 12:00:00' }
]

// 订单列表表单项可选的内容
const orderFormItemContent = {
  orderStatus: ['待付款', '待发货', '已发货', '已完成', '已关闭'],
  orderTypes: ['正常订单', '秒杀订单'],
  sourceTypes: ['PC订单', 'app订单']
}

// 退货申请表单项可选的内容
const returnApplyFormItemContent = {
  returnApplyStatus: ['待处理', '退货中', '已完成', '已拒绝']
}

// 订单列表批量操作的内容
const orderOperationTypes = ['批量发货', '关闭订单', '删除订单']

// 待发货订单数据
class WaitToDeliverOrder {
  constructor(
    id,
    receiverName,
    receiverPhone,
    receiverPostCode,
    receiverProvince,
    receiverCity,
    receiverRegion,
    receiverDetailAddress,
    deliverySn
  ) {
    this.id = id
    this.receiverName = receiverName
    this.receiverPhone = receiverPhone
    this.receiverPostCode = receiverPostCode
    this.address =
      receiverProvince + receiverCity + receiverRegion + receiverDetailAddress
    this.deliverySn = deliverySn
    this.accessoryMode = ['顺丰快递', '圆通快递', '中通快递', '韵达快递']
    this.deliveryCompany = ''
  }
}

// Order 组件中数据的处理
class Order {
  // 订单列表数据处理
  handleOrderList(orderList) {
    const payType = ['未支付', '支付宝', '微信']
    const sourceType = ['PC订单', 'app订单']
    const status = [
      '待付款',
      '待发货',
      '已发货',
      '已完成',
      '已关闭',
      '无效订单'
    ]
    orderList.forEach((item) => {
      item.payType = payType[item.payType]
      item.sourceType = sourceType[item.sourceType]
      item.status = status[item.status]
      item.createTime = item.createTime.replace('T', ' ')
    })
  }

  // 处理待发货的订单数据
  handleWaitToDeliver(list) {
    const orderListInfo = []
    list.forEach((item) => {
      const {
        id,
        receiverName,
        receiverPhone,
        receiverPostCode,
        receiverProvince,
        receiverCity,
        receiverRegion,
        receiverDetailAddress,
        deliverySn
      } = item
      const order = new WaitToDeliverOrder(
        id,
        receiverName,
        receiverPhone,
        receiverPostCode,
        receiverProvince,
        receiverCity,
        receiverRegion,
        receiverDetailAddress,
        deliverySn
      )
      orderListInfo.push(order)
    })
    return orderListInfo
  }
}

// ReturnApply 组件中数据的处理
class ReturnApply {
  // 订单列表数据处理
  handleOrderList(orderList) {
    const status = ['待处理', '退货中', '已完成', '已拒绝']
    orderList.forEach((item) => {
      item.status = status[item.status]
      item.createTime = item.createTime.replace('T', ' ')
      if (!item.handleTime) {
        item.handleTime = 'N/A'
      } else {
        item.handleTime = item.handleTime.replace('T', ' ')
      }
      if (!item.returnAmount) item.returnAmount = 'N/A'
    })
  }

  // 退货订单详情处理
  handleReturnApplyOrder(order) {
    Object.keys(order).forEach((key) => {
      if (key === 'companyAddress') {
        if (order[key]) {
          order.address =
            order.companyAddress.province +
            order.companyAddress.city +
            order.companyAddress.region
        }
      }
      if (order[key] === null) {
        order[key] = 'N/A'
      }
      if (key === 'proofPics') {
        order[key] = order[key].split(',')
      }
    })
    order.handleTime = order.handleTime.replace('T', ' ')
    order.receiveTime = order.receiveTime.replace('T', ' ')
  }
}

const order = new Order()
const returnApply = new ReturnApply()

export {
  orderTrack,
  orderFormItemContent,
  orderOperationTypes,
  order,
  returnApply,
  returnApplyFormItemContent
}
