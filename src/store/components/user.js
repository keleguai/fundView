export default {
  state: {
    /**
     *用来储存用户的基本信息
     */
    info: {
      age: null,
      autograph: null,
      bankCardNumber: null,
      identityCard: null,
      name: null,
      photoUrl: '/static/default.jpg',
      questionResult: null,
      sex: null,
      showMe: false,
      userId: null,
      userName: null
    },
    isGetInfo:false,
    type:0,
  },
  getters: {
  },
  mutations:{
    /**
     * 设置userInfo
     * @param state
     * @param userInfo
     */
    setUserInfo: function (state, userInfo) {
      state.info = userInfo
      state.isGetInfo = true
      state.info.photoUrl = state.info.photoUrl
    },
    setType: function(state,type){
      state.type = type
    },
    clearType: function(state){
      state.type = 0
    },
    /**
     * 重置userInfo
     */
    resetUserInfo: function (state) {
      state.info = {
        age: null,
        autograph: null,
        bankCardNumber: null,
        identityCard: null,
        name: null,
        photoUrl: '/static/default.jpg',
        questionResult: null,
        sex: null,
        showMe: null,
        userId: null,
        userName: null,
      }
      state.isGetInfo = false
    }
  }
}
