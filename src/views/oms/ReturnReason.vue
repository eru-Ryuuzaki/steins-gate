<template>
  <div>
    <el-card class="box-card">
      <i class="el-icon-tickets"></i>数据列表
      <el-button size="mini" style="float: right" @click="addReturnReason">
        添加
      </el-button>
    </el-card>
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
          width="79"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="79"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="原因类型"
          width="338"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="92"
          align="center"
        ></el-table-column>
        <el-table-column label="是否可用" width="328" align="center">
          <template v-slot="scope">
            <el-switch v-model="scope.row.status"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <el-button size="small"> 编辑 </el-button>
          <el-button size="small"> 删除 </el-button>
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
    <el-dialog
      title="添加退货原因"
      :visible.sync="addReturnReasonVisible"
      width="30%"
    >
      <span>
        <el-form ref="form" :model="returnReasonData" label-width="120px">
          <el-form-item label="原因类型：">
            <el-input v-model="returnReasonData.name"></el-input>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="returnReasonData.sort"></el-input>
          </el-form-item>
          <el-form-item label="是否启用：">
            <el-switch v-model="returnReasonData.status"> </el-switch>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addReturnReasonVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddReturnReason"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BatchAndPaging from '../../components/BatchAndPaging'

import { getReturnReasonOrderList, setReturnReason } from '../../api/order'
import { objectToQuery, formatTime } from '../../utils/utils'
// import {returnApplyFormItemContent} from "./data/data-handle";

export default {
  name: 'ReturnReason',
  components: {
    BatchAndPaging
  },
  data() {
    return {
      orderList: [],
      formParams: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      totalPage: 0,
      selectOrder: [],
      addReturnReasonVisible: false,
      returnReasonData: {
        createTime: '',
        id: 0,
        name: '',
        sort: 0,
        status: true
      }
    }
  },
  created() {
    this.getReturnReasonOrderListData()
  },
  methods: {
    async getReturnReasonOrderListData() {
      const query = objectToQuery(this.formParams)
      const { list, pageSize, pageNum, total, totalPage } =
        await getReturnReasonOrderList(query)
      this.orderList = list
      this.formParams.pageSize = pageSize
      this.formParams.pageNum = pageNum
      this.total = total
      this.totalPage = totalPage
    },
    handleSelectionChange(val) {
      this.selectOrder = []
      val.forEach((item) => {
        this.selectOrder.push(item.id)
      })
    },
    handleBatchOperation(operation) {},
    handlePageSizeChange(pageSize) {
      this.formParams.pageSize = pageSize
      this.getReturnReasonOrderListData()
    },
    handlePageNumChange(pageNum) {
      this.formParams.pageNum = pageNum
      this.getReturnReasonOrderListData()
    },
    addReturnReason() {
      this.addReturnReasonVisible = true
    },
    async handleAddReturnReason() {
      const date = new Date()
      this.returnReasonData.createTime = formatTime(date)
      this.returnReasonData.status = this.returnReasonData.status ? 1 : 0
      this.returnReasonData.id = this.total * this.totalPage + 1
      await setReturnReason(this.returnReasonData)
      this.returnReasonDataReset(this.returnReasonData)
      this.addReturnReasonVisible = false
      await this.getReturnReasonOrderListData()
    },
    returnReasonDataReset(data) {
      Object.keys(data).forEach((key) => {
        if (key === 'sort') {
          data[key] = 0
        } else if (key === 'status') {
          data[key] = true
        } else {
          data[key] = ''
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
