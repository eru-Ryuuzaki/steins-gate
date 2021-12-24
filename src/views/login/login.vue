<template>
  <div class="login">
    <el-card class="box-card" shadow="hover">
      <h1 class="title">命运石之门</h1>
      <el-form :model="accountForm" :rules="rules" ref="accountForm">
        <el-row>
          <el-form-item prop="name">
            <el-input
              v-model="accountForm.name"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="pwd">
            <el-input
              type="password"
              v-model="accountForm.pwd"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-row>

        <!-- 待完善 -->
        <div class="account-control">
          <el-checkbox>记住密码</el-checkbox>
          <el-link type="primary">忘记密码</el-link>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLoginClick('accountForm')"
            >立即登录</el-button
          >
          <!-- <el-button type="primary">申请账号</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { rules } from './config/accout-config'

export default {
  name: 'Login',
  data() {
    return {
      // 表单数据
      accountForm: {
        name: '',
        pwd: ''
      },
      rules: rules
    }
  },
  methods: {
    handleLoginClick(formName) {
      // 获取 formName 对象并调用方法进行验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('点击登录')
          this.$post({
            url: 'mall-admin/admin/login',
            data: {
              username: this.accountForm.name,
              password: this.accountForm.pwd
            }
          }).then((res) => {
            console.log(res)
            // 这里判断一下支不支持 localStrorage 好点。有时间再做
            // 保存登录信息
            localStorage.setItem('token', res.token)
            localStorage.setItem('refreshToken', res.refreshToken)
            localStorage.setItem('tokenHead', res.tokenHead)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.jpg') center no-repeat;
  background-size: cover;

  .box-card {
    height: 300px;
    width: 330px;
    margin-bottom: 100px;
  }
  .title {
    color: rgba(64, 158, 255);
    margin: -10px 10px 20px 10px;
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
