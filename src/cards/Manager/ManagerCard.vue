<template>
  <div>

    <md-card class="md-elevation-24" md-with-hover>
      <md-card-content>
        <p>基金经理名称：<b
          style="color: #555">{{manager.managerName}}</b></p>
        <p>基金经理编号：{{manager.managerId}}</p>
        <p>
          管理产品：<span v-for="product in manager.managerProducts"><b style="color: #555">{{product}}  </b></span>
        </p>
        <p>基金经理介绍：<b style="color: #555">{{manager.showMe}}</b>
        </p>
      </md-card-content>
    </md-card>
  </div>

</template>

<script>
  export default {
    name: "Edit",
    props: ['fundId'],
    data() {
      return {
        manager: [],
        buy_flag: false,
        buy_info: [],
        buy_form: {
          fund_id: null,
          transaction_amount: 1
        }
      }
    },
    methods: {
      getManager() {
        let _this = this
        this.$myapi.get('/fund_manager/info/' + _this.$route.params.id, {}, function (res) {
          _this.manager = res.data
          _this.manager.managerProducts = _this.manager.managerProducts.split('-')
        })
      },
    },
    created() {
      this.getManager()
    }
  }
</script>

<style scoped>

</style>
