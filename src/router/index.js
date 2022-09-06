import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    // SPA
    // 首屏加载速度很慢
    // - 使用了路由页面，再去请求
    // - component可以写成一个函数  里面return一个import函数，传参是具体vue文件的路劲
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
