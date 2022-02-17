<template>
  <div>
    <el-card class="box-card">
      <el-row type="flex" class="search-top" justify="space-around">
        <el-col>筛选搜索</el-col>
        <el-col :span="9">
          <el-button type="primary" @click="searchProduct">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <el-form :inline="true" :model="productCondition">
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-form-item label="商品搜索">
              <el-input
                v-model="productCondition.keyword"
                placeholder="输入商品名称搜索"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品货号">
              <el-input
                v-model="productCondition.productSn"
                placeholder="商品货号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品分类">
              <el-cascader
                clearable
                v-model="productCondition.productCategoryId"
                :options="productCategoryOptions"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-form-item label="商品品牌">
              <el-select
                v-model="productCondition.brandId"
                placeholder="请选择品牌"
                clearable
              >
                <el-option
                  v-for="item in productBrandOptions"
                  :key="item.brandId"
                  :label="item.brandName"
                  :value="item.brandId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="上架状态">
              <el-select
                v-model="productCondition.publishStatus"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in shelfStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select
                v-model="productCondition.verifyStatus"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in verifyStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col>数据列表</el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addProduct">添加</el-button>
        </el-col>
      </el-row>

      <el-table
        ref="multipleTable"
        :data="productList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column> -->
        <el-table-column prop="id" label="编号" width="50"> </el-table-column>
        <el-table-column label="商品图片" width="120">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              fit="contain "
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.name }}</div>
            <div>品牌：{{ scope.row.brandName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120">
          <template slot-scope="scope">
            <div>价格：{{ scope.row.price }}</div>
            <div>货号：{{ scope.row.productSn }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="verifyStatus" label="标签" width="120">
          <template slot-scope="scope">
            <div>
              上架：<el-switch v-model="scope.row.verifyStatus"> </el-switch>
            </div>
            <div>
              新品：<el-switch v-model="scope.row.newStatus"> </el-switch>
            </div>
            <div>
              推荐：<el-switch v-model="scope.row.recommendStatus"> </el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="50"> </el-table-column>
        <el-table-column prop="stock" label="SKU库存" width="90">
        </el-table-column>
        <el-table-column prop="sale" label="销量" width="80"> </el-table-column>
        <el-table-column prop="verifyStatus" label="审核状态" width="120">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template>
            <el-button size="small">查看</el-button>
            <el-button size="small">编辑</el-button>
            <el-button size="small">日志</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" class="data-bottom" justify="space-around">
        <el-col>
          <span>批量操作</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-col>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="productCondition.pageNum"
            :page-sizes="[5, 10, 15, 20, 50]"
            :page-size="productCondition.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import router from '../../router'

export default {
  data() {
    return {
      // 表单数据
      productCondition: {
        keyword: null,
        productSn: null,
        brandId: null,
        publishStatus: null,
        verifyStatus: null,
        productCategoryId: null,
        pageNum: 1,
        pageSize: 5
      },

      productCategoryOptions: [],
      productBrandOptions: [],
      shelfStatusOptions: [
        {
          value: 1,
          label: '上架中'
        },
        {
          value: 0,
          label: '已下架'
        }
      ],
      verifyStatusOptions: [
        {
          value: 0,
          label: '未审核'
        },
        {
          value: 1,
          label: '审核通过'
        }
      ],

      // 货品 table 列表
      productList: [],
      totalNum: 0,

      value: '',
      multipleSelection: []
    }
  },
  methods: {
    // 根据表单进行筛选
    searchProduct() {
      let url = '/mall-admin/product/list'
      let flag = '?'
      for (const key in this.productCondition) {
        // 这里是为了防止空数组的出现，空数组也会判断为真
        if (key === 'productCategoryId') {
          if (this.productCondition[key] && this.productCondition[key].length) {
            url += `${flag}${key}=${
              this.productCondition[key][this.productCondition[key].length - 1]
            }`
            flag = '&'
          }
        } else if (this.productCondition[key]) {
          url += `${flag}${key}=${this.productCondition[key]}`
          flag = '&'
        }
      }
      this.$get({
        url
      }).then((res) => {
        this.productList = res.list
        this.totalNum = res.total
        console.log(res)
      })
    },
    // 重置表单筛选条件
    reset() {
      const _pageNum = this.productCondition.pageNum
      const _pageSize = this.productCondition._pageSize
      // for in 因为定义了个中间变量而且没用上 eslint 会报错
      Object.keys(this.productCondition).forEach((item) => {
        this.productCondition[item] = null
      })
      this.productCondition.pageNum = _pageNum
      this.productCondition.pageSize = _pageSize
    },

    handleSizeChange(val) {
      this.productCondition.pageNum = 1
      this.searchProduct()
    },
    handleCurrentChange(val) {
      this.productCondition.pageNum = val
      this.searchProduct()
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 跳转到增加商品页面
    addProduct() {
      router.push({
        path: '/pms/add-product'
      })
    },
    onSubmit() {
      console.log('onSubmit')
    },
    // 把返回的数据转换成级联选择器的数据格式
    toCascaderData(item, id, mp) {
      if (mp.get(item.id)) {
        item.children.forEach((item2) => {
          this.toCascaderData(item2, item.id, mp)
        })
      } else if (id) {
        const tmp = mp.get(id)
        tmp.children = tmp.children || []
        tmp.children.push(item)
        mp.set(item.id, item)
      } else {
        this.productCategoryOptions.push(item)
        mp.set(item.id, item)
      }
    },
    // 给 label 和 value 赋值
    setLabelValue(data) {
      const setV = function (obj) {
        obj.forEach((item) => {
          item.label = item.name
          item.value = item.id
          if (item.children) {
            setV(item.children)
          }
        })
      }
      setV(data)
    }
  },
  created() {
    // 获取品牌列表
    this.$get({
      url: '/mall-admin/home/brand/list'
    }).then(async (res) => {
      this.productBrandOptions = res.list
    })
    // 获取分类列表
    this.$get({
      url: '/mall-admin/productCategory/list/withChildren'
    }).then(async (res) => {
      // 把返回的数据转换成级联选择器的数据格式
      const mp = new Map()
      this.productCategoryOptions = []
      res.forEach((item) => {
        this.toCascaderData(item, null, mp)
      })
      // 给 label 和 value 赋值
      this.setLabelValue(this.productCategoryOptions)
    })
    // 获取所有商品
    this.searchProduct()
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 20px;
}
.search-top {
  margin-bottom: 10px;
}
.data-bottom {
  margin-top: 10px;
}
</style>
