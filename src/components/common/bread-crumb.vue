<template>
<!-- 利用elementU封装面包屑组件  separator是分割符-->
<el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- el-bread-item相当于router-link -->
    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
        <!-- 用来放置首页的下一级 是动态的所以用插槽 -->
        <slot name="title"></slot>
    </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
