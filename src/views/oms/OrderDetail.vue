<template>
  <div>123</div>
</template>

<script>
import { orderDetail } from '../../api/order'

export default {
  name: 'OrderDetail',
  data() {
    return {
      orderId: parseInt(this.$route.query.orderId),
      orderDetailInfo: {}
    }
  },
  created() {
    this.getOrderDetailInfo()
  },
  methods: {
    async getOrderDetailInfo() {
      console.log(this.orderId)
      this.orderDetailInfo = await orderDetail(this.orderId)
      console.log(this.orderDetailInfo)
    }
  }
}
</script>

<style scoped></style>
