<template>
  <md-card>
    <md-dialog :md-active.sync="see_flag" :style="$store.state.isAndroid==true?'width:100%':'width:40%'"
               class="md-elevation-5 ">
      <md-dialog-actions>
        <md-button v-on:click="see_flag=false">
          <md-icon>close</md-icon>
          关闭
        </md-button>
      </md-dialog-actions>
      <md-dialog-content>
        <FundsCard :funds="funds_for_stock" v-if="funds_for_stock.length"/>
        <md-empty-state v-else
                        md-icon="refresh"
                        md-label="无结果"
                        md-description="暂无数据">
        </md-empty-state>
      </md-dialog-content>
    </md-dialog>

    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50">
          <p style="text-align: center">日涨跌幅</p>
          <p
            :style="rate_for_day - 1>0?'color: red;font-size: 25px;text-align: center':'color: green;font-size: 25px;text-align: center'">
            {{((rate_for_day - 1)).toFixed(2)}}%</p>
        </div>
        <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-50">
          <p style="text-align: center">单位净值</p>
          <p style="color: #555;font-size: 25px;text-align: center">{{now_jingzhi}}元</p>
        </div>
      </div>
      <!--<md-tabs class="md-transparent" md-alignment="fixed">-->
      <!--<md-tab id="x" md-label="涨跌幅" v-on:click="show_zhangdie(30)"></md-tab>-->
      <!--<md-tab id="y" md-label="估值走势" v-on:click="show_jingzhi"></md-tab>-->
      <!--<md-tab id="z" md-label="持仓表" v-on:click="show_chicang"></md-tab>-->
      <!--</md-tabs>-->
      <div style="text-align: left">
        <h3
          style="color: #666;font-size: 16px;margin-left: 24px;margin-right:20px;font-weight: 700;display: inline-block">
          类型
        </h3>
        <ul style="display: inline-block;">
          <li class="li" v-on:click="show_zhangdie(30)"
              :style="zhangdiefu?'color:#fff;background-color:#448aff':''">
            涨跌幅
          </li>
          <li class="li" v-on:click="show_jingzhi"
              :style="jingzhi?'color:#fff;background-color:#448aff':''">
            估值走势
          </li>
          <li class="li" v-on:click="show_chicang"
              :style="chicang?'color:#fff;background-color:#448aff':''">
            持仓表
          </li>

        </ul>
      </div>


      <div v-show="jingzhi||zhangdiefu">
        <!--<md-card-actions v-show="zhangdiefu">-->
        <!--<md-radio :value="30" @change="draw_zhangdie(30)" v-model="day">近一个月</md-radio>-->
        <!--<md-radio @change="draw_zhangdie(90)" v-model="day" value="90">近三个月</md-radio>-->
        <!--<md-radio @change="draw_zhangdie(183)" v-model="day" value="183">近半年</md-radio>-->
        <!--<md-radio @change="draw_zhangdie(365)" v-model="day" value="365">近一年</md-radio>-->
        <!--<md-radio @change="draw_zhangdie(1095)" v-model="day" value="1095">近三年</md-radio>-->
        <!--</md-card-actions>-->
        <div style="text-align: left" v-show="zhangdiefu">
          <h3
            style="color: #666;font-size: 16px;margin-left: 24px;margin-right:20px;font-weight: 700;display: inline-block">
            时间
          </h3>
          <ul style="display: inline-block;">
            <li class="li" v-on:click="draw_zhangdie(30)"
                :style="day==30?'color:#fff;background-color:#448aff':''">
              近一个月
            </li>
            <li class="li" v-on:click="draw_zhangdie(90)"
                :style="day==90?'color:#fff;background-color:#448aff':''">
              近三个月
            </li>
            <li class="li" v-on:click="draw_zhangdie(183)"
                :style="day==183?'color:#fff;background-color:#448aff':''">
              近半年
            </li>
            <li class="li" v-on:click="draw_zhangdie(365)"
                :style="day==365?'color:#fff;background-color:#448aff':''">
              近一年
            </li>
            <li class="li" v-on:click="draw_zhangdie(1095)"
                :style="day==1095?'color:#fff;background-color:#448aff':''">
              近三年
            </li>
          </ul>
        </div>


        <!--<p style="color: #555;font-size: 25px;text-align: right" v-if="zhangdiefu">涨跌幅</p>-->
        <!--<p style="color: #555;font-size: 25px;text-align: right" v-if="jingzhi">估值表</p>-->
        <h1 style="margin-left: 23px;text-align: left;font-size: 20px;color: #666;padding-bottom: 13px;border-bottom: 1px solid #e8e8e8;">
          {{day < zhangdiefuData.length?'':'由于该基金上市时间过短，故仅显示到'+zhangdiefuData.length+'个交易日'}}
        </h1>
        <div :style="{width: '100%', height: '300px'}" id="Chart"
             v-show="!(jingzhi&&!jingzhiData.length)||(zhangdiefu&&!zhangdiefuData.length)"></div>
        <p style="color: #555;font-size: 25px;text-align: right"
           v-show="(jingzhi&&!jingzhiData.length)||(zhangdiefu&&!zhangdiefuData.length)">竟然还未初始化...</p>
      </div>
    </md-card-content>

    <div v-show="chicang">
      <!--<p style="color: #555;font-size: 25px;text-align: right;margin-right: 10px;">持仓表</p>-->
      <md-list class="md-triple-line" style="padding: 0" v-show="chicang">
        <template v-for="stock in stocks">
          <md-list-item class="change-color" v-on:click="findByStockId(stock.stockId)">
            <md-avatar>
              <img :src="stock.url">
            </md-avatar>
            <div class="md-list-item-text">
              <h3><b>{{stock.name}}</b>
                <small>（股票名字哟）</small>
              </h3>
              <span><b>股票编号：</b> {{stock.stockId}} <b>持仓比</b> {{(stock.worthPercent*100).toFixed(2) }}%
            <span>
              <b>涨幅</b> <span :style="stock.stockPrice/stock.openingPrice-1<0?'color:green':'color:red'"><span
              v-show="stock.stockPrice/stock.openingPrice-1>0">+</span>{{ stock.stockPrice? ((stock.stockPrice/stock.openingPrice-1)*100).toFixed(2)+'%':"股票价格未初始化" }}</span>
            </span>
                <span>
                  <b>开盘价</b>
                  <span> {{stock.openingPrice}}元</span>
                </span>
                <span>
              <b>现价</b> <span :style="stock.stockPrice/stock.openingPrice-1<0?'color:green':'color:red'"><span
                  v-show="stock.stockPrice/stock.openingPrice-1>0">+</span>{{ stock.stockPrice? stock.stockPrice+'元':"股票价格未初始化" }}</span>
            </span>
            <span v-if="stock.disappear">
              <b style="color:red">已停牌</b>
            </span>
          </span>
            </div>
          </md-list-item>

          <md-divider class="md-inset"></md-divider>
        </template>
      </md-list>
    </div>

  </md-card>
