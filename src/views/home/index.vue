<template>
<!-- 布局容器 -->
<el-container>
  <!-- 侧边导航 -->
    <el-aside style="width:220px">
        <layout-aside></layout-aside>
    </el-aside>
  <!-- 右边主体 -->
    <el-container>
      <!-- 头部 -->
        <el-header>
          <layout-header></layout-header>
        </el-header>
      <!-- 主体部分 -->
        <el-main style="padding-bottom:0">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>

export default {
}
</script>

<style>
.el-main{
  background-color: #f2f3f5;
}
</style>
