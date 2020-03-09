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
            <span @click="$router.push(`/home/publish/${item.id.toString()}`)"><i class="el-icon-edit"></i>编辑</span>
            <span @click="delArticles(item.id.toString())"><i class="el-icon-delete"></i>删除</span>
        </div>
    </div>
    <!-- 分页 -->
    <el-row type="flex" style="height:60px" align="middle" justify="center">
      <el-pagination background
      layout="prev,pager,next"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change="changePage">
      </el-pagination>
    </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页数据
      page: {
        total: 0, // 总页
        currentPage: 1, // 当前页
        pageSize: 10 // 每页显示数
      },
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
  // watch监听事件监听表单数据的改变 也可以给表单数据绑定change事件
  watch: {
    formNumber: {
      deep: true, // 表示可以找到formNumber中的任何数据
      // handlder固定写法 formNumber中任何数据变化都会触发该函数
      handler: function () {
        // 切换频道或切换状态或改变时间范围时页码回到第一页
        this.page.currentPage = 1
        this.changeForm()
      }
    }
  },
  methods: {
    // 删除文章
    delArticles (id) {
      console.log(id)
      // 友好提示
      this.$confirm('你真的要删除吗', '友情提示').then(() => {
        // 点击确定后
        this.$axios({
          url: `/articles/${id}`, // 请求地址
          method: 'delete' // 请求接口
        }).then(() => {
          this.$message.success('删除成功')
          this.changeForm()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 页码改变
    changePage (newPage) {
      this.page.currentPage = newPage
      this.changeForm()
    },
    // 根据条件获取文章
    changeForm () {
      const params = {
        page: this.page.currentPage, // 当前页
        per_page: this.page.pageSize, // 每页显示数
        // 文章状态 5 为全部 默认值 可不传
        status: this.formNumber.status === 5 ? null : this.formNumber.status,
        // 频道
        channel_id: this.formNumber.channel_id,
        // 时间范围
        // 起始时间 dateRange返回的值是一个数组 第一个值为起始时间 第二个值是结束时间
        // 时间范围数组的长度为0 则不传值
        begin_pubdate: this.formNumber.dateRange.length ? this.formNumber.dateRange[0] : null,
        // 结束时间
        // 必须输入起始时间才可以选结束时间 所以判断条件为时间范围数组长度大于1
        end_pubdate: this.formNumber.dateRange.length > 1 ? this.formNumber.dateRange[1] : null
      }
      // 调用获取文章方法 传入参数
      this.getArticles(params)
    },
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
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params // 请求参数
      }).then(res => {
        this.list = res.data.results
        // 请求回来返回文章总数
        this.page.total = res.data.total_count
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
