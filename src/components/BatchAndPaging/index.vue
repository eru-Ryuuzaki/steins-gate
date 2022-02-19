<template>
  <el-row>
    <el-card class="box-card" shadow="never">
      <el-row>
        <el-col :span="14">
          <el-select v-model="operation" clearable placeholder="批量操作">
            <el-option
              v-for="(item, index) in operationTypes"
              :key="index"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="handleBatchOperation"
            >确定</el-button
          >
        </el-col>
        <el-col :span="10">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="curState.total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      operation: '',
      operationTypes: [],
      currentPage: 1,
      pageSize: 5
    }
  },
  mounted() {
    this.operationTypes = this.curState.operationTypes
    this.currentPage = this.curState.formParams.pageNum
    this.pageSize = this.curState.formParams.pageSize
  },
  computed: {
    curState() {
      return this.$store.state[this.$route.path.split('/')[1]]
    }
  },
  methods: {
    handleBatchOperation() {
      this.$emit('batchOperation', this.operation)
    },
    handleSizeChange(pageSize) {
      this.curState.formParams.pageSize = pageSize
      this.$emit('pageSizeChange')
    },
    handleCurrentChange(curPage) {
      this.curState.formParams.pageNum = curPage
      this.$emit('pageNumChange')
    }
  }
}
</script>

<style scoped>
.el-card {
  border: none;
  padding-left: -20px;
}
.el-button {
  margin-left: 10px;
}
</style>
