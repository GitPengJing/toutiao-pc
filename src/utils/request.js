// 作为拦截器
import axios from 'axios' // 引入axios
import router from '@/router'
// 设置默认请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios请求拦截器  请求到达后台之前
// 第一个函数是成功时执行
// 第二个函数失败是执行
axios.interceptors.request.use(function (config) {
  // 统一注入token原因：
  // 每次请求时都要传一次token 的请求头参数 ，且格式相同
  // config是axios请求的所有信息
  // 请求成功 获取token
  const token = window.localStorage.getItem('user-token')
  // 统一注入token
  config.headers.Authorization = `Bearer ${token}`
  // 将注册完token的axios请求信息config返回
  return config
}, function (error) {
// 如果请求失败，返回错误
  return Promise.reject(error)
}
)

// axios 响应拦截器  执行then方法之前
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : { }
}, function (error) {
  // 错误执行该函数
  // error中包含所有错误的状态码
  if (error.response.status === 401) {
    // 401表示token过期/token错误/token名错误等
    // 删除token
    window.localStorage.removeItem('user-token')
    //   回到登录页
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios // 导出axios
