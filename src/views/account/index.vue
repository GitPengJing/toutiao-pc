<template>
<el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
    <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form label-width="100px" :model="formData" :rules="accountRules" ref="myForm">
        <!-- 用户名 -->
        <el-form-item label="用户名:" prop="name">
            <el-input v-model="formData.name" style="width:30%"></el-input>
        </el-form-item>
        <!-- 简介 -->
        <el-form-item label="简介:" prop="intro">
            <el-input v-model="formData.intro" style="width:30%"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱:" prop="email">
            <el-input v-model="formData.email" style="width:30%"></el-input>
        </el-form-item>
        <!-- 手机号 不能更改 -->
        <el-form-item label="手机号:" prop="mobile">
            <el-input disabled v-model="formData.mobile" style="width:30%"></el-input>
        </el-form-item>
        <!-- 保存 -->
        <el-form-item>
            <el-button type="primary" @click="saveInfo">保存</el-button>
        </el-form-item>
    </el-form>
     <el-upload action="" :http-request="uploadImg" :show-file-list="false">
    <img class='head-upload' :src="formData.photo?formData.photo:defaultImg" alt="">
    </el-upload>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        email: '', // 邮箱
        mobile: '', // 手机号
        photo: '' // 头像
      },
      defaultImg: require('../../assets/img/aside_bg.jpg'),
      accountRules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '长度必须在1-7个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不对', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   获取用户资料
    getInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    },
    // 保存用户信息
    saveInfo () {
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message.success('保存成功')
        }).catch(() => {
          this.$message.error('保存成功')
        })
      })
    },
    // 上传头像
    uploadImg (params) {
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.formData.photo = res.data.photo
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style>
.head-upload {
  position: absolute;
  right: 350px;
  top:160px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
