<template>
<el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
     <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form>
        <!-- 文章状态 -->
        <el-form-item label="文章状态:">
            <!-- 放置单选按钮 -->
            <!-- label为该状态对应的值 -->
            <!-- 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
            <el-radio-group :v-model="formNumber.status">
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 频道类型 -->
        <el-form-item label="频道类型:">
            <!-- 下拉选择菜单 -->
            <el-select placeholder="请选择频道" v-model="formNumber.channel_id">
                <el-option v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- 时间范围 -->
        <el-form-item label="时间范围:">
            <!-- 时间范围插件 -->
            <el-date-picker type="daterange" v-model="formNumber.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 存form中的数据
      formNumber: {
        //   文章状态
        // 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 定义5位全部
        status: 5, // 默认为全部
        // 频道id
        channel_id: null, // 默认没有频道
        // 日期范围
        dateRange: []
      },
      channels: [] // 用来装频道获取的数据
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels' // 请求地址
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
