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
    <div class="article_list" v-for="item in 40" :key="item">
        <div class="left">
            <img src="http://img4.imgtn.bdimg.com/it/u=3702646542,3323248730&fm=26&gp=0.jpg" alt="">
            <div class="info">
                <span>lfdffdfs</span>
                <el-tag style="width:60px;text-align:center">已审核</el-tag>
                <span class="date">2020-12-90</span>
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
      channels: [] // 用来装频道获取的数据
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels' // 请求地址
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
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
