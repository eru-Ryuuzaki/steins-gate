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
              @input="getLocalPWD(accountForm.name)"
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
          <el-checkbox v-model="rememberPWD">记住密码</el-checkbox>
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
import router from '../../router'
import { debounce } from '../../utils/debounce'
// import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      // 表单数据
      accountForm: {
        name: '',
        pwd: ''
      },
      rules: rules,

      redirect: undefined, // 需要重定向的路径
      otherQuery: undefined,

      rememberPWD: true // 是否需要记住密码
    }
  },
  // 第一次用
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      // 需要在最初绑定值的时候也执行函数，则就需要用到immediate属性
      immediate: true
    }
  },
  methods: {
    // ...mapMutations(['login/setLoginInfo']),
    handleLoginClick(formName) {
      // 获取 formName 对象并调用方法进行验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post({
            url: 'mall-admin/admin/login',
            data: {
              username: this.accountForm.name,
              password: this.accountForm.pwd
            }
          })
            .then(async (res) => {
              // 记住密码
              if (this.rememberPWD) {
                this.savaPassWord(this.accountForm.name, this.accountForm.pwd)
              }
              this.$store.commit('login/setLoginInfo', res)
              // return this.$store.dispatch('login/getUserInfo')
            })
            .then(() => {
              // router.push('/home')
              router.push({
                path: this.redirect || '/home',
                query: this.otherQuery
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 记住密码
    savaPassWord(name, pwd) {
      // 有空弄一下加密
      let obj = JSON.parse(localStorage.getItem('account_pwd'))

      if (!obj) {
        obj = {}
      }

      obj[name] = pwd

      localStorage.setItem('account_pwd', JSON.stringify(obj))
    },

    // 如果输入的账号设置了记住密码，那么输入账号后就自动输入密码
    getLocalPWD: debounce(function (value) {
      console.log(value)
      const obj = JSON.parse(localStorage.getItem('account_pwd'))
      if (obj && obj[value]) {
        this.accountForm.pwd = obj[value]
      } else {
        this.accountForm.pwd = null
      }
    }),

    // 获取其他参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
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
