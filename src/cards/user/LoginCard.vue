<template>
  <md-card class="md-layout md-elevation-24" md-with-hover>
    <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-25 md-size-25 md-small-hide">
      <md-card-media>
        <img src="/static/config/login.jpg"/>
      </md-card-media>
    </div>

    <md-card
      class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-70 md-size-70 md-elevation-0">
      <md-card-header>
        <div class="md-title" style="text-align: left">
          登录到宅基通
        </div>
        <div class="md-subhead">
          <p>从这里开始规划您的 二次元/动漫/游戏 基金</p>
        </div>
      </md-card-header>

      <md-card-content>
        <md-field :class="isPhone(form.phone_number)">
          <md-icon>phone</md-icon>
          <label>手机号码</label>
          <md-input :disabled="false" v-model="form.phone_number">
          </md-input>
          <span class="md-error">这不是一个正确的手机号码</span>
        </md-field>

        <md-field>
          <md-icon>lock</md-icon>
          <label>密码</label>
          <md-input type="password" v-model="form.password" maxlength="20">
          </md-input>
        </md-field>
      </md-card-content>


      <md-card-actions>
        <md-button class="md-default" style="background-color: white;color: #555" to="/forget-psw">
          <md-icon>help</md-icon>
          找回密码？
        </md-button>
        <md-button class="md-default" style="background-color: white;color: #555"
                   to="/register">
          <md-icon>add</md-icon>
          注册
        </md-button>
        <md-button class="md-primary md-raised" v-on:click="login">
          <md-icon>done</md-icon>
          登陆
        </md-button>
      </md-card-actions>
    </md-card>
  </md-card>
</template>

<script>
  export default {
    name: "LoginCard",
    data() {
      return {
        form: {
          phone_number: null,
          password: null
        }
      }
    },
    methods: {
      isPhone(phone_number) {
        if (phone_number)
          return this.$myapi.isPhone(phone_number) ? '' : 'md-invalid';
        else return ''
      },
      login() {
        let _this = this;
        if (_this.isPhone(_this.form.phone_number)) {
          return
        }
        this.$myapi.post('/user/login', _this.form, function (res) {
          _this.$store.commit("login");
          // 设置用户类型
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("type", res.data.type);
          _this.$router.push("/")
            _this.$myapi.get("/user_info/me", null, function (res) {
              _this.user_info = res.data
              res.data.bankCardNumber = res.data.bankCardNumber.split('-')
              _this.$store.commit('setUserInfo',res.data)
            })
        })
      },
    },

  }
</script>

<style scoped>

</style>
