<template>
  <div>
    <md-card class="md-layout md-elevation-24" md-with-hover>
      <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-25 md-size-25 md-small-hide">
        <md-card-media>
          <img src="/static/config/login.jpg"/>
        </md-card-media>
      </div>
      <md-card
        class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-70 md-size-70 md-elevation-0">
        <md-card-header>
          <div class="md-title" style="text-align: left;">
            忘记了帐户密码?
          </div>
          <p>
            别担心, 您可通过手机来重设帐户密码
          </p>
        </md-card-header>
        <md-card-content>

          <md-card-actions>
          <md-field :class="isPhone(form.phone_number)">
            <md-icon>phone</md-icon>
            <label>手机号码</label>
            <md-input :disabled="false" v-model="form.phone_number">
            </md-input>
            <span class="md-error">这不是一个正确的手机号码！</span>
          </md-field>

          <md-field>
            <md-icon>bookmark</md-icon>
            <label>手机验证码</label>
            <md-input>
            </md-input>
          </md-field>
            <md-button class="md-default">获取验证码</md-button>
          </md-card-actions>
          <md-field :class="$myapi.isPassword(form.password)">
            <md-icon>lock</md-icon>
            <label>密码</label>
            <md-input type="password" v-model="form.password">
            </md-input>
            <span class="md-error">密码不可以少于6位哦！</span>
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button  to="/login"><md-icon>help</md-icon>登陆？
          </md-button>
          <md-button
                     to="/register"><md-icon>help</md-icon>注册？
          </md-button>
          <md-button class="md-primary md-raised"
                     v-on:click="resetPsw"><md-icon>done</md-icon>修改密码
          </md-button>
        </md-card-actions>
      </md-card>
    </md-card>
  </div>

</template>

<script>

  export default {
    name: 'ForgetPswCard',
    components: {},
    data() {
      return {
        form: {
          phone_number: null,
          password: null
        },
      }
    },
    computed: {},
    methods: {
      isPhone(phone_number) {
        if (phone_number)
          return this.$myapi.isPhone(phone_number) ? '' : 'md-invalid';
        else return ''
      },
      resetPsw() {
        let _this = this;
        if (_this.isPhone(_this.form.phone_number)||_this.$myapi.isPassword(_this.form.password)) {
          return
        }
        this.$myapi.post('/user/update', _this.form, function (res) {
          _this.$alert.show(100, "已完成相对应操作")
        })
        // }
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-raised {
    background-color: rgba(10, 10, 0, .1);
    border-radius: 7px;
  }

  .my-hover:hover {
    cursor: url('/static/mouse/mouse2.cur'), auto !important;
    background-color: rgba(255, 255, 255, .8);
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .md-card {
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

</style>
