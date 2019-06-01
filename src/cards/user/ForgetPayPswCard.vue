<template>
  <md-card class="md-elevation-24" md-with-hover>
    <md-card-content>


      <md-field v-if="$store.state.isLogin" >
        <md-icon>bookmark</md-icon>
        <label>手机验证码</label>
        <md-input>
        </md-input>
        <md-button>获取手机验证码</md-button>
      </md-field>

      <md-field v-if="$store.state.isLogin" :class="$myapi.isNull(form.payPassword)||$myapi.isPayPassword(form.payPassword)">
        <md-icon>lock</md-icon>
        <label>支付密码</label>
        <md-input type="password" v-model="form.payPassword"></md-input>
        <span class="md-error" v-if="$myapi.isNull(form.payPassword)">支付密码是必填项</span>
        <span class="md-error" v-if="$myapi.isPayPassword(form.payPassword)&&form.payPassword">支付密码位6位数字</span>
      </md-field>


    </md-card-content>



    <md-card-actions>
      <md-button class="md-primary md-raised" v-if="$store.state.isLogin" v-on:click="update_user_info"><md-icon>done</md-icon>保存</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
  export default {
    name: "ForgetPayPsw",
    data() {
      return {
        age_temp:[],
        nextFlag: false,
        config: {
          headers: {'Content-Type': 'multipart/form-data'}
        },
        file: null,
        form: {
          payPassword: null,
        }
      }
    },
    created() {
      for(let i=1;i<130;i++){
        this.age_temp.push(i)
      }
    },
    methods: {
      update_user_info() {
        if(this.$myapi.isNull(this.form.payPassword)||this.$myapi.isPayPassword(this.form.payPassword)){
          return
        }
        let _this = this
        this.$myapi.post('/user_info/update', _this.form, function (res) {
          _this.$alert.show(100, "保存成功辣")
        })
      },
    }
  }
</script>

<style scoped>

</style>
