<template>
  <div>
    <el-card class="card">
      <el-row type="flex" class="search-top" justify="space-around">
        <el-col :span="21"><i class="el-icon-zoom-in"></i>筛选搜索</el-col>
        <el-col :span="3">
          <el-button size="medium" type="primary" @click="search">
            查询
          </el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </el-col>
      </el-row>

      <el-form :inline="true" class="demo-form-inline">
        <slot></slot>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    search() {
      this.$emit('search')
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
.card {
  margin: 20px;
}
.search-top {
  margin-bottom: 5px;
}
i {
  margin-right: 10px;
}
</style>
