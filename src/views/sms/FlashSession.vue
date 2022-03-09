<template>
  <div>
    <el-card class="box-card">
      <i class="el-icon-tickets"></i>数据列表
      <div style="float: right">
        <el-button size="mini" @click="handleAddFlashSession"> 添加 </el-button>
      </div>
    </el-card>
    <div class="box-table">
      <el-table
        :data="flashSessionList"
        border
        style="width: 100%"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="秒杀时间段名称"
          width="255"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="每日开始时间"
          width="255"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          label="每日结束时间"
          width="255"
          align="center"
        ></el-table-column>
        <el-table-column label="启用" width="210" align="center">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.statusBoolean"
              @change="
                handleUpdateFlashSession(scope.row.id, scope.row.statusBoolean)
              "
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button size="mini" @click="handleEditFlashSession(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleDeleteFlashSession(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="添加时间段"
      :visible.sync="flashSessionVisible"
      width="40%"
    >
      <el-form ref="form" :model="promotionSession" label-width="168px">
        <el-form-item label="秒杀时间段名称：">
          <el-input
            style="width: 300px"
            v-model="promotionSession.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="每日开始时间：">
          <el-time-picker
            v-model="startTime"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="请选择时间"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="每日结束时间：">
          <el-time-picker
            v-model="endTime"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="请选择时间"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="promotionSession.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="flashSessionVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFlashSession">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFlashSession,
  addFlashSession,
  editFlashSession,
  deleteFlashSession,
  updateFlashSessionStatus
} from '../../api/flash'
import { flash } from './data/data-handle'

export default {
  name: 'FlashSession',
  data() {
    return {
      flashSessionList: [],
      promotionSession: {
        endTime: '',
        name: '',
        startTime: '',
        status: 0
      },
      startTime: '',
      endTime: '',
      curId: 0,
      isAdd: true,
      flashSessionVisible: false
    }
  },
  created() {
    this.getFlashSessionListData()
  },
  methods: {
    async getFlashSessionListData() {
      this.flashSessionList = await getFlashSession()
      flash.handleFlashSessionList(this.flashSessionList)
    },
    handleAddFlashSession() {
      this.flashSessionVisible = true
      this.isAdd = true
      this.resetPromotionSession()
    },
    handleEditFlashSession(flashSession) {
      this.flashSessionVisible = true
      this.isAdd = false
      this.promotionSession.name = flashSession.name
      this.promotionSession.status = flashSession.status
      this.startTime = flash.timeStringToDate(flashSession.startTime)
      this.endTime = flash.timeStringToDate(flashSession.endTime)
      this.curId = flashSession.id
    },
    async handleFlashSession() {
      this.promotionSession.startTime = flash.dateToTimeString(this.startTime)
      this.promotionSession.endTime = flash.dateToTimeString(this.endTime)
      if (this.isAdd) {
        await addFlashSession(this.promotionSession)
      } else {
        await editFlashSession(this.curId, this.promotionSession)
      }
      this.flashSessionVisible = false
      await this.getFlashSessionListData()
    },
    handleDeleteFlashSession(id) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deleteFlashSession(id)
          await this.getFlashSessionListData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
        })
    },
    async handleUpdateFlashSession(id, status) {
      await updateFlashSessionStatus(id, status + 0)
      await this.getFlashSessionListData()
    },
    resetPromotionSession() {
      this.promotionSession.name = ''
      this.promotionSession.status = 0
      this.startTime = ''
      this.endTime = ''
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
