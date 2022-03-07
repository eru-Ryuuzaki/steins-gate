<template>
  <div>
    <FilterSearch @search="handleBrandSearch">
      <SearchItem :title="'输入搜索: '">
        <el-input placeholder="账号/姓名" v-model="keyword" clearable>
        </el-input>
      </SearchItem>
    </FilterSearch>
    <el-card class="box-card"><i class="el-icon-tickets"></i>数据列表</el-card>
    <BatchAndPaging
      @pageSizeChange="getUserList"
      @pageNumChange="getUserList"
      :total="userTotal"
      :operations="[]"
    />
  </div>
</template>

<script>
import FilterSearch from '../../components/FilterSearch'
import SearchItem from '../../components/FilterSearch/SearchItem.vue'
import BatchAndPaging from '../../components/BatchAndPaging'
export default {
  components: {
    FilterSearch,
    SearchItem,
    BatchAndPaging
  },
  data() {
    return {
      keyword: '',
      userList: [],
      userTotal: 0
    }
  },
  methods: {
    getUserList() {}
  }
}
</script>

<style lang="less" scoped>
.box-card,
.box-table {
  margin: 20px;
}
.box-card {
  i {
    margin-right: 10px;
  }
}
</style>
