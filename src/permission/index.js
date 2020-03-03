// 用来做导航守卫
// 给路由看门的
// 处理路由权限问题
import router from '@/router'
router.beforeEach(function (to, from, next) {
  // to 去哪里
  // from 从哪来
  // next 必须执行 next()表示通过
  // 判断
  // 去主页相关的必须有要是 检查/home开头的
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      //   有token直接放过
      next()
    } else {
      // 没有token去登录
      next('/login')
    }
  } else {
    next() // 不是跟主页相关的直接放过
  }
})
