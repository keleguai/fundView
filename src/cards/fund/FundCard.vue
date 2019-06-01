<template>
  <div>
    <md-dialog :md-active.sync="buy_flag" class="md-elevation-5 " :style="$store.state.isAndroid==true?'width:100%':'width:40%'">
      <md-dialog-content>
        <md-card-header>
          <md-card-media md-ratio="1:1">
            <img :src="buy_info.photo"/>
          </md-card-media>

        </md-card-header>
        <p>购买基金名称：<b>{{buy_info.fundName}}</b>({{buy_info.fundId}})
        </p>
        <p>申购费率：<b>{{buy_info.buyingRate*100}}%</b></p>
        <p>手续费：<b>{{(buy_info.buyingRate*buy_form.transaction_amount).toFixed(2)}}元</b>
        </p>
        <p><b>净值：预计按照{{$myapi.getWhatDay()}}净值确认份额</b>
          <small></small>
        </p>
        <p>买入时间：<b>{{buy_info.thistime}}</b></p>



        <md-field>
          <md-icon>bookmark</md-icon>
          <label>买入金额（1元起）</label>
          <md-input v-model="buy_form.transaction_amount"></md-input>
        </md-field>
        <md-field>
          <!--<md-icon>done</md-icon>-->
          <label>
            请选择银行卡
          </label>
          <md-select v-model="bank" v-show="$store.state.isLogin">
            <md-option v-for="(bankId,index) in $store.state.user.info.bankCardNumber" :value="index">{{bankId}}</md-option>
          </md-select>
        </md-field>
        <md-field :class="$myapi.isNull(buy_form.pay_password)||$myapi.isPayPassword(buy_form.pay_password)">
          <md-icon>lock</md-icon>
          <label>输入支付密码</label>
          <md-input type="password" v-model="buy_form.pay_password"></md-input>
          <span class="md-error" v-if="$myapi.isNull(buy_form.pay_password)">支付密码不可以为空</span>
          <span class="md-error" v-if="!$myapi.isNull(buy_form.pay_password)&&buy_form.pay_password">支付密码为6位数字</span>
        </md-field>
        <md-card-actions>
          <md-button v-if="$store.state.isLogin" to="/forget-paypsw">
            <md-icon>lock</md-icon>
            忘记支付密码？
          </md-button>
          <md-button v-on:click="buy_flag=false">不发电啦！</md-button>
          <md-button class="md-primary md-raised" v-on:click="confirm_buy">发电！</md-button>
        </md-card-actions>

      </md-dialog-content>
    </md-dialog>


    <md-card>
      <md-card-header>
        <md-card-media md-ratio="1:1">
          <img :src="fund.photo"/>
        </md-card-media>
      </md-card-header>
      <md-card-content>

        <p>基金名称：<b style="color: #555">{{fund.fundName}}</b>
          <small>({{fund.fundId}})</small>
        </p>
        <p>
          标签：<span v-for="type in fund.type"><b style="color: #555"><span v-if="type=='1'">动漫</span>
              <span v-if="type=='2'">游戏</span>
              <span v-if="type=='3'">其他</span>
        </b>
                </span>
        </p>
        <p>
          基金经理： <a v-for="(name,index) in fund.managerNames"
                          v-on:click="$router.push('/manager/' + fund.managerIds[index])">{{name}}&nbsp;&nbsp;&nbsp; </a>
        </p>

        <p>
          卖出费率：<b style="color: #555"><span v-for="(rate, index) in fund.sellRate"><br/>      {{index>0 ? fund.time[index-1]+'天→':""}}{{fund.time.length-1 >= index ? fund.time[index] + '天内(包含当天)':'以后'}}→  {{rate*100}}%    </span>
        </b></p>


      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary" v-on:click="buy">
          <md-icon>done</md-icon>
          立即购买
        </md-button>
      </md-card-actions>
    </md-card>
  </div>

</template>

<script>
  export default {
    name: "Edit",
    props: ['fundId'],
    data() {
      return {
        bank:0,
        fund: [],
        buy_flag: false,
        buy_info: [],
        buy_form: {
          fund_id: null,
          transaction_amount: 1,
          pay_password: null
        }
      }
    },
    methods: {
      confirm_buy() {
        if(this.$myapi.isNull(this.buy_form.pay_password)||this.$myapi.isPayPassword(this.buy_form.pay_password)){
          return
        }
        this.buy_flag = false;
        let _this = this;
        this.$myapi.post("/buy_order/add", _this.buy_form, function (res) {
          _this.$alert.show(100, "购买成功👌，金额为" + _this.buy_form.transaction_amount + "，基金产品id为" + _this.buy_form.fund_id);
          _this.buy_form.transaction_amount = 1;
          _this.buy_form.pay_password = null
        })
      },
      buy() {
        this.buy_flag = true;
        if(!this.$store.state.isLogin){
          this.buy_flag = false
          this.$alert.show(401,null)
        }
        this.buy_info = this.fund;
        this.buy_form.fund_id = this.buy_info.fundId;
        this.buy_info['thistime'] = this.getDate()
      },
      pullPriority() {
        let _this = this;
        this.$myapi.get('/fund/' + _this.$route.params.id, {}, function (res) {
          _this.fund = res.data;
          _this.fund.managerNames = _this.fund.managerNames.split('-');
          _this.fund.managerIds = _this.fund.managerIds.split('-');
          _this.fund.time = _this.fund.time.split('-');
          _this.fund.sellRate = _this.fund.sellRate.split('-')
        })
      },
      getDate() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return currentdate;
      }
    },
    created() {
      this.pullPriority()
    }
  }
</script>

<style scoped>

</style>
