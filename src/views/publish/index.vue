<template>
<el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
    <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form label-width="100px"
        ref="proofForm"
        :model="publishForm"
        :rules="publishRules">
        <!-- 输入标题 -->
        <el-form-item label="标题:" prop="title">
            <el-input v-model="publishForm.title" style="width:400px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- 输入内容 -->
        <el-form-item label="内容:" prop="content">
            <el-input v-model="publishForm.content" type="textarea" rows="4" style="width:500px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 选择封面 -->
        <el-form-item label="封面:" prop="cover">
            <el-radio-group v-model="publishForm.cover.type">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 选择频道 -->
        <el-form-item label="频道:" prop="channel_id">
            <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
                <el-option v-for="item in channel"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="checkForm">发布</el-button>
            <el-button type="warning">存入草稿</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      channel: [], // 频道数据
      // 表单数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        // 封面
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 根据类型不同数量图片
        },
        channel_id: null // 频道id
      },
      // 校验规则
      publishRules: {
        title: [
          { required: true, message: '标题不能少', trigger: 'blur' },
          { min: 5, max: 30, message: '标题在5-30个字之间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能少', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '频道必须选', trigger: 'blur' }
        ]
      }
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
    },
    // 手动校验
    checkForm () {
      this.$refs.proofForm.validate()
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>

</style>
