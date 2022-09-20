import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/iconfont/iconfont.css'
// 引入flexible
import 'amfe-flexible'
// 引入css样式包
import 'github-markdown-css'
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
