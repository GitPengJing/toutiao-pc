<template>
<!-- elementUI layout 布局 -->
<el-row align="middle" type='flex' class="layoutHeader">
    <!-- :span 分行列 -->
    <!-- 左列 -->
    <el-col :span="13" class="left">
        <!-- 图标 -->
        <i @click="collapse=!collapse" :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
        <!-- 标题 -->
        <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="13" class="center">
    </el-col>
    <!-- 右列 -->
    <el-col :span="13" class="right">
        <!-- align 设置垂直对齐方式 justify设置水平对齐方式 -->
        <el-row type="flex" align="middle" justify="end">
            <img :src="userInfo.photo" alt="">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click" @command="clickMenu">
                <span>{{userInfo.name}}</span>
                <i class="el-icon-arrow-down"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">github地址</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-row>
    </el-col>
</el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      userInfo: {}, // 接收用户信息
      collapse: false // 默认不折叠
    }
  },
  watch: {
    collapse: function () {
      eventBus.$emit('changeCollapse')
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
        //  获取个人信息
      } else if (command === 'git') {
        //  跳转到github地址
        window.location.href = 'https://github.com/'
      } else {
        //  退出删除token
        window.localStorage.removeItem('user-token')
        //  回到登录
        this.$router.push('/login')
      }
    },
    getUserInfo () {
      // 请求接口 获取用户信息
      this.$axios({
        url: '/user/profile' // 请求地址
      // headers: { Authorization: `Bearer ${token}` } // 请求头
      }).then(res => {
      // 请求成功以后获取到的信息给userInfo
        this.userInfo = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
    // 监听值改变
    eventBus.$on('updateInfo', () => {
      // 值改变显示更新
      this.getUserInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.layoutHeader{
    height: 60px;
    .left {
         i{
            font-size: 20px;
            margin-right: 5px;
         }
    }
    .center{
      background: url(../../assets/img/4am.png) no-repeat;
      background-position: center center;
      height: 60px;
    }
    .right{
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        i{
            font-size: 10px;
            margin-left: 5px;
        }
    }
}
</style>
