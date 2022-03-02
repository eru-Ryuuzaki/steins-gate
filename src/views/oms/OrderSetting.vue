<template>
  <div class="warp-card">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="128px">
        <el-form-item label="秒杀订单超过：">
          <el-col :span="14">
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="append">分</template>
            </el-input>
          </el-col>
          <span class="desc">未付款，订单自动关闭</span>
        </el-form-item>
        <el-form-item label="正常订单超过：">
          <el-row>
            <el-col :span="14">
              <el-input placeholder="请输入内容" v-model="input2">
                <template slot="append">分</template>
              </el-input>
            </el-col>
            <span class="desc">未付款，订单自动关闭</span>
          </el-row>
        </el-form-item>
        <el-form-item label="发货超过：">
          <el-col :span="14">
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="append">天</template>
            </el-input>
          </el-col>
          <span class="desc">未收货，订单自动完成</span>
        </el-form-item>
        <el-form-item label="订单完成超过：">
          <el-col :span="14">
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="append">天</template>
            </el-input>
          </el-col>
          <span class="desc">自动结束交易，不能申请售后</span>
        </el-form-item>
        <el-form-item label="订单完成超过：">
          <el-col :span="14">
            <el-input placeholder="请输入内容" v-model="input2">
              <template slot="append">天</template>
            </el-input>
          </el-col>
          <span class="desc">自动五星好评</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleOrderSetting">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OrderSetting',
  methods: {
    handleOrderSetting() {}
  }
}
</script>

<style scoped>
.box-card {
  width: 728px;
  height: 500px;
  padding: 35px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.desc {
  margin-left: 20px;
}
</style>
