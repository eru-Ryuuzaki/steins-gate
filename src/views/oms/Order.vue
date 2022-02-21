<template>
  <div>
    <FilterSearch @search="handleOrderSearch">
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
            v-for="(item, index) in omsState.formItemContent.orderStatus"
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
            v-for="(item, index) in omsState.formItemContent.orderTypes"
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
            v-for="(item, index) in omsState.formItemContent.sourceTypes"
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
            <el-button size="small">查看订单</el-button>
            <el-button
              v-if="scope.row.status === '已关闭'"
              size="small"
              type="danger"
              @click="open(scope.row.id)"
            >
              删除订单
            </el-button>
            <el-button
              v-else-if="scope.row.status === '待发货'"
              size="small"
              @click="orderDelivery(scope.row.id)"
            >
              订单发货
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
      @pageSizeChange="getOrderList"
      @pageNumChange="getOrderList"
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
  </div>
</template>

<script>
import FilterSearch from '../../components/FilterSearch'
import SearchItem from '../../components/FilterSearch/SearchItem.vue'
import BatchAndPaging from '../../components/BatchAndPaging'

import { objectToQuery } from '../../utils/utils'

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
      orderTrack: [
        { title: '订单已提交，等待付款', time: '2017-04-01 12:00:00' },
        { title: '订单付款成功', time: '2017-04-01 12:00:00' },
        {
          title: '在北京市进行下级地点扫描，等待付款',
          time: '2017-04-01 12:00:00'
        },
        {
          title: '在分拨中心广东深圳公司进行卸车扫描，等待付款',
          time: '2017-04-01 12:00:00'
        },
        {
          title: '到达目的地网点广东深圳公司，快件将很快进行派送',
          time: '2017-04-01 12:00:00'
        },
        { title: '订单已签收，期待再次为您服务', time: '2017-04-01 12:00:00' }
      ],
      isVisible: false,
      orderDeliveryList: {}
    }
  },
  created() {
    this.getOrderList()
  },
  computed: {
    omsState() {
      return this.$store.state.oms
    },
    formParams() {
      return this.$store.state.oms.formParams
    }
  },
  methods: {
    async getOrderList() {
      const { list, pageSize, pageNum, total, totalPage } = await this.$get({
        url: `/mall-admin/order/list?${objectToQuery(this.omsState.formParams)}`
      })
      this.orderList = list
      this.formParams.pageSize = pageSize
      this.formParams.pageNum = pageNum
      this.omsState.total = total
      this.omsState.totalPage = totalPage
      this.handleOrderList()
    },
    handleOrderSearch() {
      this.getOrderList()
      this.$store.commit('oms/RESET_SEARCH')
    },
    handleBatchOperation(operation) {
      console.log(operation)
    },
    handleOrderList() {
      this.orderList.forEach((item) => {
        if (item.payType === 0) {
          item.payType = '未支付'
        } else if (item.payType === 1) {
          item.payType = '支付宝'
        } else if (item.payType === 2) {
          item.payType = '微信'
        }
        if (item.sourceType === 0) {
          item.sourceType = 'PC订单'
        } else if (item.sourceType === 1) {
          item.sourceType = 'app订单'
        }
        if (item.status === 0) {
          item.status = '待付款'
        } else if (item.status === 1) {
          item.status = '待发货'
        } else if (item.status === 2) {
          item.status = '已发货'
        } else if (item.status === 3) {
          item.status = '已完成'
        } else if (item.status === 4) {
          item.status = '已关闭'
        } else if (item.status === 5) {
          item.status = '无效订单'
        }
        item.createTime = item.createTime.replace('T', ' ')
      })
    },
    open(id) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const index = this.selectOrder.indexOf(id)
          if (index !== -1) {
            this.selectOrder.splice(index, 1)
          }
          this.deleteOrder([id])
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除订单'
          })
        })
    },
    handleSelectionChange(val) {
      this.selectOrder = []
      val.forEach((item) => {
        this.selectOrder.push(item.id)
      })
      console.log(this.selectOrder)
    },
    deleteOrder(orders) {},
    closeOrder() {},
    orderDelivery(id) {
      const {
        orderSn,
        receiverName,
        receiverPhone,
        receiverPostCode,
        receiverProvince,
        receiverCity,
        receiverRegion,
        deliveryCompany,
        deliverySn
      } = this.orderList.filter((item) => item.id === id)[0]
      this.orderDeliveryList.orderSn = orderSn
      this.orderDeliveryList.receiverName = receiverName
      console.log(
        orderSn,
        receiverName,
        receiverPhone,
        receiverPostCode,
        receiverProvince,
        receiverCity,
        receiverRegion,
        deliveryCompany,
        deliverySn
      )
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
