<template>
  <div>
    <FilterSearch @search="handleFlashSearch" @reset="handleFlashReset">
      <SearchItem :title="'活动名称：'">
        <el-input placeholder="活动名称" v-model="formParams.keyword" clearable>
        </el-input>
      </SearchItem>
    </FilterSearch>
    <el-card class="box-card">
      <i class="el-icon-tickets"></i>数据列表
      <div style="float: right">
        <el-button size="mini" @click="handleFlashSession">
          秒杀时间段列表
        </el-button>
        <el-button size="mini" @click="handleAddFlash"> 添加活动 </el-button>
      </div>
    </el-card>
    <div class="box-table">
      <el-table
        :data="flashList"
        border
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
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
          prop="title"
          label="活动标题"
          width="340"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="活动状态"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="startDate"
          label="开始时间"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="endDate"
          label="结束时间"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="上线/下线"
          width="120"
          align="center"
        >
          <template v-slot="scope">
            <el-switch v-model="scope.row.statusBoolean"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button size="mini" @click="setProduct(scope.row.id)"
              >设置商品</el-button
            >
            <el-button size="mini" @click="handleEditFlash(scope.row)">
              编辑
            </el-button>
            <el-button size="mini" @click="handleDeleteFlash(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <BatchAndPaging
      @pageSizeChange="handlePageSizeChange"
      @pageNumChange="handlePageNumChange"
      :total="total"
    />
    <el-dialog title="添加活动" :visible.sync="flashVisible" width="40%">
      <el-form ref="form" :model="flashPromotion" label-width="128px">
        <el-form-item label="活动标题：">
          <el-input
            style="width: 300px"
            v-model="flashPromotion.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
            v-model="flashPromotion.startDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="flashPromotion.endDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线：">
          <el-radio-group v-model="flashPromotion.status">
            <el-radio :label="0">上线</el-radio>
            <el-radio :label="1">下线</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flashVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFlash">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FilterSearch from '../../components/FilterSearch'
import SearchItem from '../../components/FilterSearch/SearchItem.vue'
import BatchAndPaging from '../../components/BatchAndPaging'

import { getFlashList, addFlash, editFlash, deleteFlash } from '../../api/flash'
import { flash } from './data/data-handle'

export default {
  name: 'Flash',
  components: {
    FilterSearch,
    SearchItem,
    BatchAndPaging
  },
  data() {
    return {
      flashList: [],
      formParams: {
        keyword: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      totalPage: 0,
      isAdd: true,
      curId: 0,
      flashVisible: false,
      flashPromotion: {
        title: '',
        startDate: '',
        endDate: '',
        status: 1
      }
    }
  },
  created() {
    this.getFlashListData()
  },
  methods: {
    async getFlashListData() {
      const { list, pageSize, pageNum, total, totalPage } = await getFlashList(
        this.formParams
      )
      this.flashList = list
      this.formParams.pageSize = pageSize
      this.formParams.pageNum = pageNum
      this.total = total
      this.totalPage = totalPage
      flash.handleFlashList(this.flashList)
      console.log(this.flashList)
    },
    handleFlashSearch() {
      this.getFlashListData()
    },
    handleFlashReset() {
      this.formParams.keyword = ''
    },
    handlePageSizeChange(pageSize) {
      this.formParams.pageSize = pageSize
      this.getFlashListData()
    },
    handlePageNumChange(pageNum) {
      this.formParams.pageNum = pageNum
      this.getFlashListData()
    },
    async handleFlash() {
      if (this.isAdd) {
        await addFlash(this.flashPromotion)
      } else {
        await editFlash(this.curId, this.flashPromotion)
      }
      this.flashVisible = false
      await this.getFlashListData()
    },
    handleAddFlash() {
      this.flashVisible = true
      this.isAdd = true
      this.resetFlashPromotion()
    },
    handleEditFlash(flashRow) {
      this.flashVisible = true
      this.isAdd = false
      this.flashPromotion.title = flashRow.title
      this.flashPromotion.startDate = flash.dateStringToDate(flashRow.startDate)
      this.flashPromotion.endDate = flash.dateStringToDate(flashRow.endDate)
      this.flashPromotion.status = flashRow.status === '未开始' ? 1 : 0
      this.curId = flashRow.id
    },
    async handleDeleteFlash(id) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteFlash(id)
          await this.getFlashListData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
        })
    },
    resetFlashPromotion() {
      Object.keys(this.flashPromotion).forEach((key) => {
        if (key !== 'status') {
          this.flashPromotion[key] = ''
        } else {
          this.flashPromotion[key] = 1
        }
      })
    },
    handleFlashSession() {
      this.$router.push('flashSession')
    },
    setProduct(id) {
      this.$router.push(`selectSession?flashPromotionId=${id}`)
    }
  }
}
</script>

<style scoped lang="less">
.box-card,
.box-table {
  margin: 20px;
}
</style>
