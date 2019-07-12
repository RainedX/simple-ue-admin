<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in levels" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  props: {
    levels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
