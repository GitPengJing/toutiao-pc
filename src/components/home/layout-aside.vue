<template>
<div class="layoutAside">
    <!-- logo -->
    <div class="logo" style="background-color:#2e2f32">
        <img src="../../assets/img/logo_admin.png" alt="">
    </div>
    <!-- 导航 -->
<el-menu text-color="#adafb5" background-color="#353b4e">
    <!-- 首页 -->
    <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
    </el-menu-item>
    <!-- 内容管理部分 -->
    <el-submenu>
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
        </template>
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
    </el-submenu>
    <!-- 粉丝管理部分 -->
    <el-submenu>
        <template slot="title">
            <i class="el-icon-food"></i>
            <span>粉丝管理</span>
        </template>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
    </el-submenu>
    <!-- 账户信息部分 -->
    <el-menu-item>
        <i class="el-icon-s-custom"></i>
        <span>账户信息</span>
    </el-menu-item>
</el-menu>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layoutAside{
    background-color:#323745;
    height: 100vh;
    width: 220px;
    .logo{
        text-align: center;
        padding: 10px 0;
        img{
            height: 30px;
        }
    }
    .el-menu{
        border-right: none;
    }
}
</style>
