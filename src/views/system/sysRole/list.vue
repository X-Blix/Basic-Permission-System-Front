<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input v-model="searchObj.roleName" style="width: 100%" placeholder="角色名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top:10px;"
    >

      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template v-slot:default="scope">
          <!--        <template slot-scope="scope">-->
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template v-slot:default="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="edit(scope.row.id)" />
          <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" @click="removeDataById(scope.row.id)" />
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
// 引入定义接口的js文件
import api from '@/api/role/role'
export default {
  // 定义数据模型
  data() {
    return {
      listLoading: true, // 是否显示加载图标
      list: [], // 角色列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 5, // 每页记录数
      searchObj: {} // 查询条件
    }
  },
  // 页面渲染之前执行
  created() {
    // 调用列表方法
    this.fetchData()
  },
  methods: { // 具体方法
    // 重置
    resetData() {
      // 清空表单
      this.searchObj = {}
      // 查询所有数据
      this.fetchData()
    },
    // 条件分页查询列表
    // pageNum 查询页数
    fetchData(pageNum = 1) {
      // 页数赋值
      this.page = pageNum
      // ajax (调用api)
      api.getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          // console.log(response)
          debugger
          this.listLoading = false
          // 每页数据列表
          this.list = response.data.records
          // 总记录数
          this.total = response.data.total
        })
    },
    // 根据id删除数据
    // 删除
    // 根据id删除数据
    removeDataById(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用方法删除
        api.removeById(id)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //刷新
            this.fetchData()
          }).catch(() => {
          this.$message.info('取消删除')
        })
      })
    },
  }
}
</script>
