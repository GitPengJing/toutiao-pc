<template>
<!-- 布局容器 -->
<el-container>
  <!-- 侧边导航 -->
    <el-aside>
        <h1>我是左边的</h1>
    </el-aside>
  <!-- 右边主体 -->
    <el-container>
      <!-- 头部 -->
        <el-header>
            <h1>我是头部</h1>
        </el-header>
      <!-- 主体部分 -->
        <el-main>
            <h1>我是主体</h1>
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

</style>
