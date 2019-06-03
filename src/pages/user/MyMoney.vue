<template>
  <div>

    <md-dialog :md-active.sync="cancelDialogShow" class="md-elevation-5"
               :style="$store.state.isAndroid==true?'width:100%':'width:40%'">
      <md-dialog-content>
        <md-field v-show="$store.state.isLogin">
          <!--<md-icon>done</md-icon>-->
          <label>
            请选择到账银行卡
          </label>
          <md-select v-model="bank">
            <md-option v-for="(bankId,index) in $store.state.user.info.bankCardNumber" :value="index">{{bankId}}
            </md-option>
          </md-select>
        </md-field>
        <md-field :class="$myapi.isNull(sell_form.payPassword)||$myapi.isPayPassword(sell_form.payPassword)">
          <md-icon>lock</md-icon>
          <label>支付密码</label>
          <md-input v-model="sell_form.payPassword" type="password"></md-input>
          <span class="md-error" v-if="$myapi.isNull(sell_form.payPassword)">支付密码不可以为空</span>
          <span class="md-error"
                v-if="$myapi.isPayPassword(sell_form.payPassword)&&sell_form.payPassword">支付密码为6位数字</span>
        </md-field>
        <md-card-actions>
          <md-button v-if="$store.state.isLogin" to="/forget-paypsw">
            <md-icon>lock</md-icon>
            忘记支付密码？
          </md-button>
          <md-button class="md-primary" v-on:click="cancelConfirm">撤销！</md-button>
          <md-button class="md-primary" v-on:click="cancelDialogShow=false">取消！</md-button>
        </md-card-actions>
      </md-dialog-content>
    </md-dialog>

    <md-dialog :md-active.sync="sell_flag" class="md-elevation-5"
               :style="$store.state.isAndroid==true?'width:100%':'width:40%'">
      <md-dialog-content>
        <md-card-header>
          <md-card-media md-ratio="1:1">
            <img :src="sell_form.photo"/>
          </md-card-media>
        </md-card-header>

        <p><b>卖出基金名字：</b>{{sell_form.fundName}}({{sell_form.fundId}})</p>
        <md-field>
          <md-icon>bookmark</md-icon>
          <label>卖出份额(最大{{sell_form.thisFundShare}}份)</label>
          <md-input v-model="sell_form.sellShare"></md-input>
        </md-field>

        <md-field v-show="$store.state.isLogin">
          <!--<md-icon>done</md-icon>-->
          <label>
            请选择到账银行卡
          </label>
          <md-select v-model="bank">
            <md-option v-for="(bankId,index) in $store.state.user.info.bankCardNumber" :value="index">{{bankId}}
            </md-option>
          </md-select>
        </md-field>

        <md-field :class="$myapi.isNull(sell_form.payPassword)||$myapi.isPayPassword(sell_form.payPassword)">
          <md-icon>lock</md-icon>
          <label>支付密码</label>
          <md-input v-model="sell_form.payPassword" type="password"></md-input>
          <span class="md-error" v-if="$myapi.isNull(sell_form.payPassword)">支付密码不可以为空</span>
          <span class="md-error"
                v-if="$myapi.isPayPassword(sell_form.payPassword)&&sell_form.payPassword">支付密码为6位数字</span>
        </md-field>

        <p>
          预计按照{{$myapi.getWhatDay()}}的净值来算
        </p>
        <md-card-actions>
          <md-button v-if="$store.state.isLogin" to="/forget-paypsw">
            <md-icon>lock</md-icon>
            忘记支付密码？
          </md-button>
          <md-button class="md-primary" v-on:click="sell_click">卖出！</md-button>
          <md-button class="md-primary" v-on:click="sell_flag=false">不卖啦！</md-button>
        </md-card-actions>

      </md-dialog-content>
    </md-dialog>
    <div class="md-layout md-alignment-top-center md-gutter">
      <div
        class="md-layout-item md-large-size-20 md-medium-size-20 md-size-20 md-small-size-100 md-xsmall-size-100">
        <md-list>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="user_flag">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"
               @click="show_user_rank" href="javascript:void(0)">已有基金</a>
          </md-list-item>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="select_buy_flag&&fund_flag">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"
               @click="show_buy(1)" href="javascript:void(0)">买入记录</a>
          </md-list-item>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="!select_buy_flag&&fund_flag">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"
               @click="show_sell(1)" href="javascript:void(0)">卖出记录</a>
          </md-list-item>
        </md-list>
      </div>

      <div class="md-layout-item md-large-size-55 md-medium-size-55 md-size-55 md-small-size-100 md-xsmall-size-100"
      >
        <md-card style="margin-top: 0px">
          <md-card-content id="top">
            <div>
              <!--<md-card class="md-primary">-->
                <div class="md-layout md-gutter md-alignment-top-center md-primary"
                     style="margin-top: 10px;border-bottom: 1px solid #f4f4f4; ">
                  <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30"
                       style="border-right: 1px solid #f4f4f4;">
                    <p style="text-align: center">总价值</p>
                    <p style="text-align: center;font-size: 18px;color: #555">{{myMoney.toFixed(2)}}元</p>
                  </div>
                  <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30"
                       style="border-right: 1px solid #f4f4f4;">
                    <p style="text-align: center">昨日收益</p>
                    <p style="text-align: center;font-size: 18px;color: #555">{{yestodayGetMoney.toFixed(2)}}元</p>
                  </div>
                  <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">
                    <p style="text-align: center">历史收益率</p>
                    <p
                      :style="(rate*100-100)>=0?'text-align: center;color: red;font-size: 18px':'text-align: center;color: green;font-size: 18px'">
                      {{(rate*100-100).toFixed(2)}}%</p>
                  </div>
                </div>
              <!--</md-card>-->


              <div>

                <h1
                  style="text-align: left;font-size: 20px;color: #666;padding-bottom: 13px;border-bottom: 1px solid #e8e8e8;">
                  <span v-show="!select_buy_flag&&fund_flag">卖出记录</span>
                  <span v-show="select_buy_flag&&fund_flag">买入记录</span>
                  <span v-show="user_flag">已有基金</span>
                </h1>
                <template v-if="!funds.length">
                  <md-empty-state
                    md-icon="refresh"
                    md-label="无结果"
                    md-description="或许被小可爱吃掉了">
                  </md-empty-state>
                </template>
                <template v-else v-for="(fund,index) in funds">
                  <div class="md-layout md-gutter md-alignment-top-center"
                       style="margin-top: 10px;border-bottom: 1px solid #f4f4f4; ">
                    <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">
                      <md-card-header>
                        <md-card-media md-ratio="1:1">
                          <img :src="fund.photo"/>
                        </md-card-media>

                      </md-card-header>
                    </div>
                    <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">
                      <li class="li" style="text-align: left">
                        <a style="text-underline: none;color: #666" :href="'/#/fund/'+fund.fundId">{{fund.fundName}}({{fund.fundId}})</a>
                      </li>
                      <p class="li" style="color: #555" v-show="fund.thisFundShare*fund.historyPrice">
                        昨日收益：{{(fund.thisFundShare*fund.historyPrice).toFixed(2)}}元</p>
                      <p class="li" v-show="fund.sureNet>0">净值：<b>{{fund.sureNet}}元</b></p>
                      <p class="li" v-show="fund.serviceCharge>=0&&fund.sureNet>0">赎回手续费：<b>{{fund.serviceCharge}}元</b>
                      </p>
                      <p class="li" v-show="fund.transactionAmount">购买金额：<b>{{fund.transactionAmount}}</b>元</p>

                      <p class="li" v-show="fund.sellShare&&!user_flag">卖出份额：<b>{{fund.sellShare}}</b>份</p>
                    </div>
                    <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">
                      <p class="li" v-show="fund.timeBuying">购买时间：<b>{{ $myapi.parseMyDate(fund.timeBuying)}}</b></p>
                      <p class="li" v-show="fund.sellTime">卖出时间：<b>{{ $myapi.parseMyDate(fund.sellTime/10)}}</b></p>
                      <p class="li" v-show="!user_flag&&!fund.sellTime">状态：<b style="color: #555">{{fund.cancel?"已撤销":""
                        + !fund.cancel&&fund.confirmSign?"已成交":"买入待确认价值"}}</b>
                      </p>
                      <p class="li" v-show="!user_flag&&fund.sellTime">状态：<b style="color: #555">{{fund.cancel?"已撤销":""
                        + !fund.cancel&&fund.confirmSign?"已成交":"卖出待确认净值"}}</b>
                      </p>
                      <a class="li" v-show="!user_flag&&fund.sellTime&&(fund.confirmSign==0&&!fund.cancel)"
                         style="text-align: right;float: left" v-on:click="cancelShow(fund.orderId,true)">撤销</a>
                      <p class="li" v-show="fund.allMoney">购买金额：<b>{{fund.allMoney}}</b>元</p>
                      <a class="li" v-show="!user_flag&&!fund.sellTime&&(fund.confirmSign==0&&!fund.cancel)"
                         style="text-align: right;float: left" v-on:click="cancelShow(fund.orderId,false)">撤销</a>
                      <p class="li" style="color: #555" v-show="fund.thisFundShare*fund.willMoney">
                        现在总价值：{{(fund.thisFundShare*fund.willMoney).toFixed(2)}}元</p>

                      <a class="li" v-on:click="sell(index)" v-show="user_flag"
                         style="float: left;text-align: right">卖出</a>

                    </div>
                  </div>
                </template>
                <md-card-actions>
                  <md-field :class="$myapi.isMoreThanLastPage(page,end_page)">
                    <label>{{page}}页/{{end_page}}页</label>
                    <md-input v-model="page" type="number"></md-input>
                    <span class="md-error">页数为负数或者超出最大页数</span>
                  </md-field>
                  <md-button v-on:click="show_buy(page)">跳转</md-button>
                  <md-button class="md-primary" v-on:click="pre" v-show="page!=1">上一页</md-button>
                  <md-button class="md-primary" v-on:click="next" v-show="end_page!=page">下一页</md-button>
                </md-card-actions>

              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>


    </div>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data() {
      return {
        yestodayGetMoney: 0,
        select_buy_flag: true,
        select_see_date: 30,
        user_flag: true,
        fund_flag: false,
        bank: 0,
        // 卖出弹框
        sell_flag: false,
        words: ['<b style="color: rgba(0,0,0,1)">可恶，竟然敢看我的小金库！！！</b>'],
        funds: [],
        page: 1,
        myMoney: 0,
        end_page: 1,
        rate: 1,
        sell_form: {
          sellShare: 0,
          payPassword: null
        },
        cancelOrderId: null,
        cancelDialogShow: false,
        isSellCancel: true
      }
    },
    methods: {
      cancelShow(orderId, flag) {
        this.cancelOrderId = orderId;
        this.cancelDialogShow = true;
        this.isSellCancel = flag
      },
      // 确定取消按钮
      cancelConfirm() {
        let _this = this;
        if (this.$myapi.isNull(this.sell_form.payPassword) || this.$myapi.isPayPassword(this.sell_form.payPassword)) {
          return
        }
        let url = _this.isSellCancel ? "/sell_order/update" : '/buy_order/update';
        _this.$myapi.post(url, {
          cancel: 1,
          orderId: _this.cancelOrderId,
          payPassword: _this.sell_form.payPassword
        }, function (res) {
          _this.$alert.show("100", "已撤销该操作");
          if (_this.isSellCancel) {
            _this.show_sell(_this.page)
          } else {
            _this.show_buy(_this.page)
          }
          _this.show_buy_amount();
          _this.getMyRate()
        });
        this.cancelDialogShow = false;
        this.sell_form.payPassword = null
      },
      // 得到该客户的收益率
      getMyRate() {
        let _this = this;
        _this.$myapi.get("/user_info/me/get_rate", {}, function (res) {
          _this.rate = res.data.rate
        })
      },
      //点击卖出按钮
      sell(index) {
        let _this = this;
        _this.sell_flag = true;
        _this.sell_form = _this.funds[index];
        _this.sell_form['sellShare'] = _this.funds[index].thisFundShare
      },
      //点击确定卖出
      sell_click() {
        let _this = this;
        if (this.$myapi.isNull(this.sell_form.payPassword) || this.$myapi.isPayPassword(this.sell_form.payPassword)) {
          return
        }
        _this.$myapi.post('/sell_order/add', _this.sell_form, function (res) {
          _this.$alert.show("100", "卖出成功辣");
          _this.show_has_fund(1);
          _this.sell_form.payPassword = null
        });
        _this.sell_flag = false;
        _this.show_buy_amount();
        _this.getMyRate()
      },
      show_user_rank() {
        this.user_flag = true;
        this.fund_flag = false;
        this.select_buy_flag = false;
        this.page = 1;
        this.show_has_fund(1)
      },
      show_has_fund(page) {
        let _this = this;
        _this.page = 1;
        _this.$loading.show();
        this.$myapi.get("/buy_order/show_has_funds/" + page, {}, function (res) {
          if (res.data != null) {
            _this.funds = res.data.list.list;
            for (let i = 0; i < _this.funds.length; i++) {
              _this.funds[i].managerNames = _this.funds[i].managerNames.split('-');
              _this.funds[i].managerIds = _this.funds[i].managerIds.split('-')
            }
            _this.yestodayGetMoney = res.data.yestodayGetMoney;
            if (!_this.yestodayGetMoney) {
              _this.yestodayGetMoney = 0
            }
            _this.end_page = res.data.list.lastPage;
            if (_this.end_page == 0) {
              _this.end_page = 1
            }
            _this.$myapi.returnTop("top")
          }
          _this.$loading.hide()
        })
      },
      show_fund_rank() {
        this.select_buy_flag = true;
        this.user_flag = false;
        this.fund_flag = true;
        this.show_buy(1)
      },
      show_buy(page) {
        this.select_buy_flag = true;
        this.user_flag = false;
        this.fund_flag = true;
        if (this.$myapi.isMoreThanLastPage(this.page, this.end_page)) {
          return
        }
        let _this = this;
        _this.page = page;
        _this.$loading.show();
        this.$myapi.get("/buy_order/show_buy/" + page, {}, function (res) {
          if (res.data != null) {
            _this.funds = res.data.list;
            for (let i = 0; i < _this.funds.length; i++) {
              _this.funds[i].managerNames = _this.funds[i].managerNames.split('-');
              _this.funds[i].managerIds = _this.funds[i].managerIds.split('-')
            }
            _this.end_page = res.data.lastPage;
            _this.$myapi.returnTop("top");
            if (_this.end_page == 0) {
              _this.end_page = 1
            }
          }
          _this.$loading.hide()
        })
      },
      show_sell(page) {
        let _this = this;
        this.select_buy_flag = false;
        this.user_flag = false;
        this.fund_flag = true;
        this.$myapi.get("/sell_order/show_sell/" + page, {}, function (res) {
          if (res.data.list != null)
            _this.funds = res.data.list;
          _this.end_page = res.data.lastPage;
          _this.$myapi.returnTop("top");
          if (_this.end_page == 0) {
            _this.end_page = 1
          }
        })
      },
      show_buy_amount() {
        let _this = this;
        _this.$loading.show();
        this.$myapi.get("/buy_order/show/buy_amount", {}, function (res) {
          _this.myMoney = res.data.getAllAmount;
          _this.$loading.hide()
        })
      },
      next() {
        this.page = parseInt(this.page) + 1;
        if (this.fund_flag && this.select_buy_flag) {
          this.show_buy(this.page)
        } else if (this.fund_flag && !this.select_buy_flag) {
          this.show_sell(this.page)
        }
      },
      pre() {
        this.page = parseInt(this.page) - 1;
        if (this.fund_flag && this.select_buy_flag) {
          this.show_buy(this.page)
        } else if (this.fund_flag && !this.select_buy_flag) {
          this.show_sell(this.page)
        }
      }
    },
    created() {
      this.show_has_fund(1);
      if (this.$store.state.isLogin) {
        this.show_buy_amount();
        this.getMyRate()
      }
      this.$store.commit("setWords", this.words)

      // this.show_buy()
      // this.init_weibo()
      // this.isLoginIn()
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .li {
    font-size: 16px;
    margin: 0 13px 14px 0;
    padding: 2px 10px;
    color: #666;
    cursor: pointer;
  }

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
    box-shadow: 0 0 0 white;
  }

</style>
