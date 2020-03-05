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
          <el-table-column label="标题" width="600"></el-table-column>
          <el-table-column label="评论状态"></el-table-column>
          <el-table-column label="总评论数"></el-table-column>
          <el-table-column label="粉丝评论数"></el-table-column>
          <el-table-column label="操作"></el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>

</style>
