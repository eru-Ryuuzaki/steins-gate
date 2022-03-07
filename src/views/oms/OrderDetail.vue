<template>
  <div v-if="!id">
    <el-card class="box-card">
      <el-row style="font-size: 16px; color: #303133; margin-bottom: 10px"
        >暂无数据</el-row
      >
    </el-card>
  </div>
  <div v-else class="warp">
    <!-- 步骤条 -->
    <div class="step">
      <el-steps
        :active="(orderDetailInfo.status + 1) % 5 || 1"
        align-center
        finish-status="success"
      >
        <el-step
          title="提交订单"
          :description="orderDetailInfo.createTime"
        ></el-step>
        <el-step
          title="支付订单"
          :description="
            orderDetailInfo.status > 0 && orderDetailInfo.status < 4
              ? orderDetailInfo.paymentTime
              : ''
          "
        ></el-step>
        <el-step
          title="平台发货"
          :description="
            orderDetailInfo.status > 1 && orderDetailInfo.status < 4
              ? orderDetailInfo.deliveryTime
              : ''
          "
        ></el-step>
        <el-step
          title="确认收货"
          :description="
            orderDetailInfo.status > 2 && orderDetailInfo.status < 4
              ? orderDetailInfo.deliveryTime
              : ''
          "
        ></el-step>
        <el-step title="完成评价"></el-step>
      </el-steps>
    </div>
    <!-- 订单详情 -->
    <div class="detail">
      <el-card>
        <!-- 头部信息 -->
        <el-row class="title">
          <el-col class="order-status" :span="6">
            <i
              class="el-icon-warning"
              style="margin-right: 5px; margin-left: 20px"
            ></i>
            当前订单状态：{{ statusDesc[orderDetailInfo.status] }}
          </el-col>
          <el-col class="order-operation" :span="18">
            <div class="button-operation">
              <el-button
                size="mini"
                @click="updateReceiverVisible = true"
                v-if="orderDetailInfo.status < 2"
                >修改收货人信息</el-button
              >
              <el-button size="mini" v-if="orderDetailInfo.status === 0"
                >修改商品信息</el-button
              >
              <el-button
                size="mini"
                v-if="orderDetailInfo.status === 0"
                @click="updatePaymentVisible = true"
                >修改费用信息</el-button
              >
              <el-button
                size="mini"
                v-if="
                  orderDetailInfo.status === 2 || orderDetailInfo.status === 3
                "
                @click="orderTrackVisible = true"
                >订单跟踪</el-button
              >
              <el-button size="mini" v-if="orderDetailInfo.status < 4"
                >发送站内信</el-button
              >
              <el-button
                size="mini"
                v-if="orderDetailInfo.status === 0"
                @click="closeOrderVisible = true"
                >关闭订单</el-button
              >
              <el-button
                size="mini"
                v-if="orderDetailInfo.status === 4"
                @click="handleDeleteOrder"
                >删除订单</el-button
              >
              <el-button size="mini" @click="remarksOrderVisible = true"
                >备注订单</el-button
              >
            </div>
          </el-col>
        </el-row>
        <!-- 订单详情 -->
        <el-row class="body">
          <!-- 基本信息 -->
          <div class="item-info">
            <el-row class="item-title">基本信息</el-row>
            <el-row class="item-body">
              <el-row class="item-info-title">
                <el-col :span="4" class="item-info-title-col">订单编号</el-col>
                <el-col :span="4" class="item-info-title-col"
                  >发货单流水号</el-col
                >
                <el-col :span="4" class="item-info-title-col">用户账号</el-col>
                <el-col :span="4" class="item-info-title-col">支付方式</el-col>
                <el-col :span="4" class="item-info-title-col">订单来源</el-col>
                <el-col :span="4" class="item-info-title-col no-right-border"
                  >订单类型</el-col
                >
              </el-row>
              <el-row class="item-info-content">
                <el-col :span="4" class="item-info-content-col">
                  {{ orderDetailInfo.orderSn }}
                </el-col>
                <el-col :span="4" class="item-info-content-col">
                  {{ orderDetailInfo.couponId }}
                </el-col>
                <el-col :span="4" class="item-info-content-col">
                  {{ orderDetailInfo.memberUsername }}
                </el-col>
                <el-col :span="4" class="item-info-content-col">
                  {{ orderDetailInfo.payType }}
                </el-col>
                <el-col :span="4" class="item-info-content-col">
                  {{ orderDetailInfo.sourceType }}
                </el-col>
                <el-col :span="4" class="item-info-content-col no-right-border">
                  {{ orderDetailInfo.orderType }}
                </el-col>
              </el-row>
              <el-row class="item-info-title">
                <el-col :span="4" class="item-info-title-col">配送方式</el-col>
                <el-col :span="4" class="item-info-title-col">物流单号</el-col>
                <el-col :span="4" class="item-info-title-col"
                  >自动确认收货时间</el-col
                >
                <el-col :span="4" class="item-info-title-col"
                  >订单可得优币</el-col
                >
                <el-col :span="4" class="item-info-title-col"
                  >订单可得成长值</el-col
                >
                <el-col :span="4" class="item-info-title-col no-right-border"
                  >活动信息</el-col
                >
              </el-row>
              <el-row class="item-info-content">
                <el-col
                  :span="4"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.deliveryCompany }}
                </el-col>
                <el-col
                  :span="4"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.deliverySn }}
                </el-col>
                <el-col
                  :span="4"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.receiveTime }}
                </el-col>
                <el-col
                  :span="4"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.integration }}
                </el-col>
                <el-col
                  :span="4"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.growth }}
                </el-col>
                <el-col
                  :span="4"
                  class="item-info-content-col content-overflow no-right-border no-bottom-border"
                >
                  <el-popover
                    placement="top-start"
                    title="活动信息"
                    width="200"
                    trigger="hover"
                    :content="orderDetailInfo.promotionInfo"
                  >
                    <span slot="reference">
                      {{ orderDetailInfo.promotionInfo }}
                    </span>
                  </el-popover>
                </el-col>
              </el-row>
            </el-row>
          </div>
          <!-- 收货人信息 -->
          <div class="item-info">
            <el-row class="item-title">收货人信息</el-row>
            <el-row class="item-body">
              <el-row class="item-info-title">
                <el-col :span="6" class="item-info-title-col">收货人</el-col>
                <el-col :span="6" class="item-info-title-col">手机号码</el-col>
                <el-col :span="6" class="item-info-title-col">邮政编码</el-col>
                <el-col :span="6" class="item-info-title-col no-right-border"
                  >收货地址</el-col
                >
              </el-row>
              <el-row class="item-info-content">
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.receiverName }}
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.receiverPhone }}
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  {{ orderDetailInfo.receiverPostCode }}
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-right-border no-bottom-border"
                >
                  {{ orderDetailInfo.address }}
                </el-col>
              </el-row>
            </el-row>
          </div>
          <!-- 商品信息 -->
          <div class="item-info">
            <el-row class="item-title">商品信息</el-row>
            <el-row style="margin-top: 20px">
              <el-table
                :data="orderDetailInfo.orderItemList"
                border
                style="width: 100%"
                align="center"
              >
                <el-table-column label="商品图片" width="150" align="center">
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
                  width="350"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="价格/货号" width="120" align="center">
                  <template v-slot="scope">
                    <div>价格：￥{{ scope.row.productPrice }}</div>
                    <div>货号：{{ scope.row.productSn }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="productAttr"
                  label="属性"
                  width="120"
                  align="center"
                >
                  <template v-slot="scope">
                    <span
                      v-for="(item, index) in JSON.parse(scope.row.productAttr)"
                      :key="index"
                    >
                      {{ item.key }}:{{ item.value }};
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="productQuantity"
                  label="数量"
                  width="120"
                  align="center"
                >
                </el-table-column>
                <el-table-column label="小计" align="center">
                  <template v-slot="scope">
                    ￥{{
                      scope.row.productQuantity * scope.row.productPrice || 0
                    }}
                  </template>
                </el-table-column>
              </el-table>
              <div
                style="text-align: right; margin-top: 20px; margin-right: 20px"
              >
                合计：<span style="color: #f56c6c"
                  >￥{{ orderDetailInfo.totalAmount }}</span
                >
              </div>
            </el-row>
          </div>
          <!-- 费用信息 -->
          <div class="item-info">
            <el-row class="item-title">费用信息</el-row>
            <el-row class="item-body">
              <el-row class="item-info-title">
                <el-col :span="6" class="item-info-title-col">商品合计</el-col>
                <el-col :span="6" class="item-info-title-col">运费</el-col>
                <el-col :span="6" class="item-info-title-col">优惠券</el-col>
                <el-col :span="6" class="item-info-title-col no-right-border"
                  >积分抵扣</el-col
                >
              </el-row>
              <el-row class="item-info-content">
                <el-col :span="6" class="item-info-content-col">
                  ￥{{ orderDetailInfo.totalAmount }}
                </el-col>
                <el-col :span="6" class="item-info-content-col">
                  ￥{{ orderDetailInfo.freightAmount }}
                </el-col>
                <el-col :span="6" class="item-info-content-col">
                  -￥{{ orderDetailInfo.couponAmount }}
                </el-col>
                <el-col :span="6" class="item-info-content-col no-right-border">
                  -￥{{ orderDetailInfo.integrationAmount }}
                </el-col>
              </el-row>
              <el-row class="item-info-title">
                <el-col :span="6" class="item-info-title-col">活动优惠</el-col>
                <el-col :span="6" class="item-info-title-col">折扣金额</el-col>
                <el-col :span="6" class="item-info-title-col"
                  >订单总金额</el-col
                >
                <el-col :span="6" class="item-info-title-col no-right-border"
                  >应付款金额</el-col
                >
              </el-row>
              <el-row class="item-info-content">
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  -￥{{ orderDetailInfo.promotionAmount }}
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  -￥{{ orderDetailInfo.discountAmount }}
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  <span style="color: #f56c6c">
                    ￥{{ orderDetailInfo.totalAmount }}
                  </span>
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border no-right-border"
                >
                  <span style="color: #f56c6c">
                    ￥{{ orderDetailInfo.payAmount }}
                  </span>
                </el-col>
              </el-row>
            </el-row>
          </div>
          <!-- 操作信息 -->
          <div class="item-info">
            <el-row class="item-title">操作信息</el-row>
            <el-row style="margin-top: 20px">
              <el-table
                :data="orderDetailInfo.historyList"
                border
                style="width: 100%"
                align="center"
              >
                <el-table-column
                  prop="operateMan"
                  label="操作者"
                  width="150"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="操作时间"
                  width="200"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="orderStatus"
                  label="订单状态"
                  width="120"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="orderStatus"
                  label="付款状态"
                  width="120"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="orderStatus"
                  label="发货状态"
                  width="120"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="note" label="备注" align="center">
                </el-table-column>
              </el-table>
            </el-row>
          </div>
        </el-row>
      </el-card>
      <!-- 修改收货人信息 -->
      <el-dialog
        width="640px"
        title="修改收货人信息"
        :visible.sync="updateReceiverVisible"
      >
        <el-form ref="form" :model="receiverInfoParam" label-width="128px">
          <el-form-item label="收货人姓名：">
            <el-input
              style="width: 200px"
              v-model="receiverInfoParam.receiverName"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input
              style="width: 200px"
              v-model="receiverInfoParam.receiverPhone"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮政编码：">
            <el-input
              style="width: 200px"
              v-model="receiverInfoParam.receiverPostCode"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在区域：">
            <el-select
              v-model="receiverInfoParam.receiverProvince"
              placeholder="省"
              @change="handleProvinceChange"
              style="width: 150px; margin-right: 10px"
            >
              <el-option
                v-for="(item, index) in areaData"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="receiverInfoParam.receiverCity"
              placeholder="市"
              @change="handleCityChange"
              style="width: 150px; margin-right: 10px"
            >
              <el-option
                v-for="(item, index) in cityData"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="receiverInfoParam.receiverRegion"
              placeholder="区"
              style="width: 150px"
            >
              <el-option
                v-for="(item, index) in regionData"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址：">
            <el-input
              style="width: 470px"
              type="textarea"
              :rows="3"
              v-model="receiverInfoParam.receiverDetailAddress"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-row style="text-align: right">
          <el-button @click="updateReceiverVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateReceiver"
            >确定</el-button
          >
        </el-row>
      </el-dialog>
      <!-- 修改费用信息 -->
      <el-dialog title="修改收货人信息" :visible.sync="updatePaymentVisible">
        <el-row class="body">
          <div class="item-info">
            <el-row class="item-body">
              <el-row class="item-info-title">
                <el-col :span="6" class="item-info-title-col">商品合计</el-col>
                <el-col :span="6" class="item-info-title-col">运费</el-col>
                <el-col :span="6" class="item-info-title-col">优惠券</el-col>
                <el-col :span="6" class="item-info-title-col">积分抵扣</el-col>
              </el-row>
              <el-row class="item-info-content">
                <el-col :span="6" class="item-info-content-col">
                  {{ orderDetailInfo.totalAmount }}
                </el-col>
                <el-col :span="6" class="item-info-content-col">
                  <el-input v-model="moneyInfoParam.freightAmount" size="small">
                    <template slot="prepend">￥</template>
                  </el-input>
                </el-col>
                <el-col :span="6" class="item-info-content-col">
                  {{ orderDetailInfo.couponAmount }}
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col content-overflow no-right-border"
                >
                  {{ orderDetailInfo.integrationAmount }}
                </el-col>
              </el-row>
              <el-row class="item-info-title">
                <el-col :span="6" class="item-info-title-col">活动优惠</el-col>
                <el-col :span="6" class="item-info-title-col">折扣金额</el-col>
                <el-col :span="6" class="item-info-title-col"
                  >订单总金额</el-col
                >
                <el-col :span="6" class="item-info-title-col"
                  >应付款金额</el-col
                >
              </el-row>
              <el-row class="item-info-content">
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  -{{ orderDetailInfo.promotionAmount }}
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  <el-input
                    v-model="moneyInfoParam.discountAmount"
                    size="small"
                  >
                    <template slot="prepend">-￥</template>
                  </el-input>
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col no-bottom-border"
                >
                  <span style="color: #f56c6c">
                    ￥{{ orderDetailInfo.totalAmount }}
                  </span>
                </el-col>
                <el-col
                  :span="6"
                  class="item-info-content-col content-overflow no-right-border no-bottom-border"
                >
                  <span style="color: #f56c6c">
                    ￥{{ orderDetailInfo.payAmount }}
                  </span>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </el-row>
        <el-row style="text-align: right">
          <el-button @click="updatePaymentVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdatePayment"
            >确定</el-button
          >
        </el-row>
      </el-dialog>
      <!-- 备注订单 -->
      <el-dialog title="备注订单" :visible.sync="remarksOrderVisible">
        <el-form ref="form" :model="remarksInfoParam" label-width="128px">
          <el-form-item label="操作备注：">
            <el-input type="textarea" :rows="3" v-model="remarksInfoParam.note">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="remarksOrderVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRemarksOrder"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 订单跟踪 -->
      <el-dialog
        title="订单跟踪"
        :visible="orderTrackVisible"
        width="30%"
        @close="orderTrackVisible = false"
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
      <!-- 关闭订单 -->
      <el-dialog title="关闭订单" :visible.sync="closeOrderVisible">
        <el-form ref="form" :model="closeOrderParam" label-width="128px">
          <el-form-item label="操作备注：">
            <el-input type="textarea" :rows="3" v-model="closeOrderParam.note">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="closeOrderVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  orderDetail,
  updateMoneyInfo,
  remarksOrderInfo,
  closeOrder,
  deleteOrder,
  updateReceiverInfo
} from '../../api/order'
import { order, orderTrack } from './data/data-handle'
import { areaData } from './data/citydata'

