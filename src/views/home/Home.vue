<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '55px' : '180px'">
      <el-row>
        <el-col>
          <el-menu
            default-active="home"
            unique-opened
            background-color="#304156"
            active-text-color="#409eff"
            text-color="#ffff"
            :collapse="isCollapse"
            :collapse-transition="true"
          >
            <!-- 首页 -->
            <el-menu-item
              index="home"
              style="background-color: #304156 !important"
            >
              <i class="el-icon-s-home"></i>
              首页
            </el-menu-item>
            <!-- 商品 -->
            <el-submenu index="product">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>商品列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>添加商品
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>商品分类
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>商品类型
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>品牌管理
              </el-menu-item>
            </el-submenu>
            <!-- 订单 -->
            <el-submenu index="order">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>订单列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>订单设置
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>退货申请处理
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>退货原因设置
              </el-menu-item>
            </el-submenu>
            <!-- 营销 -->
            <el-submenu index="marketing">
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span>营销</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>秒杀活动列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>优惠劵列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>品牌推荐
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>新品推荐
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>人气推荐
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>专题推荐
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>广告列表
              </el-menu-item>
            </el-submenu>
            <!-- 权限 -->
            <el-submenu index="jurisdiction">
              <template slot="title">
                <i class="el-icon-question"></i>
                <span>权限</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>用户列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>角色列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>菜单列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-s-home"></i>资源列表
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <!-- 顶栏 -->
      <el-header height="50px">
        <i
          :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          @click="fold"
        ></i>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="user">
          <img src="../../assets/img/timg.jpg" alt="" />
          <i class="el-icon-caret-bottom"></i>
        </div>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <div class="main-container">
          <el-row :gutter="20" class="pro-info">
            <el-col :span="6" v-for="(item, index) in proInfo" :key="index">
              <el-card class="pro-card" shadow="never">
                <div slot="header" class="pro-title">
                  <span>{{ item.title }}</span>
                </div>
                <div class="pro-content">{{ item.content }}</div>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="sell-info">
            <el-col :span="6" v-for="(item, index) in sellInfo" :key="index">
              <el-card class="sell-card" shadow="never">
                <el-col :span="8" class="sell-icon">
                  <i :class="'iconfont ' + item.icon"></i>
                </el-col>
                <el-col :span="16" class="sell-data">
                  <el-row class="sell-title">{{ item.title }}</el-row>
                  <el-row class="sell-content">{{ item.content }}</el-row>
                </el-col>
              </el-card>
            </el-col>
          </el-row>
          <div class="img-card"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getHomeInfo } from '../../api/home'

export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false,
      homeInfo: {},
      proInfo: [
        { title: '后台项目', content: 'mall' },
        { title: '前端项目', content: 'mall-admin-web' },
        { title: '学习教程', content: 'mall-learning' }
      ],
      sellInfo: [
        { title: '今日订单总数', content: 200, icon: 'icon-wodedingdan' },
        {
          title: '今日销售总额',
          content: '￥5000.00',
          icon: 'icon-dangrixiaoshoue'
        },
        {
          title: '昨日销售总额',
          content: '￥5000.00',
          icon: 'icon-icon-xiaoshoue'
        }
      ]
    }
  },
  created() {
    getHomeInfo().then((res) => {
      this.homeInfo = res
    })
    console.log(this.homeInfo)
  },
  methods: {
    fold() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  .el-aside {
    height: 100vh;
    background-color: #304156;
  }
}

.el-menu {
  border-right: none;
}

.el-submenu {
  i {
    font-size: 25px;
    padding-right: 15px;
  }
  span {
    font-size: 14px;
  }
}

.el-menu-item {
  background-color: #1f2d3d !important;
  font-size: 14px;
  i {
    font-size: 25px;
    padding-right: 10px;
  }
}

.el-header {
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  i {
    font-size: 30px;
    line-height: 50px;
    margin-right: 20px;
  }
  .el-breadcrumb {
    line-height: 50px;
    font-size: 14px;
  }
  .user {
    position: absolute;
    height: 50px;
    right: 20px;
    padding: 5px 0;
    img {
      height: 40px;
      border-radius: 20%;
    }
    i {
      font-size: 14px;
    }
  }
}

.main-container {
  margin: 40px 120px 0;
  padding: 20px;
  position: relative;
  .pro-info {
    margin-bottom: 15px;
    .pro-card {
      .pro-title {
        color: #606266;
        font-weight: 600;
      }
      .pro-content {
        color: #409eff;
        font-size: 18px;
      }
    }
  }
  .sell-info {
    .sell-card {
      padding-bottom: 20px;
      .sell-icon {
        i {
          font-size: 60px;
          color: #409eff;
        }
      }
      .sell-data {
        .sell-title {
          padding: 10px 5px;
          font-size: 16px;
          color: #909399;
        }
        .sell-content {
          padding-left: 5px;
          font-size: 18px;
          color: #606266;
        }
      }
    }
  }
  .img-card {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 240px;
    height: 240px;
    background: url('../../assets/img/liyuzhanyyds.jpg') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
