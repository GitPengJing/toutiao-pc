import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入element
import 'element-ui/lib/theme-chalk/index.css' // 引入element样式
import '@/styles/index.less' // 引入初始化样式

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
