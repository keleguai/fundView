<template>

  <md-card>

    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-40 md-large-size-40  md-medium-size-40 md-small-size-40 md-xsmall-size-40">
        <md-card-media md-ratio="1:1">
          <img :src="$store.state.user.info.photoUrl" class="want " id="head_img" style="width: 100%;text-align: left"/>
        </md-card-media>
      </div>


      <div class="md-layout-item md-size-60 md-large-size-60 md-medium-size-60 md-small-size-100 md-xsmall-size-100"
           v-if="$store.state.isLogin">
        <md-card-content>
          <p>昵称：{{$store.state.user.info.userName}}</p>
          <p>性别：{{$store.state.user.info.sex==0?'女':'男'}}</p>
          <p>签名：{{$store.state.user.info.autograph}}</p>
          <p>年龄：{{$store.state.user.info.age}}</p>
        </md-card-content>
        <md-card-actions>
          <md-button  to="/mymoney"><md-icon>work_outline</md-icon>小钱包包</md-button>
        </md-card-actions>
      </div>
      <div v-else>
        <p style="color: rgba(0,0,0,1);font-size: 25px">游客...是我！</p>
        <p style="color: rgba(0,0,0,1);font-size: 23px">但游客...！</p>
        <p style="color: rgba(0,0,0,1);font-size: 20px;">可以登录！</p>
        <p style="color: rgba(0,0,0,1);font-size: 17px;">点我！<span style="color: aquamarine;text-decoration-line: underline" v-on:click="$router.push('/login')">登录叭！</span></p>
        <p style="color: rgba(0,0,0,1);font-size: 14px;">嘤嘤嘤......<span style="color: red;font-size: 10px">推荐基金➡</span></p>
        <p style="color: rgba(0,0,0,1);font-size: 10px;">如果不登录的话......</p>
        <p style="color: rgba(0,0,0,1);font-size: 7px;">会被魔鬼抓走哦......</p>
        <p style="color: rgba(0,0,0,1);font-size: 5px;">魔鬼很坏很坏很坏der......</p>
        <p style="color: rgba(0,0,0,1);font-size: 2px;">会给你好多好多钱......</p>
      </div>

    </div>
  </md-card>
</template>

<script>
  export default {
    name: "UserCard",
    data() {
      return {
      }
    },
    methods: {
      getMe() {
        let _this = this
        this.$myapi.get("/user_info/me", null, function (res) {
          res.data.bankCardNumber = res.data.bankCardNumber.split('-')
          _this.$store.commit('setUserInfo',res.data)
        })
      },
      logout() {
        sessionStorage.clear()
        this.$store.commit("logout")
      },

    },
    created() {
      this.$store.commit("loginByToken",sessionStorage.hasOwnProperty("token"))
      if (this.$store.state.isLogin) {
        this.getMe()
      }
    }
  }

</script>

<style scoped>

</style>
