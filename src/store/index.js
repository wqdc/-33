import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// vuex-persistedstate --->持久化state
// 1.- - - 下载
// - - yarn add vuex-persistedstate
// 2.- - 引入
// import createpresistedstate from vuex
// 3.- - 调用
//  plugins:[createPersistedstate]
// 配置项
// key: 默认值是vuex
// storage: 存储的方式 默认时本地存储
// reducer: 指定持久化哪些数据。return一个对象作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // Storage: window.sessionStorage,
      reducer({ tokenObj, myChannels, histories, isTrue }) {
        return { tokenObj, myChannels, histories, isTrue }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: [],
    follow: false

  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
    },
    SET_MY_CHANNELS(state, payload) {
      state.myChannels = payload
    },
    /**
     * @param {*} histories  删除或者添加以后的搜索历史
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  }
})
