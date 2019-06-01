<template>
  <md-card :class="!$store.state.isLogin?'md-elevation-24':''" md-with-hover>
    <md-card-content v-if="!nextFlag">


      <md-field :class="$myapi.isNull(form.userName)">
        <md-icon>face</md-icon>
        <label>用户名</label>
        <md-input v-model="form.userName" maxlength="7"></md-input>
        <span class="md-error">用户名是必填项</span>
      </md-field>


      <md-field>
        <md-card-header>
          <p><md-icon>bookmark</md-icon>编辑头像</p>
          <md-card-media md-ratio="1:1">
            <img :src="$store.state.user.info.photoUrl" @click="openFile"/>
          </md-card-media>
          <md-input maxlength="30" @click="openFile" v-model="form.photoUrl"></md-input>
        </md-card-header>
        <input id="photo" type="file" @change="update" style="display: none"/>
      </md-field>

      <md-field :class="$myapi.isNull(form.identityCard)||$myapi.isIdCard(form.identityCard)" v-if="!$store.state.isLogin">
        <md-icon >star</md-icon>
        <label>身份证</label>
        <md-input v-model="form.identityCard"></md-input>
        <span class="md-error" v-if="$myapi.isNull(form.identityCard)">身份证是必填项</span>
        <span class="md-error" v-if="$myapi.isIdCard(form.identityCard)&&form.identityCard">身份证格式不正确</span>
      </md-field>


      <md-field :class="$myapi.isNull(form.name)" v-if="!$store.state.isLogin">
        <md-icon >assignment_turned_in</md-icon>
        <label>真实姓名</label>
        <md-input v-model="form.name" maxlength="10"></md-input>
        <span class="md-error">真实姓名是必填项</span>
      </md-field>

      <md-field v-if="!$store.state.isLogin" :class="$myapi.isNull(form.bankCardNumber)">
        <md-icon >forward</md-icon>
        <label>银行卡号</label>
        <md-input v-model="form.bankCardNumber" maxlength="30"></md-input>
        <span class="md-error">银行卡号是必填项</span>
      </md-field>


      <md-field v-if="!$store.state.isLogin" :class="isPhone(phone_number)||$myapi.isNull(phone_number)">
        <label>银行卡绑定的手机号</label>
        <md-input v-model="phone_number">
        </md-input>
        <md-button >获取手机验证码</md-button>
        <span class="md-error" v-if="isPhone(phone_number)">手机号码格式不正确</span>
        <span class="md-error" v-if="$myapi.isNull(phone_number)">手机号码不可为空</span>
      </md-field>

      <md-field v-if="!$store.state.isLogin">
        <label>手机验证码</label>
        <md-input>
        </md-input>
      </md-field>


      <md-field v-if="!$store.state.isLogin"
                :class="$myapi.isNull(form.payPassword)||$myapi.isPayPassword(form.payPassword)">
        <md-icon >lock</md-icon>
        <label>支付密码</label>
        <md-input type="password" v-model="form.payPassword"></md-input>
        <span class="md-error" v-if="$myapi.isNull(form.payPassword)"> 支付密码是必填项</span>
        <span class="md-error" v-if="$myapi.isPayPassword(form.payPassword)&&form.payPassword"> 支付密码为6位数字</span>
      </md-field>


      <md-field>
        <md-icon >translate</md-icon>
        <label>签名</label>
        <md-textarea v-model="form.autograph" maxlength="40"></md-textarea>
      </md-field>

      <md-field>
        <md-icon >room</md-icon>
        <label>是否愿意出现在排行榜中</label>
        <md-select v-model="form.showMe">
          <md-option value="1">是</md-option>
          <md-option value="0">否</md-option>
        </md-select>
      </md-field>
    </md-card-content>

    <md-card-content v-else>
      <div>
        <p>1.你喜欢什么类型的基金</p>
        <p>
          <md-radio :value="0" v-model="form.questionResult[0]">动漫</md-radio>
          <md-radio v-model="form.questionResult[0]" value="1">游戏</md-radio>
          <md-radio v-model="form.questionResult[0]" value="2">其他</md-radio>
        </p>
      </div>
      <div>
        <p>2.您认为您属于哪种投资理念</p>
        <p>
          <md-radio :value="0" v-model="form.questionResult[1]">保守型</md-radio>
          <md-radio v-model="form.questionResult[1]" value="1">稳健型</md-radio>
          <md-radio v-model="form.questionResult[1]" value="2">适中型</md-radio>
          <md-radio v-model="form.questionResult[1]" value="3">风险型</md-radio>
        </p>
      </div>

      <div>
        <p>3.您喜欢有专业机构向您提供投资建议嘛</p>
        <p>
          <md-radio :value="0" v-model="form.questionResult[2]">不喜欢</md-radio>
          <md-radio v-model="form.questionResult[2]" value="1">一般</md-radio>
          <md-radio v-model="form.questionResult[2]" value="2">喜欢</md-radio>
        </p>
      </div>
      <div>
        <p>4.您对资金收益的需求是什么样子的</p>
        <p>
          <md-radio :value="0" v-model="form.questionResult[3]">重在参与</md-radio>
          <md-radio v-model="form.questionResult[3]" value="1">一般</md-radio>
          <md-radio v-model="form.questionResult[3]" value="2">迫切需要</md-radio>
        </p>
      </div>
      <div>
        <p>5.您投资的目的是什么？</p>
        <p>
          <md-radio :value="0" v-model="form.questionResult[4]">为爱发电</md-radio>
          <md-radio v-model="form.questionResult[4]" value="1">理财</md-radio>
          <md-radio v-model="form.questionResult[4]" value="2">打发时间</md-radio>
          <md-radio v-model="form.questionResult[4]" value="3">三者都有</md-radio>
        </p>
      </div>
      <div>
        <p>6.对于投资理财，您认为你您最大的不足是什么？</p>
        <p>
          <md-radio :value="0" v-model="form.questionResult[5]">没有渠道</md-radio>
          <md-radio v-model="form.questionResult[5]" value="1">知识不足</md-radio>
          <md-radio v-model="form.questionResult[5]" value="2">没有时间</md-radio>
          <md-radio v-model="form.questionResult[5]" value="3">风险过大</md-radio>
        </p>
      </div>
      <div>
        <p>7.您了解的基金是通过什么渠道？</p>
        <p>
          <md-radio :value="0" v-model="form.questionResult[6]">广告</md-radio>
          <md-radio v-model="form.questionResult[6]" value="1">喜欢的公司</md-radio>
          <md-radio v-model="form.questionResult[6]" value="2">朋友推荐</md-radio>
          <md-radio v-model="form.questionResult[6]" value="3">其他</md-radio>
        </p>
      </div>

    </md-card-content>


    <md-card-actions>
      <md-button  v-if="$store.state.isLogin" to="/forget-paypsw"><md-icon>lock</md-icon>忘记支付密码？</md-button>
      <md-button  v-if="$store.state.isLogin" v-on:click="update_user_info" class="md-primary md-raised"><md-icon>done</md-icon>保存</md-button>
      <md-button  class="md-primary md-raised" v-else-if="!nextFlag" v-on:click="next"><md-icon>done</md-icon>下一步</md-button>
      <md-button  v-else-if="nextFlag" v-on:click="nextFlag=false">上一步</md-button>
      <md-button  v-if="nextFlag" v-on:click="save">保存</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
  export default {
    name: "Edit",
    data() {
      return {
        age_temp: [],
        nextFlag: false,
        config: {
          headers: {'Content-Type': 'multipart/form-data'}
        },
        phone_number: null,
        file: null,
        tempUrl:null,
        form: {
          name: null,
          photoUrl: null,
          identityCard: null,
          autograph: null,
          questionResult: [0, 0, 0, 0, 0, 0, 0],
          bankCardNumber: null,
          payPassword: null,
          showMe: 1,
          userName: null,
          chunk: '0',
        }
      }
    },
    computed: {},
    created() {
      if (this.$store.state.isLogin) {
        this.getMe()
      }
      for (let i = 1; i < 130; i++) {
        this.age_temp.push(i)
      }
    },
    methods: {
      openFile(){
        document.querySelector('#photo').click()
      },
      next(){
        if(this.isForm()){
          this.nextFlag=true
        }
      },

      isForm() {
        return !(this.$myapi.isNull(this.form.userName) || this.$myapi.isNull(this.form.identityCard) || this.$myapi.isIdCard(this.form.identityCard) || this.$myapi.isNull(this.form.name) || this.$myapi.isNull(this.form.bankCardNumber) || this.isPhone(this.phone_number) || this.$myapi.isNull(this.phone_number) || this.$myapi.isNull(this.form.payPassword) || this.$myapi.isPayPassword(this.form.payPassword))
      },
      isPhone(phone_number) {
        if (phone_number)
          return this.$myapi.isPhone(phone_number) ? '' : 'md-invalid';
        else return ''
      },
      update(e) {
        this.file = new FormData();
        this.file.append('file', e.target.files[0])
        this.tempUrl = this.getObjectURL(e.target.files[0])
        this.form.photoUrl = this.tempUrl
        this.$store.commit("setUserInfo",this.form)
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL) {
          url = window.createObjectURL(file) ;
        } else if (window.URL) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      getMe() {
        let _this = this
        this.$myapi.get("/user_info/me", null, function (res) {
          _this.user_info = res.data
          res.data.bankCardNumber = res.data.bankCardNumber.split('-')
          _this.form = res.data;
          _this.form.showMe = _this.form.showMe ? 1 : 0
          _this.$store.commit('setUserInfo',res.data)
        })
      },
      save() {
        let _this = this;
        let temp = '';
        for (let i = 0; i < _this.form.questionResult.length - 1; i++) {
          temp += _this.form.questionResult[i] + '-'
        }
        temp += _this.form.questionResult[_this.form.questionResult.length - 1];
        _this.form.questionResult = temp;
        this.$myapi.post('/user_info/add', _this.form, function (res) {
          _this.$store.commit("login");
          _this.getMe()
          _this.$alert.show(100, "保存成功辣+看看您的基金吧");
          _this.update_photo();
          _this.$router.push("/")
        })
      },
      update_user_info() {
        if(this.$myapi.isIdCard(this.form.identityCard)||this.$myapi.isNull(this.form.name)||this.$myapi.isNull(this.form.userName)){
          return
        }
        let _this = this;
        this.$myapi.post('/user_info/update', _this.form, function (res) {
          _this.$alert.show(100, "保存成功辣");
          _this.update_photo()
        })
      },
      update_photo() {
        let _this = this;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.$axios.post(global.IP + '/user_info/upload?token=' + sessionStorage.getItem("token"), _this.file, config).then(function (res) {
          if (res.data.code == 100) {
          } else {
            _this.$alert.show(res.data.code, res.data.msg + "(" + _this.form.phoneNumber + ")")
          }
        }).catch(function (error) {
          _this.$alert.show(res.data.code, "保存头像失败啦")
        })
      }
    }
  }
</script>

<style scoped>

</style>
