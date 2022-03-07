<template>
  <div>
    <div v-if="!id">
      <el-card class="box-card">
        <el-row style="font-size: 16px; color: #303133; margin-bottom: 10px"
          >暂无数据</el-row
        >
      </el-card>
    </div>
    <div v-else>
      <el-card class="box-card">
        <el-row style="font-size: 16px; color: #303133; margin-bottom: 10px"
          >退货商品</el-row
        >
        <el-row>
          <el-table
            :data="[orderDetail]"
            border
            style="width: 100%"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column
              prop="productPic"
              label="商品图片"
              width="159"
              align="center"
            >
              <template v-slot="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.productPic"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="productName"
              label="商品名称"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column label="价格/货号" width="169" align="center">
              <template v-slot="scope">
                <div>价格：{{ scope.row.productPrice }}</div>
                <div>货号：NO.{{ scope.row.productId }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="productAttr"
              label="属性"
              width="179"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="productCount"
              label="数量"
              width="99"
              align="center"
            ></el-table-column>
            <el-table-column label="小计" width="99" align="center">
              <template v-slot="scope">
                <span>{{
                  scope.row.productPrice * scope.row.productCount
                }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="margin-top: 10px; font-size: 16px; text-align: right">
          <div>
            合计：
            <span style="color: #f56c6c">
              ￥{{ orderDetail.productPrice * orderDetail.productCount }}
            </span>
          </div>
        </el-row>
      </el-card>
      <el-card class="box-card">
        <el-row style="font-size: 16px; color: #303133; margin-bottom: 10px"
          >服务单信息</el-row
        >
        <div class="warp-div">
          <el-row>
            <el-form ref="form" :model="orderDetail" label-width="80px">
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">服务单号</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.id }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">申请状态</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.status }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">订单编号</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.orderSn }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">申请时间</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.createTime }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">用户账号</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.memberUsername }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">联系人</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.returnName }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">联系电话</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.returnPhone }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">退货原因</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.reason }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">问题描述</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.description }}</div>
                </el-col>
              </el-row>
              <el-row class="row-image">
                <el-col :span="6" class="col col-bottom">
                  <div class="title">凭证图片</div>
                </el-col>
                <el-col :span="18" class="col col-right col-bottom">
                  <div class="data">
                    <el-image
                      v-for="(item, index) in orderDetail.proofPics"
                      :key="index"
                      style="width: 80px; height: 80px"
                      :src="item"
                    ></el-image>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>

        <div class="warp-div" v-if="orderDetail.status !== 3">
          <el-row>
            <el-form ref="form" :model="orderDetail" label-width="80px">
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">订单金额</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.returnAmount }}</div>
                </el-col>
              </el-row>
              <el-row class="row-input">
                <el-col :span="6" class="col">
                  <div class="title">确认退款金额</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <el-input
                    v-model="statusParam.refundAmount"
                    placeholder="请输入金额"
                    style="width: 200px; margin-left: 10px"
                    size="small"
                    :disabled="orderDetail.status !== 0"
                  ></el-input>
                </el-col>
              </el-row>
              <el-row class="row-input">
                <el-col :span="6" class="col">
                  <div class="title">选择收货点</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <el-select
                    v-model="orderDetail.companyAddress.addressName"
                    placeholder="请选择收货地点"
                    size="small"
                    style="margin-left: 10px"
                    :disabled="orderDetail.status !== 0"
                  >
                    <el-option
                      v-for="(item, index) in [
                        '深圳发货点',
                        '北京发货点',
                        '南京发货点'
                      ]"
                      :key="index"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">收货人姓名</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">{{ orderDetail.receiveMan }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">所在区域</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">
                    {{ orderDetail.address ? orderDetail.address : 'N/A' }}
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col">
                  <div class="title">详细地址</div>
                </el-col>
                <el-col :span="18" class="col col-right">
                  <div class="data">
                    {{ orderDetail.companyAddress.detailAddress }}
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" class="col col-bottom">
                  <div class="title">联系电话</div>
                </el-col>
                <el-col :span="18" class="col col-right col-bottom">
                  <div class="data">{{ orderDetail.returnPhone }}</div>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>

        <div class="warp-div" v-if="orderDetail.status === 3">
          <el-row>
            <el-col :span="6" class="col">
              <div class="title">订单金额</div>
            </el-col>
            <el-col :span="18" class="col col-right">
              <div class="data">{{ orderDetail.returnAmount }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-form ref="form" :model="orderDetail" label-width="80px">
              <el-row class="row-input">
                <el-col :span="6" class="col col-bottom">
                  <div class="title">确认退款金额</div>
                </el-col>
                <el-col :span="18" class="col col-right col-bottom">
                  <el-input
                    style="width: 200px; margin-left: 10px"
                    size="small"
                    disabled
                    value="0"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>

        <div class="warp-div" v-if="orderDetail.status !== 0">
          <el-row>
            <el-col :span="6" class="col">
              <div class="title">处理人员</div>
            </el-col>
            <el-col :span="18" class="col col-right">
              <div class="data">{{ orderDetail.handleMan }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="col">
              <div class="title">处理时间</div>
            </el-col>
            <el-col :span="18" class="col col-right">
              <div class="data">{{ orderDetail.handleTime }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="col col-bottom">
              <div class="title">处理备注</div>
            </el-col>
            <el-col :span="18" class="col col-right col-bottom">
              <div class="data">{{ orderDetail.handleNote }}</div>
            </el-col>
          </el-row>
        </div>

        <div class="warp-div" v-if="orderDetail.status === 0">
          <el-row>
            <el-form ref="form" :model="statusParam" label-width="80px">
              <el-row class="row-input">
                <el-col :span="6" class="col col-bottom">
                  <div class="title">处理备注</div>
                </el-col>
                <el-col :span="18" class="col col-right col-bottom">
                  <el-input
                    v-model="statusParam.handleNote"
                    style="width: 200px; margin-left: 10px"
                    size="small"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>

        <div class="warp-div" v-if="orderDetail.status === 1">
          <el-row>
            <el-form ref="form" :model="statusParam" label-width="80px">
              <el-row class="row-input">
                <el-col :span="6" class="col col-bottom">
                  <div class="title">收货备注</div>
                </el-col>
                <el-col :span="18" class="col col-right col-bottom">
                  <el-input
                    v-model="statusParam.receiveNote"
                    style="width: 200px; margin-left: 10px"
                    size="small"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>

        <div class="warp-div" v-if="orderDetail.status === 2">
          <el-row>
            <el-col :span="6" class="col">
              <div class="title">收货人员</div>
            </el-col>
            <el-col :span="18" class="col col-right">
              <div class="data">{{ orderDetail.receiveMan }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="col">
              <div class="title">收货时间</div>
            </el-col>
            <el-col :span="18" class="col col-right">
              <div class="data">{{ orderDetail.receiveTime }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="col col-bottom">
              <div class="title">收货备注</div>
            </el-col>
            <el-col :span="18" class="col col-right col-bottom">
              <div class="data">{{ orderDetail.receiveNote }}</div>
            </el-col>
          </el-row>
        </div>

        <div class="warp-div" style="text-align: center">
          <el-button
            type="primary"
            v-if="orderDetail.status === 0"
            @click="handleClick(1)"
            >确认退货</el-button
          >
          <el-button
            type="primary"
            v-if="orderDetail.status === 1"
            @click="handleClick(2)"
            >确认收货</el-button
          >
          <el-button
            type="danger"
            v-if="orderDetail.status === 0"
            @click="handleClick(3)"
            >拒绝退货</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getReturnApplyOrderDetail, updateApplyStatus } from '../../api/order'
import { returnApply } from './data/data-handle'

export default {
  name: 'ReturnApplyDetail',
  data() {
    return {
      id: this.$route.query.id,
      orderDetail: {},
      place: '',
      refundAmount: '',
      statusParam: {
        companyAddressId: '',
        handleNote: '',
        receiveNote: '',
        returnAmount: '',
        status: ''
      }
    }
  },
  created() {
    this.getReturnApplyOrderDetailData()
  },
  methods: {
    async getReturnApplyOrderDetailData() {
      this.orderDetail = await getReturnApplyOrderDetail(this.id)
      returnApply.handleReturnApplyOrder(this.orderDetail)
      this.statusParam.companyAddressId = this.orderDetail.companyAddressId
      this.statusParam.handleNote = this.orderDetail.handleNote
      this.statusParam.receiveNote = this.orderDetail.receiveNote
      this.statusParam.returnAmount = this.orderDetail.returnAmount
      this.statusParam.status = this.orderDetail.status
    },
    // 发送请求有问题
    async handleClick(status) {
      this.statusParam.status = status
      // console.log(this.orderDetail)
      // console.log(this.statusParam)
      // console.log(typeof this.statusParam.companyAddressId)
      this.$confirm('是否要进行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(this.id, this.statusParam)
          await updateApplyStatus(this.id, this.statusParam)
          this.$router.back()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  font-size: 14px;
  color: #606266;
  width: 968px;
  padding: 0 10px 20px;
  margin: 20px auto;
}
.el-row {
  line-height: 37px;
  .row-image {
    height: 100px;
    line-height: 100px;
  }
  .row-input {
    line-height: 50px;
  }
  .col {
    border-left: 1px solid #dcdfe6;
    border-top: 1px solid #dcdfe6;
    .title {
      background-color: #f2f6fc;
      padding-left: 10px;
    }
    .data {
      padding-left: 10px;
    }
  }
  .col-right {
    border-right: 1px solid #dcdfe6;
  }
  .col-bottom {
    border-bottom: 1px solid #dcdfe6;
  }
  .el-image {
    overflow: inherit;
  }
}
.warp-div {
  margin-bottom: 20px;
}
</style>
