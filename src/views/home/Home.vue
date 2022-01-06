<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu
        :default-active="activePath"
        unique-opened
        background-color="#304156"
        active-text-color="#409eff"
        text-color="#ffff"
        :collapse="isCollapse"
        :collapse-transition="true"
        router
      >
        <!-- 首页 -->
        <el-menu-item
          class="home-item"
          index="/home"
          @click="saveActivePath('/home', true)"
        >
          <i class="el-icon-s-home" v-show="!isCollapse"></i>
          <el-tooltip
            class="item"
            effect="dark"
            content="首页"
            placement="right"
            v-show="isCollapse"
          >
            <i class="el-icon-s-home"></i>
          </el-tooltip>
          <span v-show="!isCollapse">首页</span>
        </el-menu-item>
        <!-- 一级菜单 -->
        <el-submenu
          :index="item1.name"
          v-for="(item1, index1) in homeMenuInfo"
          :key="index1"
        >
          <template slot="title">
            <i :class="'el-icon-' + item1.icon"></i>
            <span>{{ item1.title }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            :index="`/${item1.name}/${item2.name}`"
            v-for="(item2, index2) in item1.children"
            :key="index2"
            @click="
              saveActivePath(
                `/${item1.name}/${item2.name}`,
                false,
                item1.title,
                item2.title
              )
            "
          >
            <i :class="'el-icon-' + item2.icon"></i>{{ item2.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 顶栏 -->
      <el-header height="50px">
        <i
          :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
          @click="fold"
          style="cursor: pointer"
        ></i>
        <el-breadcrumb>
          <div
            style="color: #97a8be; cursor: text"
            v-show="isBreadcrumbOnlyOne"
          >
            首页
          </div>
          <el-breadcrumb-item
            :to="{ path: '/home' }"
            v-show="!isBreadcrumbOnlyOne"
            >首页</el-breadcrumb-item
          >
          <!--
            跳转到一级菜单时在router中设置重定向到它的第一个二级菜单
          -->
          <el-breadcrumb-item v-show="!isBreadcrumbOnlyOne">
            <a :href="'/' + activePath.split('/')[1]">
              {{ breadcrumbTitles[0] }}
            </a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-show="!isBreadcrumbOnlyOne">
            {{ breadcrumbTitles[1] }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-popover
          placement="bottom"
          width="68"
          trigger="click"
          popper-class="popoverStyle"
        >
          <el-card class="popover-card">
            <div
              class="popover-card-con"
              slot="header"
              style="
                padding: 10px;
                text-align: center;
                background-color: #ffffff;
              "
              @click="$router.push('/home')"
            >
              首页
            </div>
            <div
              class="popover-card-con"
              style="padding: 10px; text-align: center"
              @click="$router.push('login')"
            >
              退出
            </div>
          </el-card>
          <div class="user" slot="reference">
            <img src="../../assets/img/timg.jpg" alt="" />
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-popover>
      </el-header>
      <!-- 主体内容 -->
      <el-main>
        <div class="main-container">
          <!-- 项目地址信息 -->
          <el-row :gutter="20" class="pro-info">
            <el-col :span="6" v-for="(item, index) in proInfo" :key="index">
              <el-card class="pro-card" shadow="never">
                <div slot="header" class="comm-title">
                  <span>{{ item.title }}</span>
                </div>
                <div class="pro-content">{{ item.content }}</div>
              </el-card>
            </el-col>
          </el-row>
          <!-- 销售额信息 -->
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
          <!-- 李玉站大佬的靓照 -->
          <div class="img-card"></div>
          <!-- 待处理事务 -->
          <el-card class="affair-info" shadow="never">
            <div slot="header" class="comm-title">待处理事务</div>
            <div class="affair-content">
              <el-row
                :gutter="20"
                v-for="(item1, index1) in affairInfo"
                :key="index1"
              >
                <el-col
                  :span="8"
                  class="affair-content-item"
                  v-for="(item2, index2) in item1"
                  :key="index2"
                >
                  <span class="affair-content-item-font">
                    {{ item2.title }}
                  </span>
                  <span class="affair-content-item-num">
                    ({{ item2.number }})
                  </span>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <!-- 商品和用户总览 -->
          <div class="goods-user">
            <el-card
              class="affair-info"
              shadow="never"
              v-for="(item1, index1) in goodsAndUserInfo"
              :key="index1"
            >
              <div slot="header" class="comm-title">{{ item1.title }}</div>
              <div class="goods-user-content">
                <el-row
                  :gutter="20"
                  v-for="(item2, index2) in item1.content"
                  :key="index2"
                >
                  <el-col
                    :class="item1.style[index2]"
                    :span="6"
                    v-for="(item3, index3) in item2"
                    :key="index3"
                    >{{ item3 }}</el-col
                  >
                </el-row>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  getHomeInfo,
  proInfo,
  sellInfo,
  affairInfo,
  goodsAndUserInfo
} from '../../api/home'
import { Message } from 'element-ui'

export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false, // 是否折叠
      homeMenuInfo: [], // 首页菜单数据
      activePath: '', // 当前激活的菜单路径
      breadcrumbTitles: [], // 当前激活的一级菜单和二级菜单名称
      isBreadcrumbOnlyOne: true, // 面包屑是否只有一级
      proInfo,
      sellInfo,
      affairInfo,
      goodsAndUserInfo
    }
  },
  created() {
    // 请求首页数据
    getHomeInfo().then((res) => {
      if (res) {
        this.homeMenuInfo = res
      } else {
        Message({
          message: '请求数据失败，请重新登录',
          type: 'error',
          duration: 1000
        })
        this.$router.replace('/login')
      }
    })
    // 获取缓存的菜单路径
    if (!localStorage.getItem('activePath')) {
      this.activePath = '/home'
    } else {
      this.activePath = localStorage.getItem('activePath')
    }
  },
  computed: {},
  methods: {
    // 菜单折叠
    fold() {
      this.isCollapse = !this.isCollapse
    },
    // 保存当前激活的菜单状态
    saveActivePath(path, isBreadcrumbOnlyOne, submenuTitle, menuItemTitle) {
      localStorage.setItem('activePath', path)
      this.activePath = path
      this.isBreadcrumbOnlyOne = isBreadcrumbOnlyOne
      this.breadcrumbTitles = [submenuTitle, menuItemTitle]
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  .el-aside {
    position: relative;
    height: 100%;
    background-color: #304156;
  }
}

.el-menu {
  border-right: none;
  .home-item {
    i {
      font-size: 25px;
      padding-right: 15px;
    }
    span {
      font-size: 14px;
    }
  }
}

.el-submenu {
  padding-left: 0;
  i {
    font-size: 25px;
    padding-right: 15px;
  }
  span {
    font-size: 14px;
  }
}

.el-menu-item:not(.home-item) {
  background-color: #1f2d3d !important;
  font-size: 14px;
  padding-left: 0;
  i {
    font-size: 25px;
    /*padding-right: 10px;*/
  }
}

.el-menu-item:hover:not(.home-item) {
  background-color: #001528 !important;
}

.el-header {
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  i {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.78);
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
    cursor: pointer;
    img {
      height: 40px;
      border-radius: 20%;
    }
    i {
      font-size: 12px;
      padding-left: 10px;
    }
  }
}

.main-container {
  margin: 40px 120px 0;
  padding: 20px;
  position: relative;
  .comm-title {
    color: #606266;
    font-weight: 600;
    padding: 18px 20px;
  }
  .pro-info {
    margin-bottom: 15px;
    .pro-card {
      .pro-content {
        color: #409eff;
        font-size: 18px;
        padding: 20px;
      }
    }
  }
  .sell-info {
    .sell-card {
      padding: 20px;
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
  .affair-info {
    margin-top: 20px;
    .affair-content {
      padding: 20px 40px;
      .el-row {
        display: flex;
        .affair-content-item {
          padding: 10px;
          border-bottom: 1px solid #dcdfe6;
          display: flex;
          justify-content: space-between;
          margin: 0 10px;
          .affair-content-item-font {
            font-size: 16px;
            color: #606266;
          }
          .affair-content-item-num {
            color: #f56c6c;
          }
        }
      }
    }
  }
  .goods-user {
    display: flex;
    .affair-info {
      width: 49%;
    }
    .affair-info:nth-child(1) {
      margin-right: 2%;
    }
    .goods-user-content {
      padding: 35px 40px;
      .el-row {
        padding: 5px 0;
        .goods-user-content-item1 {
          color: #f56c6c;
          font-size: 24px;
          text-align: center;
        }
        .goods-user-content-item2 {
          font-size: 16px;
          color: #606266;
          text-align: center;
        }
      }
    }
  }
}

/deep/.el-card__header,
/deep/.el-card__body {
  padding: 0;
}

/deep/.el-card__header {
  background-color: #f2f6fc;
}

.popover-card-con {
  color: #606266;
  cursor: pointer;
  outline: 0;
}

.popover-card-con:hover {
  color: #66b1ff !important;
  font-size: 14px;
}
</style>
