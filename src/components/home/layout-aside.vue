<template>
<div class="layoutAside">
    <!-- logo -->
    <div class="logo">
        <img :src="collapse ? lilImg : bigImg" alt="">
    </div>
    <!-- 导航  router开启路由模式 -->
<el-menu text-color="rgb(204, 0, 255)" :collapse="collapse" background-color="rgba(0,0,0,.3)" router >
    <!-- 首页 -->
    <!-- index 是elementUI注册路由的方式 和router-link的to类似 -->
    <el-menu-item index='/home'>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
    </el-menu-item>
    <!-- 内容管理部分 -->
    <el-submenu index='1'>
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
    </el-submenu>
    <!-- 粉丝管理部分 -->
    <el-submenu index='2'>
        <template slot="title">
            <i class="el-icon-food"></i>
            <span>粉丝管理</span>
        </template>
        <el-menu-item index='/home/picture'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansphot'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
    </el-submenu>
    <!-- 账户信息部分 -->
    <el-menu-item index="/home/account">
        <i class="el-icon-s-custom"></i>
        <span>账户信息</span>
    </el-menu-item>
</el-menu>
</div>
</template>

<script>
export default {
  props: ['collapse'], // 接收父组件传的值
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      lilImg: require('../../assets/img/lilImg2.png')
    }
  }
}
</script>

<style lang="less" scoped>
.layoutAside{
    height: 100vh;
    .logo{
        text-align: center;
        padding: 10px 0;
        background-color:rgba(58, 57, 51, 0.5);
        img{
            height: 30px;
        }
    }
    .el-menu{
        border-right: none;
        i{
            color: #ffe538;
        }
    }
}
</style>
