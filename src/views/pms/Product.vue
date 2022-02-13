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
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>

      <el-row type="flex" class="data-bottom" justify="space-around">
        <el-col>
          <span>批量操作</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
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
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
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

      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
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
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addProduct() {
      console.log('addProduct')
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
