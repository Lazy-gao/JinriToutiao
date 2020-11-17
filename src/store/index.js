import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from 'utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 每次都从本地存储里面读取数据作为初始化数据
    user: getItem(USER_KEY)
    // user: JSON.parse(window.localStorage.getItem('user')) // 当前登录用户的登录状态（token等数据）
  },
  mutations: {
    // 把传递过来的数据存到state中的状态里面
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新数据丢失，我们还需要把数据放在本地存储中，这里仅仅是为了持久化保存数据
      setItem(USER_KEY, state.user)
      // state.user是对象，不能存在本地存储中，所以要先转换成JSON字符串格式
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
