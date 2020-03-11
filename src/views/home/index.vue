<template>
<!-- 布局容器 -->
<el-container>
  <!-- 侧边导航 -->
    <el-aside :style="{width: collapse? '64px':'240px'}" style="transition:all 0.5s linear;background-color:#323745;">
      <!-- 将父组件的值传给子组件 -->
      <layout-aside :collapse='collapse'></layout-aside>
    </el-aside>
  <!-- 右边主体 -->
    <el-container class="mainBody" style="transition:all 0.5s linear" :style="{marginLeft:collapse?'64px':'240px' }">
      <!-- 头部 -->
        <el-header>
          <layout-header ></layout-header>
        </el-header>
      <!-- 主体部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false // 默认不折叠
    }
  },
  created () {
    // 监听值改变
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
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
