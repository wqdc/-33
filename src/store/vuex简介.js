import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex 声明变量
// 声明在state里声明
// 取数据：在$store.state.属性名里取

// Vuex修改数据
//  - 自产自销
//  - 规范：函数命名采用大驼峰
// mutations：函数（在这个函数里面进行数据的操作）
// metations里的函数的参数
// 第一个参数-------state：数据
// 第二个参数-------payload: 参数
// getters ---->>>  计算属性
// 第一个参数-------state：数据

// 触发mutations里面的方法
//  - this.$store.commit('mutation里面的相关方法名',参数)
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SUB_FN(state, payload) {
      state.count += payload
    }
  }
})
