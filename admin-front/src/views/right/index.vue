<template>
  <el-card class="box-card">
    <bread-crumb :levels="['权限管理', '权限列表']"></bread-crumb>
    <el-table border height="510px" :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="1"> </el-table-column>
    <el-table-column prop="authName" label="权限名称" width="180"> </el-table-column>
    <el-table-column prop="path" label="路径" width="180"></el-table-column>
    <el-table-column label="层次">
      <template slot-scope="scope">
        {{scope.row.level | changeZh}}
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
import BreadCrumb from '@components/breadcrumb'
import { getAllRights } from '@api/rights.js'

export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    getAllRights('list').then(res => {
      this.tableData = res.data
    })
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
