<template>
  <el-card v-loading="loading">
    <!-- 面包屑组件作为el-card的头 -->
    <bread-crumb slot="header">
       <template slot="title">
           素材管理
       </template>
    </bread-crumb>
    <!-- 上传图片 -->
    <el-row type="flex" justify="end">
        <!-- action不传报错 http-request为自定义上传方法-->
        <el-upload action="" :http-request="uploadImg" :show-file-list='false'>
            <el-button type="primary">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-upload>
    </el-row>
    <!-- tabs标签页 v-model 绑定选中标签的name-->
    <el-tabs v-model="activeName" @tab-click='changeTabs'>
        <!-- 全部素材页 返回的全部内容放这里 -->
        <el-tab-pane label="全部" name="all">
          <div class="imgList">
            <el-card class="imgCard" v-for="(item,index) in list" :key="item.id">
                <!-- 显示图片 -->
                <img :src="item.url" alt="" @click="openDialog(index)">
                <!-- 删除和收藏 -->
                <el-row class="act" type="flex" align="middle" justify="space-around">
                    <i class="el-icon-s-promotion" :style="{color: item.is_collected ? 'rgb(141, 1, 255)': 'black'}" @click="collectImg(item)"></i>
                    <i class="el-icon-delete-solid" @click="delImg(item.id)"></i>
                </el-row>
            </el-card>
          </div>
        </el-tab-pane>
        <!-- 收藏素材页  收藏的内容放这里 -->
        <el-tab-pane label="收藏" name="collect">
          <div class="imgList">
            <el-card class="imgCard" v-for="(item,index) in list" :key="item.id">
                <!-- 显示图片 -->
                <img :src="item.url" alt="" @click="openDialog(index)">
            </el-card>
          </div>
        </el-tab-pane>
    </el-tabs>
    <!-- 分页组件 -->
    <el-row style="height:60px" type="flex" align="middle" justify="center">
        <el-pagination background layout="prev,pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage">
        </el-pagination>
    </el-row>
    <!-- 图片预览幻灯片效果 -->
    <!-- visible属性控制显示隐藏 -->
    <!-- @close控制dialog预览框的关闭 @opened="presentOpen"-->
    <el-dialog  :visible="dialogVisible" @close="dialogVisible = false">
      <!-- 图片走马灯 -->
      <!-- autoplay表示是否自动播放 -->
      <el-carousel height="400px" :autoplay="false" ref="presentImg">
        <!-- 循环列表，展示每一项 -->
        <el-carousel-item v-for="item in list" :key="item.id">
          <img style="width:100%;height:100%" :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false, // dialog预览框显示或隐藏
      // clickIndex: -1,
      page: {
        total: 0, // 总页数 初始值0
        currentPage: 1, // 当前点击的页数 初始值1
        pageSize: 8 // 每页显示的个数
      },
      activeName: 'all', // 激活页 默认第一个页
      list: [] // 接受素材数据
    }
  },
  methods: {
    // presentOpen () {

    // },
    // 定义点击图片打开dialog方法
    openDialog (index) {
      // this.clickIndex = index // 将点击的图片的索引给clickIndex
      this.dialogVisible = true // 打开dialog预览框
      this.$refs.presentImg.setActiveItem(index)
    },
    //   定义标签页改变事件
    changeTabs () {
      // 改变标签页,重新获取资源
      // 根据collect的值来改变
      // true时显示收藏资源 false显示全部资源
      // 标签页改变时页码跳回第一页
      this.page.currentPage = 1
      // 重新拉取数据
      this.getMaterial()
    },
    //   定义页码改变事件
    changePage (newPage) {
      // 将点击的页码传给currentPage(当前页)
      this.page.currentPage = newPage
      //   获取数据
      this.getMaterial()
    },
    // 定义上传图片方法
    uploadImg (params) {
    //  params.file就是自己选择的要上传的图片
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 请求方法
        data
      }).then(() => {
        //   上传成功,重新拉去数据
        this.getMaterial()
      }).catch(() => {
        //   上传失败,提示消息
        this.$message.error('图片上传失败', '错误')
      })
    },
    //   获取素材资源
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'get', // 请求方式 默认是get
        // query参数
        params: {
          // 点击收藏时activeName ==='collect' collect值为true
          // 点击全部时activeName ==='all'     collect值为false
          collect: this.activeName === 'collect', // 是否是收藏的图片
          page: this.page.currentPage, // 点击页对应的资源
          per_page: this.page.pageSize // 每页显示数量
        },
        // body参数
        data: {}
      }).then(res => {
        //   请求成功把值给list
        this.list = res.data.results
        // 请求回来后刷新total值
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    // 删除图片
    delImg (id) {
      this.$confirm('是否要删除该素材', '提示').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.$message.success('删除成功')
          //   获取数据
          this.getMaterial()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 收藏图片
    collectImg (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: {
          // 为true就收藏,false不收藏
          collect: !item.is_collected
        }
      }).then(() => {
        const mess = item.is_collected ? '取消' : ''
        this.$message.success(`${mess}收藏成功`)
        // 重新获取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('收藏失败')
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
        .act{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            background: #eee;
            i{
                font-size: 20px;
                cursor: pointer;
            }
        }
    }
}
</style>