export default {
  name: 'OrderDetail',
  data() {
    return {
      id: this.$route.query.id,
      orderDetailInfo: {},
      statusDesc: ['待付款', '待发货', '已发货', '已完成', '已关闭'],
      updateReceiverVisible: false,
      updatePaymentVisible: false,
      remarksOrderVisible: false,
      orderTrackVisible: false,
      closeOrderVisible: false,
      receiverInfoParam: {
        orderId: 0,
        receiverName: '',
        receiverPhone: '',
        receiverPostCode: '',
        receiverProvince: '',
        receiverCity: '',
        receiverRegion: '',
        receiverDetailAddress: '',
        status: 0
      },
      moneyInfoParam: {
        freightAmount: 0,
        discountAmount: 0,
        orderId: 0,
        status: 0
      },
      remarksInfoParam: {
        id: 0,
        note: '',
        status: 0
      },
      orderTrack,
      closeOrderParam: {
        ids: [],
        note: ''
      },
      areaData,
      cityData: [],
      regionData: []
    }
  },
  created() {
    if (this.id) {
      this.getOrderDetailInfo()
    }
  },
  methods: {
    async getOrderDetailInfo() {
      this.orderDetailInfo = await orderDetail(this.id)
      order.handleOrderDetail(this.orderDetailInfo)
      order.handleOrderList(this.orderDetailInfo)
      const {
        receiverName,
        receiverPhone,
        receiverPostCode,
        receiverProvince,
        receiverCity,
        receiverRegion,
        receiverDetailAddress
      } = this.orderDetailInfo
      this.receiverInfoParam.receiverName = receiverName
      this.receiverInfoParam.receiverPhone = receiverPhone
      this.receiverInfoParam.receiverPostCode = receiverPostCode
      this.receiverInfoParam.receiverProvince = receiverProvince
      this.receiverInfoParam.receiverCity = receiverCity
      this.receiverInfoParam.receiverRegion = receiverRegion
      this.receiverInfoParam.receiverDetailAddress = receiverDetailAddress
    },
    async handleUpdateReceiver() {
      this.receiverInfoParam.orderId = this.id
      this.receiverInfoParam.status = this.orderDetailInfo.status
      await updateReceiverInfo(this.receiverInfoParam)
      this.updateReceiverVisible = false
      await this.getOrderDetailInfo()
    },
    // 修改费用信息
    async handleUpdatePayment() {
      this.moneyInfoParam.orderId = this.id
      this.moneyInfoParam.status = this.orderDetailInfo.status
      await updateMoneyInfo(this.moneyInfoParam)
      this.updatePaymentVisible = false
      await this.getOrderDetailInfo()
    },
    async handleRemarksOrder() {
      this.remarksInfoParam.id = this.id
      this.remarksInfoParam.status = this.orderDetailInfo.status
      await remarksOrderInfo(this.remarksInfoParam)
      this.remarksOrderVisible = false
      await this.getOrderDetailInfo()
    },
    async handleCloseOrder() {
      this.closeOrderParam.ids = []
      this.closeOrderParam.ids.push(this.id)
      await closeOrder([this.id], this.closeOrderParam.note)
      this.closeOrderVisible = false
      await this.getOrderDetailInfo()
    },
    handleDeleteOrder() {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteOrder([this.id])
          await this.getOrderDetailInfo()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
        })
    },
    handleProvinceChange(val) {
      this.receiverInfoParam.receiverCity = ''
      this.receiverInfoParam.receiverRegion = ''
      this.cityData = []
      this.regionData = []
      let index = -1
      this.areaData.forEach((item, i) => {
        if (item.value === val) {
          index = i
        }
      })
      if (index !== -1) {
        this.cityData = this.areaData[index].children
      }
    },
    handleCityChange(val) {
      this.receiverInfoParam.receiverRegion = ''
      this.regionData = []
      let index = -1
      this.cityData.forEach((item, i) => {
        if (item.value === val) {
          index = i
        }
      })
      if (index !== -1) {
        this.regionData = this.cityData[index].children
      }
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
.warp {
  width: 1071px;
  padding: 20px;
  margin: 10px auto;
  .step {
    margin-bottom: 15px;
  }
  .detail {
    .title {
      height: 80px;
      line-height: 80px;
      margin: -20px -20px 0;
      background-color: #f2f6fc;
      .order-status {
        color: #f56c6c;
      }
      .order-operation {
        text-align: right;
        .button-operation {
          margin-right: 10px;
        }
        .button-operation:last-child {
          margin-right: 20px;
        }
      }
    }
    .body {
      .item-info {
        margin-top: 20px;
        .item-title {
          font-size: 16px;
          color: #606266;
        }
        .item-body {
          border: 1px solid #dcdfe6;
          margin-top: 20px;
          .content-overflow {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .no-right-border {
            border-right: none !important;
          }
          .no-bottom-border {
            border-bottom: none !important;
          }
          .item-info-title {
            height: 36px;
            /*padding: 10px;*/
            background: #f2f6fc;
            color: #303133;
            font-size: 14px;
            text-align: center;
            .item-info-title-col {
              padding: 10px;
              border-right: 1px solid #dcdfe6;
              border-bottom: 1px solid #dcdfe6;
            }
          }
          .item-info-content {
            height: 59px;
            line-height: 36px;
            color: #303133;
            font-size: 14px;
            text-align: center;
          }
          .item-info-content-col {
            padding: 10px;
            border-right: 1px solid #dcdfe6;
            border-bottom: 1px solid #dcdfe6;
          }
        }
      }
    }
  }
}
</style>
