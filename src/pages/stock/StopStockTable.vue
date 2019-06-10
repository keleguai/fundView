<template>
  <div style="background: url(/static/bk/bk.png) repeat-x #fff;">
    <md-dialog :md-active.sync="see_flag" :style="$store.state.isAndroid==true?'width:100%':'width:40%'"
               class="md-elevation-5 ">
      <md-dialog-actions>
        <md-button  v-on:click="see_flag=false"><md-icon>close</md-icon>关闭</md-button>
      </md-dialog-actions>
      <md-dialog-content>
      <FundsCard :funds="funds"/>
      </md-dialog-content>

    </md-dialog>
    <div class="md-layout md-alignment-top-center md-gutter">
      <div
        class="md-layout-item md-large-size-25 md-medium-size-25 md-size-25 md-small-size-100 md-xsmall-size-100">
        <md-list>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="stop_flag">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"  href="javascript:void(0)" @click="firstStop">停牌股票</a>
          </md-list-item>
          <md-list-item style="border-bottom: 1px solid #f4f4f4;">
            <md-icon class="md-primary" v-show="!stop_flag">done</md-icon>
            <a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"  href="javascript:void(0)" @click="firstNotStop">全部股票</a>
          </md-list-item>
        </md-list>
        <InfoTemp style="margin-top: 16px"/>
        <CommentCard rank_id="2"/>
      </div>
      <div
        class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-100 md-xsmall-size-100 md-size-50">
        <!--<div class="md-layout md-gutter">-->
          <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
            <md-card style="margin-top: 0px;box-shadow: 0 0 0 white;">
              <md-card-content>

                <h1 style="text-align: left;font-size: 20px;color: #666;padding-bottom: 13px;border-bottom: 1px solid #e8e8e8;">
                  <span v-if="stop_flag">停牌股票</span>
                  <span v-if="!stop_flag">全部股票</span>

                </h1>
                <div class="md-layout md-gutter">
                  <div  v-for="(stock,index) in stocks" class="md-layout-item md-size-33 md-large-size-33 md-medium-size-33 md-small-size-100 md-xsmall-size-100">
                    <md-card class="scrollable-card" style="border: 1px solid #f4f4f4;box-shadow: 0 0 0 white">
                      <a href="javascript:void(0)" v-on:click="see(stock.stockId)" style="color: #555">
                        <md-ripple>
                          <md-card-header>
                            <md-card-header-text>
                              <md-avatar style="border: 1px solid #e8e8e8">
                                <img :src="stock.url">
                              </md-avatar>
                              <h4 class="nobr" style="max-width: 150px;">{{ stock.name }}</h4>
                              <p class="md-subhead">{{ stock.stockId }}</p>
                              <p class="md-subhead">开盘价：{{ stock.openingPrice }}元</p>
                              <p class="md-subhead" :style="stock.stockPrice>=stock.openingPrice?'color:red':'color:green'">当前价：{{ stock.stockPrice }}元</p>
                              <p class="md-subhead" :style="stock.stockPrice>=stock.openingPrice?'color:red':'color:green'">涨跌：{{ ((stock.stockPrice/stock.openingPrice-1)*100).toFixed(2) }}%</p>
                            </md-card-header-text>
                          </md-card-header>
                        </md-ripple>
                      </a>
                    </md-card>
                    <md-divider class="md-inset"></md-divider>
                  </div>
                </div>

                <md-card-actions>
                  <md-field :class="$myapi.isMoreThanLastPage(page,end_page)">
                    <label>{{page}}页/{{end_page}}页</label>
                    <md-input v-model="page" type="number"></md-input>
                    <span class="md-error">页数为负数或者超出最大页数</span>
                  </md-field>
                  <md-button  v-on:click="pullDisappearStock(page)">跳转</md-button>
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
        <!--md-card class="md-elevation-24" md-with-hover>-->
        <!--</md-card>-->
      <!--</div>-->


    </div>
  </div>
</template>

<script>
  import FundsCard from '../../cards/fund/FundsScrollCard'
  import InfoTemp from '../../cards/stock/StopAlyCard'
  import CommentCard from '../../cards/normal/CommentCard'

  export default {
    name: 'Index',
    components: {
      FundsCard,
      InfoTemp,
      CommentCard
    },
    data() {
      return {
        searchdb: null,
        // 小人物说的话
        words: ['<b style="color:red;">这个是全部基金哟！</b>', '<b style="color:orange;">不要被软妹币乱了眼吖</b>', '<b style="color:blue;">祝欧(｡･∀･)ﾉﾞ。</b>'],
        stocks: [],
        // 购买基金flag
        see_flag: false,
        buy_info: [],
        buy_money: 0,
        page: 1,
        fundPage: 1,
        funds: [],
        end_page: 1,
        stop_flag:true,
        tempDatas:[],
      }
    },
    methods: {
      firstStop(){
        this.page = 1
        this.stop_flag = true
        this.pullDisappearStock(this.page)
      },
      firstNotStop(){
        this.page = 1
        this.stop_flag = false
        this.pullDisappearStock(this.page)
      },
      next() {
        this.page = parseInt(this.page) + 1;
        this.pullDisappearStock(this.page)
      },
      pre() {
        this.page = parseInt(this.page) - 1;
        this.pullDisappearStock(this.page)

      },
      // pull和build项目
      pullDisappearStock(page) {
        let _this = this;
        if (_this.$myapi.isMoreThanLastPage(_this.page, _this.end_page)) {
          return
        }
        if(_this.stop_flag){
          this.$myapi.get('/stock/disappear/' + page, {}, function (res) {
            _this.stocks = res.data.list;
            _this.end_page = res.data.pages
            if(_this.end_page==0){
              _this.end_page = 1
            }
          })
        }else {
          this.$myapi.get('/stock/list/' + page + '/6', {}, function (res) {
            _this.stocks = res.data.list;
            _this.end_page = res.data.pages
            if(_this.end_page==0){
              _this.end_page = 1
            }
          })
        }
        _this.$myapi.returnTop("top")
      },
      see(stockId) {
        let _this = this;
        this.$myapi.get("/fund/general/by/" + stockId , {}, function (res) {
          _this.see_flag = true;
          _this.funds = res.data;
          for (let i = 0; i < _this.funds.length; i++) {
            _this.funds[i].managerNames = _this.funds[i].managerNames.split('-');
            _this.funds[i].managerIds = _this.funds[i].managerIds.split('-')
          }
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
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      }
    },
    created() {
      this.pullDisappearStock(1);
      this.$store.commit("setWords", this.words)

      // this.init_weibo()
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

  .md-card{
    border: 1px solid #ebebeb;
    box-shadow: none;
  }


</style>
