<template>
    <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item  :to="{ path: '/userList' }">用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
    <el-col :span="12">
      <el-input placeholder="请输入内容" @clear="handleGetUserList('', 1, 2)" v-model="query" clearable class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="handleGetUserList(query, 1, 2)"></el-button>
      </el-input>
    </el-col>
    <el-col :span="3">
      <el-button type="primary" @click="showDialog">添加用户</el-button>
    </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column label="创建日期">
      <template v-slot:default="{row}">
        {{row.create_time | format}}
      </template>
    </el-table-column>
    <el-table-column label="用户状态">
      <template v-slot:default="{row}">
        <el-switch v-model="row.mg_state"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit()"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)"></el-button>
        <el-button size="mini" type="success" icon="el-icon-check" @click="handleCheck()"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="el-pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[1, 2, 3, 4, 5]"
    :page-size="pageSize"
    layout="prev, pager, next, jumper, sizes, total"
    :total="total">
  </el-pagination>
  <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="35%">
    <el-form :model="form" ref="validateForm" :rules="rules">
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        :rules="[{ required: true }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }]"
      >
        <el-input
          v-model="form.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
        :rules="[{ required: true }, { min: 3, max: 20, message: '密码长度3-20位', trigger: 'blur' }]"
      >
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="80px">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="addPerson">确 定</el-button>
    </div>
  </el-dialog>
  </el-card>
</template>

<script>
import { getUserList, addUser, removeUser } from '@api/userList'

export default {
  data () {
    let checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.form.username !== '') {
          this.$refs.validateForm.validateField('username')
        }
        callback()
      }
    }

    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.password !== '') {
          this.$refs.validateForm.validateField('password')
        }
        callback()
      }
    }

    return {
      query: '',
      pageNum: 1, // 当前页数
      pageSize: 2, // 每页显示条数
      total: -1, // 总条数
      tableData: [],
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    let res = await getUserList(this.query, this.pageNum, this.pageSize)
    this.tableData = res.data.users
    this.total = res.data.total
  },
  methods: {
    handleEdit () {},
    handleCheck () {},
    handleDel (index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        removeUser(row.id).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            this.loadData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleGetUserList (query, pageNum, pageSize) {
      getUserList(query, pageNum, pageSize).then(res => {
        this.tableData = res.data.users
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.pageNum = 1
      this.handleGetUserList(this.query, this.pageNum, this.pageSize)
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.handleGetUserList(this.query, this.pageNum, this.pageSize)
    },
    loadData () {
      getUserList('', 1, 2).then(res => {
        this.tableData = res.data.users
        this.pageNum = 1
        this.pageSize = 2
        this.total = res.data.total
      })
    },
    showDialog () {
      this.dialogFormVisible = true
    },
    cancel () {
      this.$refs.validateForm.resetFields()
      this.dialogFormVisible = false
    },
    addPerson () {
      this.$refs.validateForm.validate((valid) => {
        if (!valid) {
          return false
        } else {
          addUser(this.form).then(res => {
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.loadData()
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })

          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
