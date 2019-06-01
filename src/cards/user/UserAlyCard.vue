<template>
  <md-card class="md-primary">
    <md-card-header>
      <md-card-header-text style="text-align: left">
        信息统计
      </md-card-header-text>
    </md-card-header>
    <md-card-content class="md-primary">
      <div class="md-layout">
        <div class="md-layout-item md-size-33">
          <md-card-header class="center">
            <div>
              <span>
                <md-icon style="color: #FFFFFF">
                  art_track
                </md-icon>
                {{hasFundCount}}
                <small>个</small>
              </span>
              <p>已经拥有的基金数量</p>
            </div>
          </md-card-header>
        </div>
        <div class="md-layout-item md-size-33">
          <md-card-header class="center">
            <div>
              <span>
                <md-icon style="color: #FFFFFF">
                  assignment_return
                </md-icon>
                {{businCount}}<small>次</small></span>
              <p>交易次数</p>
            </div>
          </md-card-header>
        </div>
        <div class="md-layout-item md-size-33">
          <md-card-header class="center">
            <div>
              <span>
                <md-icon  style="color: #FFFFFF">
                  youtube_searched_for
                </md-icon>
                {{myMoney?myMoney.toFixed(2):'0'}}
                <small>元</small>
              </span>
              <p>我的基金库总价值</p>
            </div>
          </md-card-header>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
  export default {
    name: 'UserAlyCard',
    data: () => ({
      hasFundCount:null,
      myMoney: null,
      businCount:null
    }),
    methods:{
      show_buy_amount() {
        let _this = this
        this.$myapi.get("/buy_order/show/buy_amount", null, function (res) {
          _this.myMoney = res.data.getAllAmount
        })
      },
      show_has_count() {
        let _this = this
        this.$myapi.get("/buy_order/show_has_funds/count", null, function (res) {
          _this.hasFundCount = res.data.hasFundCount
        })
      },
      show_busin_count() {
        let _this = this
        this.$myapi.get("/buy_order/show_busin/count", null, function (res) {
          _this.businCount = res.data.businCount
        })
      }
    },
    created() {
      this.show_buy_amount()
      this.show_has_count()
      this.show_busin_count()
    }
  }
</script>

<style scoped>

</style>
