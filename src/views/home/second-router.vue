<template>
 <el-carousel height="555px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://www.17qq.com/img_biaoqing/27645898.jpeg',
        'http://dik.img.kttpdq.com/pic/48/33302/607f7a3f1bd6118a_1024x768.jpg',
        'http://5b0988e595225.cdn.sohucs.com/images/20181018/b44bcf15207a4964bd7d59afd5182d82.jpeg'
      ]
    }
  }
}
</script>

<style>
.el-carousel img {
    width: 1089px;
    height: 555px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
