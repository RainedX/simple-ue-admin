<template>
  <el-card class="box-card">
    数据
  </el-card>
</template>

<script>
import BreadCrumb from '@components/breadcrumb'

export default {
  data () {
    return {
      tableData: []
    }
  },
  components: {
    BreadCrumb
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