</template>

<script>
  import FundsCard from './FundsScrollCard'

  export default {
    components: {
      FundsCard
    },
    name: "UserCard",
    data() {
      return {
        zhangdiefu: true,
        jingzhi: false,
        chicang: false,
        day: 30,
        funds_for_stock: [],
        see_flag: false,
        jingzhiTime: ['9:30', '9:31', '9:32', '9:33', '9:34', '9:35', '9:36', '9:37', '9:38', '9:39', '9:40', '9:41', '9:42', '9:43', '9:44', '9:45', '9:46', '9:47', '9:48', '9:49', '9:50', '9:51', '9:52', '9:53', '9:54', '9:55', '9:56', '9:57', '9:58', '9:59', '10:00', '10:01', '10:02', '10:03', '10:04', '10:05', '10:06', '10:07', '10:08', '10:09', '10:10', '10:11', '10:12', '10:13', '10:14', '10:15', '10:16', '10:17', '10:18', '10:19', '10:20', '10:21', '10:22', '10:23', '10:24', '10:25', '10:26', '10:27', '10:28', '10:29', '10:30', '10:31', '10:32', '10:33', '10:34', '10:35', '10:36', '10:37', '10:38', '10:39', '10:40', '10:41', '10:42', '10:43', '10:44', '10:45', '10:46', '10:47', '10:48', '10:49', '10:50', '10:51', '10:52', '10:53', '10:54', '10:55', '10:56', '10:57', '10:58', '10:59', '11:00', '11:01', '11:02', '11:03', '11:04', '11:05', '11:06', '11:07', '11:08', '11:09', '11:10', '11:11', '11:12', '11:13', '11:14', '11:15', '11:16', '11:17', '11:18', '11:19', '11:20', '11:21', '11:22', '11:23', '11:24', '11:25', '11:26', '11:27', '11:28', '11:29', '11:30', '13:00', '13:01', '13:02', '13:03', '13:04', '13:05', '13:06', '13:07', '13:08', '13:09', '13:10', '13:11', '13:12', '13:13', '13:14', '13:15', '13:16', '13:17', '13:18', '13:19', '13:20', '13:21', '13:22', '13:23', '13:24', '13:25', '13:26', '13:27', '13:28', '13:29', '13:30', '13:31', '13:32', '13:33', '13:34', '13:35', '13:36', '13:37', '13:38', '13:39', '13:40', '13:41', '13:42', '13:43', '13:44', '13:45', '13:46', '13:47', '13:48', '13:49', '13:50', '13:51', '13:52', '13:53', '13:54', '13:55', '13:56', '13:57', '13:58', '13:59', '14:00', '14:01', '14:02', '14:03', '14:04', '14:05', '14:06', '14:07', '14:08', '14:09', '14:10', '14:11', '14:12', '14:13', '14:14', '14:15', '14:16', '14:17', '14:18', '14:19', '14:20', '14:21', '14:22', '14:23', '14:24', '14:25', '14:26', '14:27', '14:28', '14:29', '14:30', '14:31', '14:32', '14:33', '14:34', '14:35', '14:36', '14:37', '14:38', '14:39', '14:40', '14:41', '14:42', '14:43', '14:44', '14:45', '14:46', '14:47', '14:48', '14:49', '14:50', '14:51', '14:52', '14:53', '14:54', '14:55', '14:56', '14:57', '14:58', '14:59', '15:00'],
        jingzhiData: [],
        zhangdiefuData: [],
        zhangdiefuTime: [],
        // 日涨跌幅
        rate_for_day: '数据未初始化',
        // 现在的净值
        now_jingzhi: '数据未初始化',
        Option: {
          xAxis: {
            type: 'category',
            name: '时间',
            data: []
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#ccc',
                borderColor: '#aaa',
                borderWidth: 1,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                textStyle: {
                  color: '#222'
                }
              }
            },
            formatter: function (params) {
              return params[0].name + '<br />' + params[0].value;
            }
          },
          yAxis: [{
            name: '增幅',
          }],
          series: [{
            type: 'line',
            color: 'rgba(10,10,0,0.7)',
            data: [],
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: 'rgba(135,206,250,0.6)',
                color: 'black',
              }
            }
          }]
        },

        stocks: []
      }
    },
    mounted() {
      this.changeColor();
      this.show_zhangdie(30)
    },
    updated() {
      this.changeColor()
    },
    created() {
      this.jingzhi = false;
      setInterval(this.draw_and_refresh, 60000)
    },
    methods: {
      findByStockId(stockId) {
        let _this = this;
        this.$myapi.get("/fund/by/" + stockId, {}, function (res) {
          _this.see_flag = true;
          _this.funds_for_stock = res.data;
          for (let i = 0; i < _this.funds_for_stock.length; i++) {
            _this.funds_for_stock[i].managerNames = _this.funds_for_stock[i].managerNames.split('-');
            _this.funds_for_stock[i].managerIds = _this.funds_for_stock[i].managerIds.split('-')
          }
        })
      },
      changeColor: function () {
        let oTable = document.getElementsByClassName('change-color');
        for (let i = 0; i < oTable.length; i++) {
          if (i % 2) {
            oTable[i].style.backgroundColor = '#F0F8FF'
          } else {
            oTable[i].style.backgroundColor = 'white'
          }
        }
      },
      show_zhangdie(day) {

        this.zhangdiefu = true;
        this.jingzhi = false;
        this.chicang = false;
        this.day = 30;
        this.draw_zhangdie(day)
      },
      draw_zhangdie(day) {
        let _this = this;
        _this.$loading.show();
        _this.day = day;
        _this.$myapi.get("/historical_fund/" + _this.$route.params.id, {}, function (res) {
          if (res.data != null) {
            _this.zhangdiefuData = res.data.historyRate.split("-");
            _this.zhangdiefuTime = res.data.date.split('+');
            let tempData = [];
            let tempDate = [];
            day = day < _this.zhangdiefuData.length ? day : _this.zhangdiefuData.length;
            for (let i = _this.zhangdiefuData.length - day; i < _this.zhangdiefuData.length; i++) {
              tempData.push(_this.zhangdiefuData[i]);
              tempDate.push(_this.zhangdiefuTime[i])
            }
            _this.Option.xAxis.data = tempDate;
            _this.rate_for_day = (parseFloat(_this.zhangdiefuData[_this.zhangdiefuData.length - 1]) / parseFloat(_this.zhangdiefuData[_this.zhangdiefuData.length - 3])).toFixed(2);
            _this.Option.series[0].data = tempData;
            _this.now_jingzhi = res.data.historyPrice.split("-")[_this.zhangdiefuData.length - 1];
            _this.$echarts.init(document.getElementById('Chart')).setOption(_this.Option)
          } else {
            _this.$alert.show("100", "由于信息尚未初始化无法显示视图");
            _this.zhangdiefuData = []
          }
          _this.$loading.hide()
        })
      },
      show_jingzhi() {
        this.zhangdiefu = false;
        this.jingzhi = true;
        this.chicang = false;
        this.draw_and_refresh()
      },
      draw_and_refresh() {
        if (this.jingzhi && this.$route.params.id != null && !this.zhangdiefu && !this.chicang) {
          let _this = this;
          _this.$loading.show();
          _this.$myapi.get("/fund_valuation/" + _this.$route.params.id, {}, function (res) {
            if (res.data != null) {
              _this.jingzhiData = res.data.evaluateFeeRate.split("+");
              _this.Option.xAxis.data = _this.jingzhiTime;
              _this.Option.series[0].data = _this.jingzhiData;
              _this.$echarts.init(document.getElementById('Chart')).setOption(_this.Option)
            } else {
              _this.$alert.show("100", "由于信息尚未初始化无法显示视图");
              _this.jingzhiData = []
            }
            _this.$loading.hide()
          })
        } else if (this.chicang && this.$route.params.id) {
          this.refresh_chicang()
        }
      },
      show_chicang() {
        this.zhangdiefu = false;
        this.jingzhi = false;
        this.chicang = true;
        this.refresh_chicang()
      },
      refresh_chicang() {
        let _this = this;
        _this.$loading.show();
        _this.$myapi.get("/fund_holding/" + _this.$route.params.id, {}, function (res) {
          _this.stocks = res.data;
          _this.$loading.hide()
        })
      }
    }
  }
</script>

<style scoped>
  .li {
    font-size: 16px;
    margin: 0 13px 14px 0;
    padding: 2px 10px;
    color: #666;
    cursor: pointer;
    display: inline-block;
  }

  .md-card {
    box-shadow: 0 0 0 white;
  }
</style>
