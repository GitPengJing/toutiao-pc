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
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2478071779,844350194&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583943054504&di=a231d601b6c7c23f630ec8c48ec12c75&imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Flarge%2F5e11df3fgw1ed0vzdglu9j21hc0u0k3y.jpg',
        'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1207/24/c0/12524707_1343120823221.jpg'
      ]
    }
  }
}
</script>

<style>
.el-carousel__item img {
    width: 100%;
    height: 100%;
  }
</style>
