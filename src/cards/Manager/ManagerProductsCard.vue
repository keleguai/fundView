<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title" style="text-align: left">
          该基金经理管理的
        </div>
      </md-card-header>
      <FundsCard :funds="funds"/>
    </md-card>
  </div>
</template>

<script>
  import FundsCard from '../fund/FundsScrollCard'
  export default {
    name: "Edit",
    components:{
      FundsCard
    },
    props: ['fundId'],
    data() {
      return {
        fund: [],
        buy_flag: false,
        buy_info: [],
        funds: [],
      }
    },
    methods: {
      pullPriority() {
        let _this = this
        this.$myapi.get('/fund_manager/products/' + _this.$route.params.id, {},function (res) {
            _this.funds = res.data
            _this.fund = res.data[0]
            _this.fund.managerNames = _this.fund.managerNames.split('-')
            _this.fund.time = _this.fund.time.split('-')
            _this.fund.sellRate = _this.fund.sellRate.split('-')
        })
      }
    },
    created() {
      this.pullPriority()
    }
  }
</script>

<style scoped>
  .md-card{
    box-shadow: 0 0 0 white;
  }
</style>
