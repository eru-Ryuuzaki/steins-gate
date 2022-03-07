<template>
  <div>
    <FilterSearch @search="handleOrderSearch" @reset="handleOrderReset">
      <SearchItem :title="'输入搜索: '">
        <el-input placeholder="订单编号" v-model="formParams.orderSn" clearable>
        </el-input>
      </SearchItem>
      <SearchItem :title="'收货人: '">
        <el-input
          placeholder="收货人姓名/手机号码"
          v-model="formParams.receiverKeyword"
          clearable
        >
        </el-input>
      </SearchItem>
      <SearchItem :title="'提交时间: '">
        <el-date-picker
          v-model="formParams.createTime"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </SearchItem>
      <SearchItem :title="'订单分类: '">
        <el-select v-model="formParams.status" clearable placeholder="全部">
          <el-option
            v-for="(item, index) in orderFormItemContent.orderStatus"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </SearchItem>
      <SearchItem :title="'订单来源: '">
        <el-select v-model="formParams.orderType" clearable placeholder="全部">
          <el-option
            v-for="(item, index) in orderFormItemContent.orderTypes"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
      </SearchItem>
      <SearchItem :title="'订单状态: '">
        <el-select v-model="formParams.sourceType" clearable placeholder="全部">
          <el-option
            v-for="(item, index) in orderFormItemContent.sourceTypes"
            :key="index"
            :label="item"
            :value="index"
          >
          </el-option>
        </el-select>
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
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          width="178"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="payAmount"
          label="订单金额"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="payType"
          label="支付方式"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sourceType"
          label="订单来源"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column prop="status" label="操作" align="center" width="200">
          <template v-slot="scope">
            <el-button size="small" @click="handleOrderDetail(scope.row.id)"
              >查看订单</el-button
            >
            <el-button
              v-if="scope.row.status === '已关闭'"
              size="small"
              type="danger"
              @click="open([scope.row.id])"
            >
              删除订单
            </el-button>
            <el-button
              v-else-if="scope.row.status === '待发货'"
              size="small"
              @click="orderDelivery([scope.row])"
            >
              订单发货
            </el-button>
            <el-button
              v-else-if="scope.row.status === '待付款'"
              size="small"
              @click="handleCloseSingleOrder([scope.row.id])"
            >
              关闭订单
            </el-button>
            <el-button v-else size="small" @click="isVisible = true">
              订单跟踪
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <BatchAndPaging
      @batchOperation="handleBatchOperation"
      @pageSizeChange="handlePageSizeChange"
      @pageNumChange="handlePageNumChange"
      :total="total"
      :operations="orderOperationTypes"
    />
    <el-dialog
      title="订单跟踪"
      :visible="isVisible"
      width="30%"
      @close="isVisible = false"
    >
      <span>
        <div style="height: 300px" v-show="true">
          <el-steps
            direction="vertical"
            :active="5"
            align-center
            finish-status="success"
          >
            <el-step
              v-for="(item, index) in orderTrack"
              :title="item.title"
              :description="item.time"
              :key="index"
            ></el-step>
          </el-steps>
        </div>
      </span>
    </el-dialog>
    <el-dialog title="关闭订单" :visible.sync="closeOrderVisible">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="note"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderDialog(selectOrder)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FilterSearch from '../../components/FilterSearch'
import SearchItem from '../../components/FilterSearch/SearchItem.vue'
import BatchAndPaging from '../../components/BatchAndPaging'

import { objectToQuery } from '../../utils/utils'
import { getOrderList, deleteOrder, closeOrder } from '../../api/order'
import {
  orderTrack,
  orderFormItemContent,
  orderOperationTypes,
  order
} from './data/data-handle'

export default {
  name: 'Order',
  components: {
    FilterSearch,
    SearchItem,
    BatchAndPaging
  },
  data() {
    return {
      orderList: [],
      selectOrder: [],
      orderTrack,
      isVisible: false,
      orderDeliveryList: {},
      formParams: {
        orderSn: '',
        receiverKeyword: '',
        createTime: '',
        status: '',
        orderType: '',
        sourceType: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      totalPage: 0,
      orderFormItemContent,
      orderOperationTypes,
      note: '',
      closeOrderVisible: false,
      waitToDeliver: []
    }
  },
  created() {
    this.getOrderListData()
  },
  computed: {},
  methods: {
    async getOrderListData() {
      const query = objectToQuery(this.formParams)
      const { list, pageSize, pageNum, total, totalPage } = await getOrderList(
        query
      )
      this.orderList = list
      this.formParams.pageSize = pageSize
      this.formParams.pageNum = pageNum
      this.total = total
      this.totalPage = totalPage
      order.handleOrderList(this.orderList)
      console.log(this.orderList)
    },
    handleOrderSearch() {
      console.log(this.formParams)
      this.getOrderListData()
    },
    handleOrderReset() {
      Object.keys(this.formParams).forEach((key) => {
        if (key !== 'pageNum' && key !== 'pageSize') {
          this.formParams[key] = ''
        }
      })
    },
    handleBatchOperation(operation) {
      if (operation === 0) {
        this.waitToDeliver = []
        this.selectOrder.forEach((id) => {
          this.orderList.forEach((item) => {
            if (item.status === '待发货' && item.id === id) {
              this.waitToDeliver.push(item)
            }
          })
        })
        this.waitToDeliver = order.handleWaitToDeliver(this.waitToDeliver)
        if (this.selectOrder.length === 0) {
          this.warnMessage()
        } else if (this.waitToDeliver.length === 0) {
          this.$message({
            type: 'warning',
            message: '选中订单中没有可以发货的订单'
          })
        } else {
          this.$router.push({
            path: 'deliverOrderList',
            query: {
              list: this.waitToDeliver
            }
          })
        }
      } else if (operation === 1) {
        if (!this.selectOrder.length) {
          this.warnMessage()
        } else {
          this.closeOrderVisible = true
        }
      } else if (operation === 2) {
        // console.log(this.selectOrder)
        if (!this.selectOrder.length) {
          this.warnMessage()
        } else {
          this.open(this.selectOrder)
        }
      } else {
        this.warnMessage()
      }
    },
    handlePageSizeChange(pageSize) {
      this.formParams.pageSize = pageSize
      this.getOrderListData()
    },
    handlePageNumChange(pageNum) {
      this.formParams.pageNum = pageNum
      this.getOrderListData()
    },
    open(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(ids)
          await deleteOrder(ids)
          await this.getOrderListData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
        })
    },
    handleSelectionChange(val) {
      this.selectOrder = []
      val.forEach((item) => {
        this.selectOrder.push(item.id)
      })
    },
    orderDelivery(orderItem) {
      orderItem = order.handleWaitToDeliver(orderItem)
      this.$router.push({
        path: 'deliverOrderList',
        query: {
          list: orderItem
        }
      })
    },
    async handleCloseOrderDialog(ids) {
      await closeOrder(ids, this.note)
      this.closeOrderVisible = false
      await this.getOrderListData()
    },
    handleCloseSingleOrder(id) {
      this.closeOrderVisible = true
      this.handleCloseOrderDialog(id)
    },
    handleOrderDetail(id) {
      this.$router.push({
        path: 'OrderDetail',
        query: { id }
      })
    },
    warnMessage() {
      this.$message({
        type: 'warning',
        message: '请选择要操作的订单'
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
