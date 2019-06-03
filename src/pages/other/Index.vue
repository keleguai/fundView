<template>
  <div>
    <!--基金模块-->
    <div class="md-layout md-alignment-top-center md-gutter">
      <!--<div-->
        <!--class="md-layout-item md-large-size-15 md-medium-size-15 md-size-15 md-small-size-100 md-xsmall-size-100" style="margin-top: 20px">-->
        <!--<md-list>-->
          <!--<md-list-item style="border-bottom: 1px solid #f4f4f4;">-->
            <!--<md-icon class="md-primary" v-show="type==1">done</md-icon>-->
            <!--<a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"  href="#today">今日推荐</a>-->
          <!--</md-list-item>-->
          <!--<md-list-item style="border-bottom: 1px solid #f4f4f4;">-->
            <!--<md-icon class="md-primary" v-show="type==2">done</md-icon>-->
            <!--<a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"  href="#fundList">基金列表</a>-->
          <!--</md-list-item>-->
          <!--<md-list-item style="border-bottom: 1px solid #f4f4f4;">-->
            <!--<md-icon class="md-primary" v-show="type==3">done</md-icon>-->
            <!--<a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none" href="#stockList">股票列表</a>-->
          <!--</md-list-item>-->
          <!--<md-list-item style="border-bottom: 1px solid #f4f4f4;">-->
            <!--<md-icon class="md-primary" v-show="type==3">done</md-icon>-->
            <!--<a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none" href="#managerList">经理列表</a>-->
          <!--</md-list-item>-->
        <!--</md-list>-->
      <!--</div>-->

      <div
        class="md-layout-item md-large-size-55 md-medium-size-55 md-small-size-100 md-xsmall-size-100">
        <md-card style="padding: 0;margin-top: 16px">
          <div class="md-layout md-gutter">
            <!--<div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">-->
              <!--<md-card-header>-->
                <!--<div style="text-align: left" name="today"><span style="font-size: 25px;color: #555">今日推荐</span><a-->
                  <!--href="/#/all-fund"><span style="float: right">查看更多</span></a></div>-->
              <!--</md-card-header>-->
            <!--</div>-->
            <!--<md-card-header>-->
              <!--<div class="md-layout md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100" >-->
                <!--<div class="md-layout-item md-large-size-25 md-medium-size-25 md-small-size-50 md-xsmall-size-50"-->
                     <!--v-for="(fund,index) in funds">-->
                  <!--<FundSmallCard :fund="fund"/>-->
                <!--</div>-->
              <!--</div>-->
            <!--</md-card-header>-->

            <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100" name="fundList">
              <FundsCard :funds="fundsList"/>
            </div>

            <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100" id="stockList">
              <StocksCard :stocks="stocks"/>
            </div>

            <!--<div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100" name="fundList">-->
              <!--<FundsCard :funds="fundsList"/>-->
            <!--</div>-->

            <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100" name="managerList">
              <ManagersCard :managers="managers"/>
            </div>

          </div>
        </md-card>
      </div>
      <div
        class="md-layout-item md-large-size-20 md-medium-size-20 md-small-size-100 md-xsmall-size-100">
        <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
        <h1
          style="margin-top: 20px;text-align: left;font-size: 20px;color: #666;padding-bottom: 13px;border-bottom: 1px solid #e8e8e8;">
        每日精选</h1>
        </div>
        <div class="md-layout md-gutter md-alignment-top-center"
             v-for="(fund,index) in this.funds" style="margin-top: 16px">
          <div class="md-layout-item md-large-size-35 md-medium-size-35 md-small-size-35 md-xsmall-size-35" style="padding: 0">
            <md-card-header style="padding: 0">
              <a style="text-underline: none;color: #666" :href="'/#/fund/'+fund.fundId">
                <md-card-media md-ratio="1:1" style="margin: 0">
                  <img :src="fund.photo" style="width: 100%"/>
                </md-card-media>
              </a>
            </md-card-header>
          </div>
          <div class="md-layout-item md-large-size-65 md-medium-size-65 md-small-size-65 md-xsmall-size-65" style="padding: 0;margin: 0">
            <p style="text-align: left">
              <a style="text-underline: none;color: #666;text-align: left" :href="'/#/fund/'+fund.fundId"><small>{{fund.fundName}}</small></a>
            </p>
          </div>
        </div>
        </div>


    </div>

  </div>
</template>

<script>
  import FundsCard from '../../cards/fund/FundsScrollCard'
  import StocksCard from '../../cards/stock/StocksScrollCard'
  import ManagersCard from '../../cards/Manager/ManagersScrollCard'
  import FundSmallCard from '../../cards/fund/FundSmallCard'

  export default {
    name: 'Index',
    components: {
      FundSmallCard,
      FundsCard,
      StocksCard,
      ManagersCard
    },
    watch: {
      funds() {
      }
    },
    data() {
      return {
        words: ['这里有推荐的二次元基金哦'],
        funds: [],
        stocks: [],
        fundsList: [],
        managers: []
      }
    },
    methods: {
      getPriorityFund() {
        let _this = this;
        // _this.$loading.show()
        this.$myapi.get('/fund/priority', null, function (res) {
          _this.funds = res.data;
          for (let i = 0; i < _this.funds.length; i++) {
            _this.funds[i].managerNames = _this.funds[i].managerNames.split("-");
            _this.funds[i].managerIds = _this.funds[i].managerIds.split("-")
          }
        })
        // _this.$loading.hide()
      },
      getNormalFunds() {
        let _this = this;
        // _this.$loading.show()
        this.$myapi.get('/fund/list/1/10', null, function (res) {
          _this.fundsList = res.data.list;
          for (let i = 0; i < _this.fundsList.length; i++) {
            _this.fundsList[i].managerNames = _this.fundsList[i].managerNames.split("-");
            _this.fundsList[i].managerIds = _this.fundsList[i].managerIds.split("-")
          }
        })
      },
      getNormalStocks() {
        let _this = this;
        // _this.$loading.show()
        this.$myapi.get('/stock/list/1/10', null, function (res) {
          _this.stocks = res.data.list;
        })
      },
      getNormalManagers() {
        let _this = this;
        // _this.$loading.show()
        this.$myapi.get('/fund_manager/list/1/10', null, function (res) {
          _this.managers = res.data.list;
          for (let i = 0; i < _this.managers.length; i++) {
            _this.managers[i].managerProducts = _this.managers[i].managerProducts.split("-")
          }
        })
      }
    },
    created() {
      this.$store.commit("setWords", this.words);
      this.getPriorityFund();
      this.getNormalFunds();
      this.getNormalStocks();
      this.getNormalManagers()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    line-height: 28px;
    font-size: 24px;
    color: #666;
    float: left;
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
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 0 0 white;
  }
  .md-gutter, .md-layout{
    margin-left: 0!important;
    margin-right: 0!important;
    margin-top: 0!important;
  }


</style>
