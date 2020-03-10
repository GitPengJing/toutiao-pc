<template>
<div class="coverImg">
 <div class="imgList" @click="openDialog(index)" v-for="(item,index) in list" :key="index">
     <img :src="item ? item : defaultImg" alt="">
 </div>
 <!-- 点击图片弹出弹框 -->
 <el-dialog :visible="hideOrShow" @close='hideOrShow=false'>
   <select-img @sendUrl="receiveImg"></select-img>
 </el-dialog>
</div>
</template>

<script>
export default {
  props: ['list'], // 接收父组件传来的值
  data () {
    return {
      hideOrShow: false, // 默认隐藏
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片
      clickIndex: -1 // 点击的索引
    }
  },
  methods: {
    // 打开弹层
    openDialog (index) {
      this.hideOrShow = true
      this.clickIndex = index
    },
    // 传递图片地址和索引给父组件
    receiveImg (url) {
      // url是select-img组件传来的地址
      this.$emit('secondUrl', url, this.clickIndex)
      this.hideOrShow = false // 关闭遮罩层
    }
  }
}
</script>

<style lang='less' scoped>
.coverImg{
    display: flex;
    justify-content: space-between;
    margin:20px 100px;
    .imgList{
        width: 260px;
        height: 300px;
        border: 1px solid #ccc;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
