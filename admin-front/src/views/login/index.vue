<template>
  <div
    v-loading="$store.state.isShowLoading"
    class="login"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="login-con">
      <div class="login-header">欢迎登录</div>
      <el-form label-position="left" label-width="50px" :model="formLabelAlign">
        <el-form-item label="账号">
          <el-input v-model="formLabelAlign.username" placeholder="username">
            <i slot="prepend" class="iconfont icon-username"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password" :show-password="true" placeholder="password">
            <i slot="prepend" class="iconfont icon-password"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@api/login'
import { setLocal } from '@libs/local'

export default {
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      userLogin(this.formLabelAlign.username, this.formLabelAlign.password).then(res => {
        const { msg: message, status } = res.meta
        this.$message({
          message,
          type: status === 200 ? 'success' : 'error',
          duration: 1500
        })

        if (status === 200) {
          setLocal('token', res.data.token)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>
