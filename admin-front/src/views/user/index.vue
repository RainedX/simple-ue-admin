<template>
  <el-card class="box-card">
    <bread-crumb :levels="['用户管理', '用户列表']"></bread-crumb>
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
    <el-table :data="tableData" style="width: 100%" height="450px">
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
          <el-switch v-model="row.mg_state" @change="handleChange(row.id, $event)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDel(scope.$index, scope.row)"></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" @click="handleCheck(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="el-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 15, 20, 25]"
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
        <el-button @click="cancel('validateForm')">取 消</el-button>
        <el-button type="primary" @click="addPerson">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editFormVisible" width="35%">
      <el-form :model="form" ref="editForm">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="userInfo.username" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="userInfo.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="userInfo.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editPerson">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="addRoleDialog" width="35%">
      <el-form>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="selectInfo.username" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" label-width="80px">
          <el-select v-model="currentId" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="item in roles"
              :label="item.roleName"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getUserList, addUser, removeUser, editUser, changeUserStatus, getUser } from '@api/userList'
import { getRoles, addUserRole } from '@api/roles'
import BreadCrumb from '@components/breadcrumb'

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
      pageSize: 5, // 每页显示条数
      total: -1, // 总条数
      tableData: [],
      dialogFormVisible: false,
      editFormVisible: false,
      addRoleDialog: false,
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
      },
      userInfo: {},
      selectInfo: {},
      currentId: -1,
      roles: []
    }
  },
  async created () {
    let res = await getUserList(this.query, this.pageNum, this.pageSize)
    this.tableData = res.data.users
    this.total = res.data.total
  },
  methods: {
    handleEdit (index, row) {
      this.userInfo = { ...row }
      this.editFormVisible = true
    },
    handleCheck (index, row) {
      this.selectInfo = { ...row }
      getUser(row.id).then(res => {
        this.currentId = res.data.rid
      })
      getRoles().then(res => {
        this.roles = res.data
      })
      this.addRoleDialog = true
    },
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
    handleChange (id, status) {
      changeUserStatus(id, status).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
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
      getUserList('', 1, 5).then(res => {
        this.tableData = res.data.users
        this.pageNum = 1
        this.pageSize = 5
        this.total = res.data.total
      })
    },
    showDialog () {
      this.dialogFormVisible = true
    },
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.form = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.dialogFormVisible = false
    },
    cancelEdit () {
      this.form.email = ''
      this.form.mobile = ''
      this.editFormVisible = false
    },
    editPerson () {
      editUser(this.userInfo.id, this.userInfo.email, this.userInfo.mobile).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.loadData()
          this.cancelEdit()
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })

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
              this.cancel('validateForm')
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    addRole () {
      addUserRole(this.selectInfo.id, this.currentId).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.addRoleDialog = false
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
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
