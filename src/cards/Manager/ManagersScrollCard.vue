<template>
  <div>
  <!--<md-card>-->
    <md-dialog :md-active.sync="see_flag" :style="$store.state.isAndroid==true?'width:100%':'width:40%'"
               class="md-elevation-5 ">
      <md-dialog-actions>
        <md-button  v-on:click="see_flag=false"><md-icon>close</md-icon>关闭</md-button>
      </md-dialog-actions>
      <md-dialog-content>
        <md-card-header>
          <div class="md-title" style="text-align: left">
            该基金经理管理的
          </div>
        </md-card-header>

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
        基金经理列表
      </div>
      <p class="md-subhead">
        是否有心仪的基金经理呢
      </p>
    </md-card-header>
    <md-card-content class="md-card-content">
      <md-content style="overflow-y: hidden; overflow-x:scroll; white-space:nowrap; width: 100%"
                  class="md-scrollbar">
        <template v-for="manager in this.managers">
          <md-card class="scrollable-card">
            <a href="javascript:void(0)" v-on:click="findByManagerId(manager.managerId)" style="color: #555">
            <md-ripple>
            <md-card-header>
              <md-card-header-text>
                <p>名称：<b
                  style="color: #555">{{manager.managerName}}</b></p>
                <p>编号：{{manager.managerId}}</p>
                <p>
                  管理产品：<span v-for="product in manager.managerProducts"><b style="color: #555">{{product}}  </b></span>
                </p>
                <p>介绍：<b style="color: #555">{{manager.showMe}}</b>
                </p>
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
    props: ['managers'],
    name: 'ManagersCard',
    data(){
      return{
        see_flag:false,
        funds:[]
      }
    },
    methods:{
      findByManagerId(managerId){
        let _this = this
        this.$myapi.get('/fund_manager/products/' + managerId, {},function (res) {
          _this.funds = res.data
          _this.see_flag = true
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
  .manager-logo{
    max-width: 100%;
    max-height: 100%;
    /*margin-left: 20px;*/
  }
</style>
