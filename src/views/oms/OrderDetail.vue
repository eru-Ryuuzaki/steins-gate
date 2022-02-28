<template>
  <div>123</div>
</template>

<script>
// import { orderDetail } from '../../api/order'

export default {
  name: 'OrderDetail',
  data() {
    return {
      id: 0
    }
  },
  created() {
    console.log(this.$route.query)
  }
}
</script>

<style scoped></style>
