<template>
  <div>
    <FilterSearch @search="handleBrandSearch">
      <SearchItem :title="'输入搜索: '">
        <el-input
          placeholder="品牌名称/关键词"
          v-model="brandCondition.keyword"
          clearable
        >
        </el-input>
      </SearchItem>
    </FilterSearch>

    <el-card class="box-card"><i class="el-icon-tickets"></i>数据列表</el-card>
    <div class="box-table">
      <el-table
        :data="brandList"
        border
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="品牌名称"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="firstLetter"
          label="品牌首字母"
          width="178"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column label="品牌制造商" width="120" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.factoryStatus"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="120" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.showStatus"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="sourceType"
          label="相关"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              商品：{{ scope.row.productCount }} 评价：{{
                scope.row.productCommentCount
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template v-slot="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">
              删除{{ scope.row.id }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <BatchAndPaging
      @batchOperation="handleBatchOperation"
      @pageSizeChange="getBrandList"
      @pageNumChange="getBrandList"
    />
  </div>
</template>

<script>
import FilterSearch from '../../components/FilterSearch'
import SearchItem from '../../components/FilterSearch/SearchItem.vue'
import BatchAndPaging from '../../components/BatchAndPaging'

import { objectToQuery } from '../../utils/utils'

export default {
  components: {
    FilterSearch,
    SearchItem,
    BatchAndPaging
  },
  data() {
    return {
      brandList: [],
      selectOrder: [],
      isVisible: false,
      orderDeliveryList: {},
      brandCondition: {
        keyword: null,
        pageNum: 1,
        pageSize: 5
      },
      brandTotal: null,
      brandTotalPage: null
    }
  },
  created() {
    this.getBrandList()
  },
  computed: {
    omsState() {
      return this.$store.state.oms
    },
    formParams() {
      return this.$store.state.oms.formParams
    }
  },
  methods: {
    async getBrandList() {
      const { list, pageSize, pageNum, total, totalPage } = await this.$get({
        url: `/mall-admin/brand/list?${objectToQuery(this.brandCondition)}`
      }).then((res) => {
        console.log(res)
        return res
      })

      this.brandList = list
      this.brandCondition.pageSize = pageSize
      this.brandCondition.pageNum = pageNum
      this.brandTotal = total
      this.brandTotalPage = totalPage
    },
    handleBrandSearch() {
      this.getBrandList()
      this.$store.commit('oms/RESET_SEARCH')
    },
    handleBatchOperation(operation) {
      console.log(operation)
    },

    handleSelectionChange(val) {
      this.selectOrder = []
      val.forEach((item) => {
        this.selectOrder.push(item.id)
      })
      console.log(this.selectOrder)
    },
    deleteOrder(orders) {},
    closeOrder() {},
    orderDelivery(id) {
      const { orderSn, receiverName } = this.brandList.filter(
        (item) => item.id === id
      )[0]
      this.orderDeliveryList.orderSn = orderSn
      this.orderDeliveryList.receiverName = receiverName
    }
  }
}
</script>

<style scoped lang="less"></style>
