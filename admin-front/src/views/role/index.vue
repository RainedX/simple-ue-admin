<template>
  <el-card class="box-card">
    <el-row>
      <el-col :span="20">
        <bread-crumb :levels="['权限管理', '角色列表']"></bread-crumb>
      </el-col>
      <el-row :span="4">
        <el-button type="primary" @click="showDialog">添加角色</el-button>
      </el-row>
    </el-row>
    <el-table :data="tableData" style="width: 100%" height="450px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row class="b-row" v-for="item1 in props.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag @close="delTag(props.row, item1.id)" effect="dark" closable type="danger">
                {{item1.authName}}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag @close="delTag(props.row, item2.id)" effect="dark" closable type="">
                    {{item2.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag @close="delTag(props.row, item3.id)" v-for="item3 in item2.children" :key="item3.id" closable type="">
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-alert v-if="props.row.children.length === 0" title="未分配任何权限" type="info"></el-alert>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDel(scope.row)"></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" @click="handleCheck(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改权限"
      :visible.sync="checkDialogVisible"
      width="50%"
    >
    <el-tree
      ref="tree"
      :data="roleData"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="selectKeys"
      :props="defaultProps">
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="checkDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleClick">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" width="35%">
      <el-form :model="roleForm" ref="roleForm">
        <el-form-item label="角色名称" label-width="80px"
        prop="roleName"
        :rules="{ required: true, message: '角色名称不能为空', trigger: 'blur'}"
      >
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px">
          <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('roleForm')">取 消</el-button>
        <el-button type="primary" @click="addOneRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import BreadCrumb from '@components/breadcrumb'
import { getRoles, delUserRole, delRoles, addOneRole } from '@api/roles'
import { getAllRights, addUserRights } from '@api/rights'

export default {
  data () {
    return {
      tableData: [],
      checkDialogVisible: false,
      addRoleDialogVisible: false,
      roleData: [],
      selectKeys: [],
      selectRole: {},
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      roleForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  created () {
    getRoles().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    addOneRole () {
      addOneRole(this.roleForm).then(res => {
        this.$message(res.meta.msg)
        this.addRoleDialogVisible = false
      })
    },
    cancel (formName) {
      this.roleForm = {
        roleName: '',
        roleDesc: ''
      }
      this.$refs[formName].resetFields()
      this.addRoleDialogVisible = false
    },
    delTag (row, rightId) {
      delUserRole(row.id, rightId).then(res => {
        row.children = res.data
        if (res.meta.status === 200) {
          this.$message(res.meta.msg)
        }
      })
    },
    showDialog () {
      this.addRoleDialogVisible = true
    },
    handleDel (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        delRoles(row.id).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCheck (role) {
      this.checkDialogVisible = true
      this.selectRole = role
      getAllRights('tree').then(res => {
        this.roleData = res.data
        role.children.forEach(element => {
          element.children.forEach(item => {
            this.selectKeys.push(item.id)
          })
        })
      })
    },
    handleClick () {
      let keyArr1 = this.$refs.tree.getCheckedKeys()
      let keyArr2 = this.$refs.tree.getHalfCheckedKeys()
      addUserRights(this.selectRole.id, [...keyArr1, ...keyArr2]).then(res => {
        this.checkDialogVisible = false
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
