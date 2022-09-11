import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName: "bause" */'@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName: "bause" */'@/views/QA')
      },
      {
        path: '/profile',
        component: () => import(/* webpackChunkName: "My" */'@/views/My')
      }
    ]
  },
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
