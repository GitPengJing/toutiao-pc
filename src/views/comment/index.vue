<template>
  <el-card>
      <!-- slot='header'表示面包屑组件作为标题 -->
      <bread-crumb slot="header">
      <template slot="title">
          评论管理
      </template>
      </bread-crumb>
      <el-table :data="list">
          <!-- lable定义表格的列名 -->
          <el-table-column prop="title" label="标题" width="500"></el-table-column>
          <!-- el-table不显示布尔值 用formatter 格式化 -->
          <el-table-column :formatter="status" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="操作">
              <el-button type="text">修改</el-button>
              <el-button type="text">打开评论</el-button>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    status (row, column, cellValue, index) {
      // row表示该行所有数据
      // column表示该列的信息
      // cellValue表示当前单元格的值
      // index表示下标
      return cellValue ? '正常' : '关闭'
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment' // 传comment 返回用于评论管理的字段
        },
        method: 'get'
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style lang='less' scoped>
    .el-button{
        font-size: 12px;
    }
</style>
