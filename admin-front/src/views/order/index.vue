<template>
  <el-card class="box-card">
    订单
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
