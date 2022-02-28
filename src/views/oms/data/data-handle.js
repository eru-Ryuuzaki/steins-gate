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
const formItemContent = {
  orderStatus: ['待付款', '待发货', '已发货', '已完成', '已关闭'],
  orderTypes: ['正常订单', '秒杀订单'],
  sourceTypes: ['PC订单', 'app订单']
}

// 订单列表批量操作的内容
const operationTypes = ['批量发货', '关闭订单', '删除订单']

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
    orderList.forEach((item) => {
      if (item.payType === 0) {
        item.payType = '未支付'
      } else if (item.payType === 1) {
        item.payType = '支付宝'
      } else if (item.payType === 2) {
        item.payType = '微信'
      }
      if (item.sourceType === 0) {
        item.sourceType = 'PC订单'
      } else if (item.sourceType === 1) {
        item.sourceType = 'app订单'
      }
      if (item.status === 0) {
        item.status = '待付款'
      } else if (item.status === 1) {
        item.status = '待发货'
      } else if (item.status === 2) {
        item.status = '已发货'
      } else if (item.status === 3) {
        item.status = '已完成'
      } else if (item.status === 4) {
        item.status = '已关闭'
      } else if (item.status === 5) {
        item.status = '无效订单'
      }
      item.createTime = item.createTime.replace('T', ' ')
    })
  }

  // 处理待发货的订单数据
  handleWaitToDeliver(list) {
    const orderListInfo = []
    list.forEach((item) => {
      const {
        orderSn,
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
        orderSn,
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

const order = new Order()

export { orderTrack, formItemContent, operationTypes, order }
