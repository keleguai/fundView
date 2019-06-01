<template>
  <div>
  <!--<md-card>-->
    <md-dialog :md-active.sync="see_flag" :style="$store.state.isAndroid==true?'width:100%':'width:40%'"
               class="md-elevation-5 ">
      <md-dialog-actions>
        <md-button  v-on:click="see_flag=false"><md-icon>close</md-icon>关闭</md-button>
      </md-dialog-actions>
      <md-dialog-content>
        <FundsCard :funds="funds" v-if="funds.length"/>
        <md-empty-state v-else
          md-icon="devices_other"
          md-label="这里空空如也哦"
          md-description="........">
        </md-empty-state>
      </md-dialog-content>
    </md-dialog>

    <md-card-header>
      <div class="md-title" style="text-align: left">
        股票列表
      </div>
      <p class="md-subhead">
        是否有心仪的股票呢
      </p>
    </md-card-header>
    <md-card-content class="md-card-content">
      <md-content style="overflow-y: hidden; overflow-x:scroll; white-space:nowrap; width: 100%"
                  class="md-scrollbar">
        <template v-for="stock in this.stocks">
          <md-card class="scrollable-card">
            <a href="javascript:void(0)" v-on:click="findByStockId(stock.stockId)" style="color: #555">
            <md-ripple>
            <md-card-header>
              <md-card-header-text>
                <h3 class="nobr" style="max-width: 150px;">{{ stock.name }}</h3>
                <p class="md-subhead">{{ stock.stockId }}</p>
                <p class="md-subhead">开盘价：{{ stock.openingPrice }}元</p>
                <p class="md-subhead" :style="stock.stockPrice>stock.openingPrice?'color:red':'color:green'">当前价：{{ stock.stockPrice }}元</p>
              </md-card-header-text>
            </md-card-header>
            </md-ripple>
            </a>
          </md-card>
        </template>
      </md-content>
    </md-card-content>
  <!--</md-card>-->
  </div>
</template>

<script>
  import FundsCard from '../fund/FundsScrollCard'
  export default {
    components:{
      FundsCard
    },
    props: ['stocks'],
    name: 'StocksCard',
    data(){
      return{
        see_flag:false,
        funds:[]
      }
    },
    methods:{
      findByStockId(stockId){
        let _this = this
        this.$myapi.get("/fund/by/" + stockId , {}, function (res) {
          _this.see_flag = true;
          _this.funds = res.data;
          for (let i = 0; i < _this.funds.length; i++) {
            _this.funds[i].managerNames = _this.funds[i].managerNames.split('-');
            _this.funds[i].managerIds = _this.funds[i].managerIds.split('-')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .scrollable-card {
    display: inline-block;
    width: 250px;
    position: relative;
    margin-bottom: 20px !important;
    margin-right: 40px;
  }

  .nobr {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stock-logo{
    max-width: 100%;
    max-height: 100%;
    /*margin-left: 20px;*/
  }
</style>
