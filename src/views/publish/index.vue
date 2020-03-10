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
            <el-input v-model="publishForm.title" style="width:300px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- 输入内容 -->
        <el-form-item label="内容:" prop="content">
            <quill-editor v-model="publishForm.content"
            style="height:500px"
            placeholder="请输入内容">
            </quill-editor>
        </el-form-item>
        <!-- 选择封面 -->
        <el-form-item label="封面:" prop="cover" style="margin-top:120px">
            <el-radio-group v-model="publishForm.cover.type" @change="changeType">
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 封面组件 -->
        <cover-img @secondUrl="receiveUrl" :list="publishForm.cover.images"></cover-img>
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
            <el-button type="primary" @click="publish(false)">发布</el-button>
            <el-button type="warning" @click="publish(true)">存入草稿</el-button>
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
    // 接收图片地址并显示
    receiveUrl (url, index) {
      // 把点击的对应下标的图片替换为点击的素材图片
      this.publishForm.cover.images.splice(index, 1, url)
    },
    // 类型改变，图片数组长度改变
    changeType () {
      // -1:自动，0-无图，1-1张，3-3张
      if (this.publishForm.cover.type === 1) {
        this.publishForm.cover.images = [''] // 单图
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', ''] // 三图
      } else {
        this.publishForm.cover.images = [] // 无图或自动
      }
    },
    //   获取对应文章数据
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.publishForm = res.data
      })
    },
    //   获取频道数据
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channel = res.data.channels
      })
    },
    //  手动校验/发布文章/存入草稿
    publish (draft) {
      this.$refs.proofForm.validate().then(() => {
        const { articleID } = this.$route.params
        //  发布文章
        this.$axios({
          url: articleID ? `/articles/${articleID}` : '/articles', // 请求地址 如果有id请求地址带id
          method: articleID ? 'put' : 'post', // 请求方法 如果有id方法就是put
          params: { draft }, // query参数 draft为true存草稿  false发表
          data: this.publishForm
        }).then(() => {
          this.$message.success(draft ? '存入草稿成功' : '操作成功')
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    }
  },
  created () {
    this.getChannel()
    const { articleID } = this.$route.params
    articleID && this.getArticleById(articleID)
  }
}
</script>

<style>

</style>
