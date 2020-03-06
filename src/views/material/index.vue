<template>
  <el-card>
      <!-- 面包屑组件作为el-card的头 -->
      <bread-crumb slot="header">
         <template slot="title">
             素材管理
         </template>
      </bread-crumb>
      <!-- tabs标签页 v-model 绑定选中标签的name-->
      <el-tabs v-model="activeName">
          <!-- 全部素材页 返回的全部内容放这里 -->
          <el-tab-pane label="全部" name="all">

          </el-tab-pane>
          <!-- 收藏素材页  收藏的内容放这里 -->
          <el-tab-pane label="收藏" name="collect">

          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
