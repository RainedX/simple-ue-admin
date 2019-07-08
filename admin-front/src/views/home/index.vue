<template>
  <div class='home'>
    <el-container>
      <el-aside width='201px'>
        <el-menu
          default-active='/'
          class='el-menu-vertical'
          background-color='#001529'
          text-color='#fff'
          :unique-opened='true'
          :router='true'
          active-text-color='#2d8cf0'
        >
          <el-menu-item index='/'>
            <i class='el-icon-star-off'></i>
            <span slot='title'>首页</span>
          </el-menu-item>
          <el-submenu index>
            <template slot='title'>
              <i class='el-icon-menu'></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='/userList'>用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index='3'>
            <template slot='title'>
              <i class='el-icon-tickets'></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='1-1'>角色列表</el-menu-item>
              <el-menu-item index='1-1'>权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index='4'>
            <template slot='title'>
              <i class='el-icon-setting'></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='1-1'>商品列表</el-menu-item>
              <el-menu-item index='1-1'>分类参数</el-menu-item>
              <el-menu-item index='1-1'>商品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index='5'>
            <template slot='title'>
              <i class='el-icon-document'></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='1-1'>订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index='6'>
            <template slot='title'>
              <i class='el-icon-news'></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='1-1'>数据报表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header v-show='!showHome'>
          <el-row>
            <el-col :span='22'>
              <div class='grid-content bg-purple'>
                <el-breadcrumb separator-class='el-icon-arrow-right'>
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col :span='2'>
              <div class='grid-content bg-purple-light'>
                <span @click='loginOut'>退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main :class="{'main-home': showHome}">
          <div class='main-text' v-if='showHome'>
            <span>{{mainText}}</span>
          </div>
          <router-view></router-view>
        </el-main>
        <el-footer v-show='!showHome'>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { delLocal } from '@/libs/local'

export default {
  name: 'home',
  data () {
    return {
      showHome: true,
      mainText: '',
      timer: null
    }
  },
  mounted () {
    if (this.showHome) {
      this.addContent()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    loginOut () {
      delLocal('token')
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '退出登录成功'
      })
    },
    addContent () {
      let count = 0
      const str = '既然选择了远方 便只顾风雨兼程!'

      this.timer = setInterval(() => {
        count++
        if (count >= str.length) {
          clearInterval(this.timer)
          return
        }
        this.mainText = str.slice(0, count)
      }, 150)
    }
  },
  watch: {
    $route (to, from) {
      this.showHome = to.name === 'home'

      if (to.name === 'home') {
        this.mainText = ''
        clearInterval(this.timer)
        this.timer = null
        this.addContent()
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import './index.less';
</style>
