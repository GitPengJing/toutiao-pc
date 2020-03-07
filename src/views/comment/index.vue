<template>
<!-- v-loading 加遮罩层 加载效果-->
  <el-card v-loading="loading" >
      <!-- slot='header'表示面包屑组件作为标题 -->
      <bread-crumb slot="header">
      <template slot="title">评论管理</template>
      </bread-crumb>
      <el-table :data="list" max-height="380px">
          <!-- lable定义表格的列名 -->
          <el-table-column prop="title" label="标题" width="500"></el-table-column>
          <!-- el-table不显示布尔值 用formatter 格式化 -->
          <el-table-column :formatter="status" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="操作" >
              <template slot-scope="obj">
              <el-button type="text">修改</el-button>
              <el-button size="small" @click="commentStatus(obj.row)" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row style="height:60px" type="flex" align="middle" justify="center">
      <el-pagination background
      layout="prev, pager, next"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change='changePage'
      >
      </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: true, // 默认关闭遮罩层
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页  默认第一页
        pageSize: 10 // 每页显示多少条信息
      },
      list: []
    }
  },
  methods: {
    // 定义页面改变事件
    changePage (newPage) {
      // 将最新页码给currentPage
      this.page.currentPage = newPage
      // 获取点击页码的数据
      this.getComment()
    },
    //   获取数据
    getComment () {
      this.loading = true // 请求之前打开遮罩层
      this.$axios({
        url: '/articles',
        // query参数
        params: {
          response_type: 'comment', // 传comment 返回用于评论管理的字段
          page: this.page.currentPage, // 获取对应页的数据
          per_page: this.page.pageSize // 每页获取多少条
        },
        method: 'get'
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        // 请求成功以后将总页数赋值给total
        this.page.total = res.data.total_count
        // 请求结束后关闭遮罩层
        this.loading = false
      })
    },
    // 显示评论状态方法
    status (row, column, cellValue, index) {
    // row表示该行所有数据
    // column表示该列的信息
    // cellValue表示当前单元格的值
    // index表示下标
      return cellValue ? '正常' : '关闭'
    },

    // 打开或关闭评论
    commentStatus (row) {
      const statusText = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${statusText}评论吗？`, '提示').then(() => {
        //   确定以后
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求方式
          // 请求query参数
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status // 状态栏显示打开还是关闭
          }

        }).then(() => {
          // 成功提示信息
          this.$message.success(`${statusText}评论成功`)
          //   刷新页面数据
          this.getComment()
        }).catch(() => {
          // 失败提示信息
          this.$message.error(`${statusText}评论失败`)
        })
      })
    }
  },

  created () {
    this.getComment()
  }
}
</script>

<style lang='less' scoped>

</style>
