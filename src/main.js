import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element
import 'element-ui/lib/theme-chalk/index.css' // 引入element样式
import '@/styles/index.less' // 引入初始化样式
import axios from '@/utils/request.js' // 引入封装的拦截器
import Components from '@/components'
import '@/permission'

Vue.use(Components) // 注册全局自定义组件
// axios给全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
