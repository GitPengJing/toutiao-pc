<template>
<!-- 标签页 -->
<el-tabs v-model="activeName">
    <!-- 全部素材标签页 -->
    <el-tab-pane label="素材库" name="material">
        <div class="imgList">
            <!-- 循环生成图片 -->
            <el-card class="imgItem" v-for="item in list" :key="item.id">
                <img :src="item.url" alt="" @click="clickImg(item.url)">
            </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" align="middle" justify="center" style="height:60px">
            <el-pagination layout="prev,pager,next"
            background
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            @current-change="changePage">
            </el-pagination>
        </el-row>
    </el-tab-pane>
    <!-- 上传图片标签页 -->
    <el-tab-pane label="上传图片" name="upload">
      <el-upload action=""
      class="uploadImg"
      :show-file-list="false"
      :http-request="uploadImg">
      <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 对应标签页
      list: [], // 装图片数据
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页
        pageSize: 9 // 每页图片数
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      // file类型参数用FormData实例对象传
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        // 把地址给父组件
        this.$emit('sendUrl', res.data.url)
        this.$message.success('上传成功')
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    // 点击图片传地址给父组件
    clickImg (url) {
      this.$emit('sendUrl', url)
    },
    // 页码改变
    changePage (newPage) {
      this.page.currentPage = newPage // 新页码
      this.getImg() // 获取数据
    },
    // 获取全部素材
    getImg () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: false, // 请求全部是素材
          page: this.page.currentPage, // 当前页
          per_page: this.page.pageSize // 每页数量
        }
      }).then(res => {
        this.list = res.data.results // 请求回来的数据给list
        this.page.total = res.data.total_count // 总页码赋值
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang='less' scoped>
.imgList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .imgItem{
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
        img{
            width: 160px;
            height: 160px;
        }
    }
}
.uploadImg {
  display: flex;
  justify-content: center;
  i {
    font-size: 40px;
    color: rgb(255, 251, 0);
    padding: 80px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
  i:hover{
    border-color: rgb(176, 6, 199);
  }
}
</style>
