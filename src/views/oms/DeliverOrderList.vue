<template>
  <div>
    <el-card class="box-card"><i class="el-icon-tickets"></i>数据列表</el-card>
    <div class="box-table">
      <el-table
        :data="orders"
        border
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="id"
          label="订单编号"
          width="179"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="receiverName"
          label="收货人"
          width="179"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="receiverPhone"
          label="手机号码"
          width="159"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="receiverPostCode"
          label="邮政编码"
          width="159"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="收货地址"
          width="272"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="accessoryMode"
          label="配送方式"
          width="159"
          align="center"
        >
          <template v-slot="scope">
            <el-select
              v-model="scope.row.deliveryCompany"
              placeholder="请选择物流公司"
              size="small"
            >
              <el-option
                v-for="(item, index) in scope.row.accessoryMode"
                :key="item"
                :label="item"
                :value="index"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="deliverySn"
          label="物流单号"
          width="179"
          align="center"
        >
          <template v-slot="scope">
            <el-input v-model="scope.row.deliverySn" size="small"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="box-row">
        <el-button size="medium" @click="cancel">取消</el-button>
        <el-button size="medium" type="primary" @click="determine"
          >确定</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { deliverOrder } from '../../api/order'

export default {
  name: 'DeliverOrderList',
  data() {
    return {
      orders: []
    }
  },
  created() {
    this.orders = this.$route.query.list
    console.log(this.orders)
  },
  methods: {
    cancel() {
      this.$router.back()
    },
    determine() {
      this.$confirm('是否要进行发货操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deliver()
          this.$message({
            type: 'success',
            message: '发货成功!'
          })
          // this.$router.back()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发货'
          })
        })
    },
    deliver() {
      const orderInfo = []
      this.orders.forEach((item) => {
        const order = {
          deliveryCompany: item.deliveryCompany,
          deliverySn: item.deliverySn,
          orderId: parseInt(item.id)
        }
        orderInfo.push(order)
      })
      orderInfo[0].deliveryCompany = '中通快递'
      console.log(orderInfo)
      deliverOrder(orderInfo)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.box-card,
.box-table {
  margin: 20px;
}
.box-row {
  text-align: center;
  margin-top: 20px;
}
</style>
