<template>
  <div>
    <FilterSearch @search="handleOrderSearch" @reset="handleOrderReset">
      <SearchItem :title="'输入搜索: '">
        <el-input placeholder="服务单号" v-model="formParams.id" clearable>
        </el-input>
      </SearchItem>
      <SearchItem :title="'处理状态: '">
        <el-select v-model="formParams.status" clearable placeholder="全部">
          <el-option
            v-for="(
              item, index
            ) in returnApplyFormItemContent.returnApplyStatus"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </SearchItem>
      <SearchItem :title="'申请时间: '">
        <el-date-picker
          v-model="formParams.createTime"
          type="date"
          placeholder="请选择时间"
        >
        </el-date-picker>
      </SearchItem>
      <SearchItem :title="'操作人员: '">
        <el-input placeholder="全部" v-model="formParams.handleMan" clearable>
        </el-input>
      </SearchItem>
      <SearchItem :title="'处理时间: '">
        <el-date-picker
          v-model="formParams.handleTime"
          type="date"
          placeholder="请选择时间"
        >
        </el-date-picker>
      </SearchItem>
    </FilterSearch>
    <el-card class="box-card"><i class="el-icon-tickets"></i>数据列表</el-card>
    <div class="box-table">
      <el-table
        :data="orderList"
        border
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="服务单号"
          width="172"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间"
          width="158"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          width="158"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="returnAmount"
          label="退款金额"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="handleTime"
          label="处理时间"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button
              size="small"
              @click="handleReturnApplyDetail(scope.row.id)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <BatchAndPaging
      @batchOperation="handleBatchOperation"
      @pageSizeChange="handlePageSizeChange"
      @pageNumChange="handlePageNumChange"
      :total="total"
      :operations="['批量删除']"
    />
  </div>
</template>

<script>
import FilterSearch from '../../components/FilterSearch'
import SearchItem from '../../components/FilterSearch/SearchItem.vue'
import BatchAndPaging from '../../components/BatchAndPaging'

import { returnApplyFormItemContent, returnApply } from './data/data-handle'
import {
  getReturnApplyOrderList,
  deleteReturnApplyOrder
} from '../../api/order'
import { objectToQuery } from '../../utils/utils'

export default {
  name: 'ReturnApply',
  data() {
    return {
      orderList: [],
      formParams: {
        id: '',
        receiverKeyword: '',
        createTime: '',
        status: '',
        handleMan: '',
        handleTime: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      totalPage: 0,
      returnApplyFormItemContent,
      selectOrder: []
    }
  },
  components: {
    FilterSearch,
    SearchItem,
    BatchAndPaging
  },
  created() {
    this.getReturnApplyOrderListData()
  },
  methods: {
    async getReturnApplyOrderListData() {
      const query = objectToQuery(this.formParams)
      const { list, pageSize, pageNum, total, totalPage } =
        await getReturnApplyOrderList(query)
      this.orderList = list
      this.formParams.pageSize = pageSize
      this.formParams.pageNum = pageNum
      this.total = total
      this.totalPage = totalPage
      returnApply.handleOrderList(this.orderList)
    },
    handleOrderSearch() {
      this.getReturnApplyOrderListData()
    },
    handleOrderReset() {
      Object.keys(this.formParams).forEach((key) => {
        if (key !== 'pageNum' && key !== 'pageSize') {
          this.formParams[key] = ''
        }
      })
    },
    handleSelectionChange(val) {
      this.selectOrder = []
      val.forEach((item) => {
        this.selectOrder.push(item.id)
      })
    },
    handleBatchOperation(operation) {
      if (operation === 0) {
        if (!this.selectOrder.length) {
          this.$message({
            type: 'warning',
            message: '请选择要操作的订单'
          })
        } else {
          this.$confirm('是否要进行删除操作??', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              await deleteReturnApplyOrder(this.selectOrder)
              await this.getReturnApplyOrderListData()
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除操作'
              })
            })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要操作的申请'
        })
      }
    },
    handlePageSizeChange(pageSize) {
      this.formParams.pageSize = pageSize
      this.getReturnApplyOrderListData()
    },
    handlePageNumChange(pageNum) {
      this.formParams.pageNum = pageNum
      this.getReturnApplyOrderListData()
    },
    handleReturnApplyDetail(id) {
      this.$router.push({
        path: 'returnApplyDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.box-card,
.box-table {
  margin: 20px;
}
.box-card {
  i {
    margin-right: 10px;
  }
}
</style>
