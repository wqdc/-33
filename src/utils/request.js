// 1.yarn add axios
// 2.引入axios
// 3.配置axios
import store from '@/store'
import axios from 'axios'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000

// 避免耦合性过强 使用axios.create  克隆axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

request.interceptors.request.use(function (config) {
  const {
    getters: { isLogin },
    state: { tokenObj }
  } = store
  if (isLogin) {
    config.headers.Authorization = `Bearer ${tokenObj.token}`
  }
  return config
})
export default request
