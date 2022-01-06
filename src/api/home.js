import { get } from '../service/request'

export function getHomeInfo() {
  return Promise.resolve(
    get({
      url: '/mall-admin/menu/treeList'
    })
  )
}

const proInfo = [
  { title: '后台项目', content: 'mall' },
  { title: '前端项目', content: 'mall-admin-web' },
  { title: '学习教程', content: 'mall-learning' }
]

const sellInfo = [
  { title: '今日订单总数', content: 200, icon: 'icon-wodedingdan' },
  {
    title: '今日销售总额',
    content: '￥5000.00',
    icon: 'icon-dangrixiaoshoue'
  },
  {
    title: '昨日销售总额',
    content: '￥5000.00',
    icon: 'icon-icon-xiaoshoue'
  }
]

const affairInfo = [
  [
    { title: '待付款订单', number: 10 },
    { title: '已完成订单', number: 10 },
    { title: '待确认收货订单', number: 10 }
  ],
  [
    { title: '待发货订单', number: 10 },
    { title: '新缺货登记', number: 10 },
    { title: '待处理退款申请', number: 10 }
  ],
  [
    { title: '已发货订单', number: 10 },
    { title: '待处理退货订单', number: 10 },
    { title: '广告位即将到期', number: 10 }
  ]
]

const goodsAndUserInfo = [
  {
    title: '商品总览',
    style: ['goods-user-content-item1', 'goods-user-content-item2'],
    content: [
      [10, 40, 50, 500],
      ['已下架', '已上架', '库存紧张', '全部商品']
    ]
  },
  {
    title: '用户总览',
    style: ['goods-user-content-item1', 'goods-user-content-item2'],
    content: [
      [100, 200, 1000, 5000],
      ['今日新增', '昨日新增', '本月新增', '会员总数']
    ]
  }
]

export { proInfo, sellInfo, affairInfo, goodsAndUserInfo }
