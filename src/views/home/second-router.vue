<template>
 <div class="block">
    <el-carousel height="530px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1207/24/c0/12524707_1343120823221.jpg',
        'http://img.zcool.cn/community/016bed56e3072832f875520fce0db0.jpg@1280w_1l_2o_100sh.jpg',
        'http://attach.bbs.miui.com/forum/201408/07/213833xcc9tcimulmivuc4.jpg'
      ]
    }
  }
}
</script>

<style>
.el-carousel__item img {
    width: 100%;
  }
</style>
