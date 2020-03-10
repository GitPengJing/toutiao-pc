import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home' // 引入home组件
import Login from '@/views/login' // 引入login组件
import SecondRouter from '@/views/home/second-router' // 引入二级路由
Vue.use(VueRouter)

const routes = [
  {
    path: '*', // 没有组件的路由
    component: () => import('@/views/404')
  },
  {
    path: '/',
    redirect: '/home' // 强制跳转到home页
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 二级路由组件
    children: [
      {
        path: '',
        component: SecondRouter
      }, {
        path: 'comment', // 评论列表
        component: () => import('@/views/comment') // 按需加载的方式
      }, {
        path: 'material', // 素材管理
        component: () => import('@/views/material')
      }, {
        path: 'articles', // 内容管理
        component: () => import('@/views/articles')
      }, {
        path: 'publish/:articleID?', // 发表文章
        component: () => import('@/views/publish')
      }, {
        path: 'account', // 账户信息
        component: () => import('@/views/account')
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   按需加载写法
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
