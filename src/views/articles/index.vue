<template>
<el-card class="articles">
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
     <template slot="title">内容管理</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-form>
        <!-- 文章状态 -->
        <el-form-item label="文章状态:">
            <!-- 放置单选按钮 -->
            <!-- label为该状态对应的值 -->
            <!-- 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
            <el-radio-group v-model="formNumber.status">
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- 频道类型 -->
        <el-form-item label="频道类型:">
            <!-- 下拉选择菜单 -->
            <el-select placeholder="请选择频道" v-model="formNumber.channel_id">
                <el-option v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- 时间范围 -->
        <el-form-item label="时间范围:">
            <!-- 时间范围插件 -->
            <el-date-picker type="daterange" v-model="formNumber.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
    <!-- 文章主体 -->
    <el-row class="total" type="flex" align="middle">
        <span>共找到10000条符合条件的内容</span>
    </el-row>
    <!-- 循环生成每一个文章内容 toString(): 返回表示 Integer 值的 String 对象。-->
    <div class="article_list" v-for="item in list" :key="item.id.toString()">
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
            <div class="info">
                <span>{{item.title}}</span>
                <el-tag style="width:60px;text-align:center"
                :type="item.status|filterType">
                {{item.status|filterStatus}}
                </el-tag>
                <span class="date">{{item.pubdate}}</span>
            </div>
        </div>
        <div class="right">
            <span><i class="el-icon-edit"></i>编辑</span>
            <span><i class="el-icon-delete"></i>删除</span>
        </div>
    </div>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 存form中的数据
      formNumber: {
        //   文章状态
        // 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 定义5位全部
        status: 5, // 默认为全部
        // 频道id
        channel_id: null, // 默认没有频道
        // 日期范围
        dateRange: []
      },
      channels: [], // 用来装频道获取的数据
      list: [], // 装文章数据
      defaultImg: require('../../assets/img/defaultImg.jpeg') // 放置没传图片的文章的默认封面
    }
  },
  filters: {
    //   通过过滤器显示不同状态
    filterStatus (value) {
      switch (value) {
        //   0-草稿，1-待审核，2-审核通过，3-审核失败
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已审核'
        case 3:
          return '审核失败'
      }
    },
    // 根据状态显示不同类型
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels', // 请求地址
        method: 'get' // 请求方式 不写默认get
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 获取文章数据
    getArticles () {
      this.$axios({
        url: '/articles',
        method: 'get'
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.articles{
    .total{
        height: 50px;
        margin-top: 30px;
        border-bottom: 1px dashed #ccc;
    }
    .article_list{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
        .left{
            display: flex;
            img{
                width: 160px;
                height: 100px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 10px;
                .date{
                    font-size: 12px;
                    color: #666;
                }
            }
        }
        .right{
            span{
                font-size: 12px;
                margin-right: 10px;
                cursor: pointer;
            }
            span:hover{
                color: rgb(195, 0, 255);
            }
        }
    }
}
</style>
