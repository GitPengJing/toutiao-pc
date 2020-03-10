import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor' // 引入富文本框组件
import coverImg from './publish/cover-img' // 引入封面图片组件
import selectImg from './publish/select-img' // 引用选择图片(素材库、上传图片)组件

// 引入富文本框css样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('cover-img', coverImg)
    Vue.component('select-img', selectImg)
    // 全局使用富文本框
    Vue.use(VueQuillEditor)
  }
}
