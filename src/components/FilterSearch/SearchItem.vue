<template>
  <el-form-item :label="title" class="formItem">
    <slot></slot>
  </el-form-item>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.el-form-item__label {
  font-weight: 400;
}
.el-select .el-input__inner {
  padding-right: 30px;
}
</style>
