<template>
  <el-card>
      <!-- 面包屑组件作为el-card的头 -->
      <bread-crumb slot="header">
         <template slot="title">
             素材管理
         </template>
      </bread-crumb>
      <!-- tabs标签页 v-model 绑定选中标签的name-->
      <el-tabs v-model="activeName" @tab-click='changeTabs'>
          <!-- 全部素材页 返回的全部内容放这里 -->
          <el-tab-pane label="全部" name="all">
            <div class="imgList">
              <el-card class="imgCard" v-for="item in list" :key="item.id">
                  <!-- 显示图片 -->
                  <img :src="item.url" alt="">
                  <!-- 删除和收藏 -->
                  <el-row type="flex" align="middle" justify="space-around">
                      <i class="el-icon-s-promotion"></i>
                      <i class="el-icon-delete-solid"></i>
                  </el-row>
              </el-card>
            </div>
          </el-tab-pane>
          <!-- 收藏素材页  收藏的内容放这里 -->
          <el-tab-pane label="收藏" name="collect">
            <div class="imgList">
              <el-card class="imgCard" v-for="item in list" :key="item.id">
                  <!-- 显示图片 -->
                  <img :src="item.url" alt="">
              </el-card>
            </div>
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 激活页 默认第一个页
      list: [] // 接受素材数据
    }
  },
  methods: {
    //   定义标签页改变事件
    changeTabs () {
      // 改变标签页,重新获取资源
    //   根据collect的值来改变
    // true时显示收藏资源 false显示全部资源
      this.getMaterial()
    },
    //   获取素材资源
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'get', // 请求方式 默认是get
        // query参数
        params: {
          // 点击收藏时activeName ==='collect' collect值为true
          // 点击全部时activeName ==='all'     collect值为false
          collect: this.activeName === 'collect' // 是否是收藏的图片
        },
        // body参数
        data: {}
      }).then(res => {
        //   请求成功把值给list
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.imgList {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .imgCard{
        width: 200px;
        height: 230px;
        margin: 10px 20px;
        position: relative;
        img{
            width: 160px;
            height: 160px;
        }
        .el-row{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            background: #eee;
            i{
                font-size: 20px;
            }
        }
    }
}
</style>
