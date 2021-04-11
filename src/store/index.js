import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:window.sessionStorage.getItem("user"),
    token:window.sessionStorage.getItem("token")
  },
  mutations: {
    //将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
      state.token = data
      window.sessionStorage.setItem('token', data) 
      // console.log(state.token); 
    },
    //获取用户名
    SET_USER: (state, data) => {
      // 把用户名存起来
      state.username = data
      window.sessionStorage.setItem('user', data)
      // console.log(state.username);
    },
    //登出
    LOGOUT: (state) => {
    // 登出的时候要清除token
      state.token = null
      state.username = null
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})

//console.log(JSON.parse(this.$store.state.username).token) 这是token的值 在其他组件可以直接使用  需要转化成字符串

