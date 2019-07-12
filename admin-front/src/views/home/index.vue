<template>
  <div class='home'>
    <el-container>
      <el-aside width='201px'>
        <el-menu
          :default-active='$route.path'
          class='el-menu-vertical'
          background-color='#001529'
          text-color='#fff'
          :unique-opened='true'
          :router='true'
          active-text-color='#2d8cf0'
        >
        <el-submenu v-for="item in menus" :key="item.id"  :index="item.path">
        <template slot='title'>
          <i class='el-icon-menu'></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group v-for="item2 in item.children" :key="item2.id">
          <el-menu-item :index="item2.path" :route="item2.path">{{item2.authName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header v-show='!showHome'>
          <el-row>
            <el-col :span='22'>
              <div class='grid-content bg-purple'>
                <span>管理后台</span>
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
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { delLocal } from '@/libs/local'
import { getMenus } from '@api/login'

export default {
  name: 'home',
  data () {
    return {
      showHome: this.$route.name === 'home',
      mainText: '',
      timer: null,
      menus: []
    }
  },
  created () {
    this.getMenus()
  },
  mounted () {
    if (this.showHome && this.$route.name === 'home') {
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
    getMenus () {
      getMenus().then(res => {
        this.menus = res.data
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
