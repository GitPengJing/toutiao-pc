<template>
  <div class="login">
      <!-- 登录框 -->
      <el-card class="box-card">
          <!-- 头部标题 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 表单 方便获取数据 -->
          <el-form style="margin-top:20px">
              <!-- 表单容器 -->
              <el-form-item>
                  <!-- 手机号 -->
                  <el-input placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item>
                  <!-- 验证码 -->
                  <el-input placeholder="请输入验证码" style="width:60%"></el-input>
                  <!-- 获取验证码 -->
                  <el-button style="float:right">获取验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <!-- 勾选条款 -->
                  <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <!-- 登录按钮 -->
                  <el-button style="width:100%" type="primary">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
        height: 300px;
        // background: rgba(255, 1, 1, 0.561);
        // border: none;
        .title{
            text-align: center;
            img{
                height: 40px;
            }
        };
        .el-form-item:nth-child(2){
            margin-bottom: 0;
        };
        .el-form-item:nth-child(3){
            margin-bottom: 10px;
        };
    }
}
</style>
