<template>
  <div style="margin-bottom: 15px">
    <md-dialog :md-active.sync="edit_flag" :style="$store.state.isAndroid?'width:100%':'width:40%'">
      <md-dialog-content>
        <p class="md-subhead">{{fund.fundName}}</p>
        <p class="md-subhead">{{fund.fundId}}</p>
        <md-field>
          <md-icon>star</md-icon>
          <label>优先度</label>
          <md-input type="number" v-model="fund.priority">
          </md-input>
        </md-field>
        <md-field>
          <label>是否下架</label>
          <md-select v-model="fund.disappear">
            <md-option value="true">是</md-option>
            <md-option value="false">否</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>类型</label>
          <md-select v-model="fund.type" multiple>
            <md-option value="1">动漫</md-option>
            <md-option value="2">游戏</md-option>
            <md-option value="3">其他</md-option>
          </md-select>
        </md-field>
        <md-card-actions>
          <md-button v-on:click="edit_flag=false"><md-icon>stop</md-icon>取消</md-button>
          <md-button v-on:click="save"><md-icon>done</md-icon>保存</md-button>
        </md-card-actions>
      </md-dialog-content>
    </md-dialog>
    <a v-on:click="edit_flag=true" style="color: #555;cursor: pointer">
      <!--<md-card-header>-->
          <md-avatar style="border: 1px solid #e8e8e8">
            <img :src="fund.photo"/>
          </md-avatar>
      <!--</md-card-header>-->
      <p class="md-subhead">{{fund.fundName}}<small>({{fund.fundId}})</small></p>
      <p class="md-subhead">
              <span v-for="type in fund.type"><span
                v-if="type=='1'">动漫</span>
              <span v-if="type=='2'">游戏</span>
              <span v-if="type=='3'">其他</span>
      </span>
      </p>
      <p class="md-subhead">
        优先度：{{fund.priority}}
      </p>

    </a>
  </div>
</template>

<script>
  export default {
    name: "FundSmallCardWithRoot",
    props: ['fund'],
    data(){
      return{
        edit_flag:false,
        type:[]
      }
    },
    methods:{
      save(){
        let _this = this
        _this.edit_flag = false
        let temp = ''
        for(let i=0;i<_this.fund.type.length;i++){
          if(i!=(_this.fund.type.length-1)){
            temp += _this.fund.type[i]+'-'
          }else {
            temp += _this.fund.type[i]
          }
        }
        _this.fund.type = temp
        _this.$myapi.post('/fund/update',_this.fund,function (res) {
          _this.$myapi.get("/fund/general/"+_this.fund.fundId,{},function (res) {
            _this.fund = res.data
            _this.fund.type = _this.fund.type.split('-')
          })
          _this.$alert.show(100,'保存成功。')
        })
      }
    },
    mounted() {
      this.fund.type = this.fund.type.split('-')
    }
  }
</script>

<style scoped>
  .md-card {
    box-shadow: 0 0 0 white;
  }
  p{
    color: black!important;
    font-size: 15px!important;
  }
</style>
