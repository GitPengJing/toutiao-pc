<template>
<!-- 布局容器 -->
<el-container>
  <!-- 侧边导航 -->
    <el-aside style="width:240px;background-color:#323745;">
        <layout-aside></layout-aside>
    </el-aside>
  <!-- 右边主体 -->
    <el-container class="mainBody">
      <!-- 头部 -->
        <el-header>
          <layout-header></layout-header>
        </el-header>
      <!-- 主体部分 -->
        <el-main>
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
.el-aside{
  background: url(../../assets/img/aside_bg.jpg);
  background-size: cover;
  background-position: center center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.mainBody{
  position: relative;
  margin-left: 240px;
}
</style>
