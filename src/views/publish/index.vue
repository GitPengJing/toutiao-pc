<template>
<el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
    <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form label-width="100px">
        <!-- 输入标题 -->
        <el-form-item label="标题:">
            <el-input style="width:400px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- 输入内容 -->
        <el-form-item label="内容:">
            <el-input type="textarea" rows="4" style="width:500px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 选择封面 -->
        <el-form-item label="封面:">
            <el-radio-group>
                <el-radio>单图</el-radio>
                <el-radio>三图</el-radio>
                <el-radio>无图</el-radio>
                <el-radio>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 选择频道 -->
        <el-form-item label="频道:">
            <el-select placeholder="请选择频道">
                <el-option v-for="item in channel"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">发布</el-button>
            <el-button type="warning">存入草稿</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      channel: [] // 频道数据
    }
  },
  methods: {
    //   获取频道数据
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>

</style>
