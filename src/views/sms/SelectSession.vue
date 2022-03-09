<template>
  <div>123</div>
</template>

<script>
export default {
  name: 'SelectSession',
  data() {
    return {
      flashPromotionId: this.$route.query.flashPromotionId
    }
  },
  created() {
    console.log(this.flashPromotionId)
  }
}
</script>

<style scoped></style>
