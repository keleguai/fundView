import Vuex from 'vuex'
import Vue from 'vue'
import user from './components/user'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    prePath:'/',
    isLogin: false,
    isAndroid: true,
    isLoading: false,
    words: [],
    type: 0,
    // 弹框的数据
    msg: {
      isLoadDialog: false,
      code: null,
      content: null
    },
  },
  mutations: {
    setPrePath(state,path){
      state.prePath = path
    },
    setTyep(state,type){
      state.type = type
    },
    show(state) {
      state.isLoading = true
    },
    hide(state) {
      state.isLoading = false
    },
    isComputer(state) {
      state.isAndroid = false
    },
    login(state) {
      state.isLogin = true
    },
    loginByToken(state,boolean){
      state.isLogin = boolean
    },
    logout(state) {
      state.isLogin = false
      this.commit("clearType")
      this.commit("resetUserInfo")
    },
    showDialog(state, para) {
      state.msg.isLoadDialog = true
      state.msg.code = para.code
      state.msg.content = para.content
    },
    closeDialog(state){
      state.msg.isLoadDialog = false
    },
    setWords(state, words) {
      state.words = words
    }
  }
})
