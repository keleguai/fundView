<template>
  <!--卡片包含-->
  <md-card class="md-elevation-24" md-with-hover>
    <img src="/static/config/register.png"/>
    <md-card-content>
      <!--显示注册说明模块-->
      <div class="md-title" style="text-align: left">注册</div>

      <!--手机号字段-->
      <md-field :class="isPhone(form.phone_number)">
        <md-icon>phone</md-icon>
        <label>手机号</label>
        <md-input  v-model="form.phone_number">
        </md-input>
        <md-button>获取手机验证码</md-button>
        <span class="md-error">这不是一个正确的手机号码</span>
      </md-field>

      <!--手机验证码模块，这里不做字段要求-->
      <md-field>
        <md-icon>bookmark</md-icon>
        <label>手机验证码</label>
        <md-input>
        </md-input>
      </md-field>

      <!--输入密码字段模块-->
      <md-field :class="$myapi.isPassword(form.password)">
        <md-icon>lock</md-icon>
        <label>密码</label>
        <md-input type="password" v-model="form.password" maxlength="20">
        </md-input>
        <span class="md-error" v-if="form.password">密码不可以少于6位哦</span>
      </md-field>

    </md-card-content>

    <!--点击按钮注册模块-->
    <md-card-actions>
      <md-button to="/login"><md-icon>help</md-icon>登录？
      </md-button>
      <md-button class="md-raised md-primary" v-on:click="register"><md-icon>done</md-icon>注册
      </md-button>
    </md-card-actions>

  </md-card>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        // 小人物说的话
        words: ['<b style="color:orange">注册享好礼哦，可是什么是好礼呢~~~当然是拥有账号啦</b>'],
        // 注册使用的表单
        form: {
          password: '',
          phoneNumber: '',
        },
      }
    },
    methods: {
      isPhone(phone_number) {
        if (phone_number)
          return this.$myapi.isPhone(phone_number) ? '' : 'md-invalid'
        else return ''
      },
      isNull(password) {
        if (password)
          return this.$myapi.isPassword(password) ? '' : 'md-invalid'
        else return ''
      },
      register() {
        let _this = this;
        if (_this.$myapi.isPhone(_this.form.phone_number) && !_this.$myapi.isPassword(_this.form.password)) {
          this.$myapi.post('/user/add', _this.form, function (res) {
            _this.$alert.show(100, "注册成功辣+请填写详细资料哦")
            sessionStorage.setItem("token", res.token)
            _this.$router.push("/register-more")
          })
        } else {
          _this.$alert.show("999", "填写格式错误")
        }
      }
    },
  }
</script>

<style scoped>
  .my-hover:hover {
    cursor: url('/static/mouse/mouse2.cur'), auto !important;
    background-color: rgba(255, 255, 255, .8);
  }

  .my-raised {
    background-color: rgba(10, 10, 0, .1);
    border-radius: 7px;
  }
</style>
