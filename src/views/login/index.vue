<template>
  <div class="login">
      <!-- 登录框 -->
      <el-card class="box-card">
          <!-- 头部标题 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 表单 方便获取数据 -->
          <!-- moddl 绑定表单数据对象 -->
          <!-- rules 绑定数据校验规则 -->
          <!-- ref属性获取dom对象 -->
          <el-form ref="loginRules" :model="loginForm" :rules="rules" style="margin-top:20px">
              <!-- 表单容器 -->
              <!-- prop绑定定义规则的字段 -->
              <el-form-item prop="mobile">
                  <!-- 手机号 -->
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <!-- 验证码 -->
                  <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:60%"></el-input>
                  <!-- 获取验证码 -->
                  <el-button style="float:right">获取验证码</el-button>
              </el-form-item>
              <el-form-item prop="checkbox">
                  <!-- 勾选条款 -->
                  <el-checkbox v-model="loginForm.checkbox">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <!-- 登录按钮 -->
                  <!-- 定义点击事件手动校验数据 -->
                  <el-button style="width:100%" type="primary" @click="login">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checkbox: false // 用户协议
      },
      rules: {
        // required 为true则该项为必选项
        // message提示信息
        mobile: [
          { required: true, message: '手机号不能为空' },
          // 正则表达式检验手机号格式
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ],
        checkbox: [
          { // 自定义检验函数
            validator: function (rule, value, callback) {
              // 输入值进行校验，不通过报提示信息
              value ? callback() : callback(new Error('请勾选用户协议'))
            }
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginRules.validate().then(() => {
        // 校验成功
        this.$axios({
          url: '/authorizations',
          method: 'post',
          data: this.loginForm
        }).then(res => {
          console.log(res)
          // 登录成功 获取toke存到loalStorage
          window.localStorage.setItem('user-token', res.data.data.token)
          // 跳转到主页
          this.$router.push('/')
        }).catch(() => {
          this.$message.error('手机号或验证码错误')
        })
      })
    }
  }
}
</script>
// lang属性定义编写规则 scoped只对当前生效css样式 否则默认是全局的
<style lang="less" scoped>
.login{
    background: url(../../assets/img/login_bg.jpg);
    background-size: cover;
    background-position: center center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-card{
        width: 400px;
        height: 330px;
        // background: rgba(255, 1, 1, 0.561);
        // border: none;
        .title{
            text-align: center;
            img{
                height: 40px;
            }
        };
    }
}
</style>
