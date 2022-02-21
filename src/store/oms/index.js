export default {
  state: {
    // 订单列表搜索需要的参数
    formParams: {
      orderSn: '',
      receiverKeyword: '',
      createTime: '',
      status: '',
      orderType: '',
      sourceType: '',
      pageNum: 1,
      pageSize: 10
    },
    // 订单列表表单项可选的内容
    formItemContent: {
      orderStatus: ['待付款', '待发货', '已发货', '已完成', '已关闭'],
      orderTypes: ['正常订单', '秒杀订单'],
      sourceTypes: ['PC订单', 'app订单']
    },
    // 订单列表批量操作的内容
    operationTypes: ['批量发货', '关闭订单', '删除订单'],
    total: 100,
    totalPage: 100
  },
  mutations: {
    // 重置表单搜索
    RESET_SEARCH(state) {
      Object.keys(state.formParams).forEach((key) => {
        if (key !== 'pageNum' && key !== 'pageSize') {
          state.formParams[key] = ''
        }
      })
    }
  },
  namespaced: true
}
