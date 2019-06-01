<template>
  <div>
    <div class="md-layout md-alignment-top-center">
      <div
        class="md-layout-item md-large-size-15 md-medium-size-15 md-size-15 md-small-size-100 md-xsmall-size-100"
        style="margin-top: 30px">
        <md-list>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="type==1">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"
               @click="type_1_click" href="javascript:void(0)">动漫相关</a>
          </md-list-item>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="type==2">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"
               @click="type_2_click" href="javascript:void(0)">游戏相关</a>
          </md-list-item>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="type==3">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"
               @click="type_3_click" href="javascript:void(0)">其他相关</a>
          </md-list-item>
        </md-list>
      </div>

      <div
        class="md-layout-item md-large-size-60 md-medium-size-55 md-size-55 md-small-size-100 md-xsmall-size-100"
        style="margin-left: 15px;">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
            <md-card id="top">
              <md-card-content>
                <md-dialog :md-active.sync="buy_flag" class="md-elevation-5 ">
                  <md-dialog-content>
                    <img v-if="!$store.state.isAndroid" :src="buy_info.photo" style="width: 400px"/>
                    <md-card-header v-else>
                      <md-card-media md-ratio="1:1">
                        <img v-if="$store.state.isAndroid" :src="buy_info.photo" style="width: 400px"/>
                      </md-card-media>
                    </md-card-header>
                    <p>购买基金名称：<b>{{buy_info.fundName}}</b>({{buy_info.fundId}})
                    </p>
                    <p>申购费率：<b>{{buy_info.buyingRate*100}}%</b></p>
                    <p>手续费：<b>{{(buy_info.buyingRate*buy_form.transaction_amount).toFixed(2)}}元</b>
                    </p>
                    <p><b>净值：预计按照第{{$myapi.getWhatDay()}}净值确认份额</b>
                      <small></small>
                    </p>
                    <p>买入时间：<b>{{buy_info.thistime}}</b></p>

                    <md-field>
                      <label>买入金额（1元起）</label>
                      <md-input v-model="buy_form.transaction_amount"></md-input>
                    </md-field>
                    <md-field>
                      <label>输入支付密码</label>
                      <md-input type="password" v-model="buy_form.pay_password"></md-input>
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

                <md-card-actions>
                  <md-field :style="!$store.state.isAndroid?'width: 30%':''">
                    <label>
                      <md-icon>search</md-icon>
                      基金/股票/基金经理
                    </label>
                    <md-input id="search-jobs-name" v-model="searchdb"/>
                  </md-field>
                  <md-button v-on:click="findByNmae(1,searchdb)">搜索</md-button>
                </md-card-actions>
                <h1
                  style="text-align: left;font-size: 20px;color: #666;padding-bottom: 13px;border-bottom: 1px solid #e8e8e8;">
                  <span v-show="type==1">动漫相关</span>
                  <span v-show="type==2">游戏相关</span>
                  <span v-show="type==3">其他相关</span>
                </h1>

                <md-empty-state v-show="funds.length==0"
                                class="md-primary"
                                md-icon="done"
                                md-label="这里空空如也哦"
                                md-description="空空如也............">
                </md-empty-state>
                <md-list class="md-triple-line" style="padding: 0;background-color: rgba(255,255,255,.9)">
                  <div class="md-layout md-gutter">
                    <div v-for="(fund,index) in funds"
                         class="md-layout-item md-large-size-25 md-medium-size-25 md-size-25 md-small-size-100 md-xsmall-size-100">
                      <FundSmallCard :fund="fund"/>
                    </div>
                  </div>

                </md-list>
                <md-card-actions>

                </md-card-actions>

                <md-card-actions>
                  <md-field :class="$myapi.isMoreThanLastPage(page,end_page)">
                    <label>{{page}}页/{{end_page}}页</label>
                    <md-input v-model="page" type="number"></md-input>
                    <span class="md-error">超出最大页数或者为负数</span>
                  </md-field>
                  <md-button v-on:click="jump" class="md-default">跳转</md-button>
                  <md-button class="md-primary" v-if="page!=1" v-on:click="pre">
                    上一页.
                  </md-button>
                  <md-button class="md-primary" v-if="page!=end_page" v-on:click="next">
                    下一页.
                  </md-button>
                </md-card-actions>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FundSmallCard from '../../cards/fund/FundSmallCard'

  export default {
    name: 'AllFund',
    components: {
      FundSmallCard
    },
    data() {
      return {
        searchdb: null,
        words: ['<b style="color:red;">这个是全部基金哟！</b>', '<b style="color:orange;">不要被软妹币乱了眼吖</b>', '<b style="color:blue;">祝欧(｡･∀･)ﾉﾞ。</b>'],
        funds: [],
        // 购买基金flag
        buy_flag: false,
        buy_info: [],
        buy_money: 0,
        isLoading: false,
        page: 1,
        end_page: 1,
        type: 1,
        find_flag: false,
        buy_info: [],
        buy_form: {
          fund_id: null,
          transaction_amount: 1,
          pay_password: null
        }
      }
    },
    updated() {
    },
    methods: {
      confirm_buy() {
        this.buy_flag = false;
        let _this = this;
        this.$myapi.post("/buy_order/add", _this.buy_form, function (res) {
          _this.$alert.show(100, "购买成功👌，金额为" + _this.buy_form.transaction_amount + "，基金产品id为" + _this.buy_form.fund_id);
          _this.buy_form.transaction_amount = 1;
          _this.buy_form.pay_password = null
        })
      },
      jump() {
        if (this.$myapi.isMoreThanLastPage(this.page, this.end_page)) {
          return
        }
        this.find_flag == true ? this.findByPageName(this.page, this.searchdb) : this.pullFund(this.page, this.type)
      },
      findByNmae(page, regex) {
        this.find_flag = true;
        this.page = 1;
        this.findByPageName(page, regex)
      },
      findByPageName(page, regex) {
        let _this = this;
        _this.$loading.show();
        this.$myapi.get('/fund/regex/' + page, {regex: regex}, function (res) {
          _this.funds = res.data.list;
          _this.end_page = res.data.lastPage;
          for (let i = 0; i < _this.funds.length; i++) {
            _this.funds[i].managerNames = _this.funds[i].managerNames.split('-')
          }
          _this.$loading.hide()
        })
        this.$myapi.returnTop("top")
      },
      type_1_click() {
        this.page = 1;
        this.find_flag = false;
        this.type = 1;
        this.pullFund(1, this.type)
      },
      type_2_click() {
        this.page = 1;
        this.find_flag = false;
        this.type = 2;
        this.pullFund(1, this.type)
      },
      type_3_click() {
        this.page = 1;
        this.find_flag = false;
        this.type = 3;
        this.pullFund(1, this.type)
      },
      next() {
        this.page = parseInt(this.page) + 1;
        this.find_flag == true ? this.findByPageName(this.page, this.searchdb) : this.pullFund(this.page, this.type)
      },
      pre() {
        this.page = parseInt(this.page) - 1;
        this.find_flag == true ? this.findByPageName(this.page, this.searchdb) : this.pullFund(this.page, this.type)
      },
      // pull和build项目
      pullFund(page, type) {
        let _this = this;
        this.isLoading = true;
        this.$myapi.get('/fund/type/' + page + "/" + type, {}, function (res) {
          _this.funds = res.data.list;
          _this.end_page = res.data.lastPage;
          for (let i = 0; i < _this.funds.length; i++) {
            _this.funds[i].managerNames = _this.funds[i].managerNames.split('-');
            _this.funds[i].managerIds = _this.funds[i].managerIds.split('-')
          }
          _this.isLoading = false
        })
        this.$myapi.returnTop("top")
      },
      changeColor: function () {
        let oTable = document.getElementsByClassName('change-color');
        for (let i = 0; i < oTable.length; i++) {
          if (i % 2) {
            oTable[i].style.backgroundColor = '#F0F8FF'
          } else {
            oTable[i].style.backgroundColor = 'rgba(255,255,255,.9)'
          }
        }
      },
      buy(index) {
        this.buy_flag = true;
        this.buy_info = this.funds[index];
        this.buy_form.fund_id = this.buy_info.fundId;
        this.buy_info['thistime'] = this.getDate()
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
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }
    },
    created() {
      this.pullFund(this.page, 1)
      this.$store.commit("setWords", ['<b style="color:orange;">看看看！这是全部种类的基金唉！！！！！！！</b>'])
    },
    mounted() {
    }
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
