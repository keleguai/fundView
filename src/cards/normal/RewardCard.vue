<template>
  <md-card class="md-primary">
    <md-dialog :md-active.sync="edit_flag" :style="$store.state.isAndroid?'width:100%':'width:40%'">
      <md-dialog-content>
        <md-field>
          <md-icon>book</md-icon>
          <label>公告编辑</label>
          <md-textarea v-model="text" maxlength="500">
          </md-textarea>
        </md-field>
        <md-card-actions>
          <md-button v-on:click="get_reward_new"><md-icon>refresh</md-icon>重置公告</md-button>
          <md-button v-on:click="edit_flag=false"><md-icon>looks</md-icon>试看效果</md-button>
          <md-button v-on:click="save" class="md-primary"><md-icon>done</md-icon>保存</md-button>
        </md-card-actions>
      </md-dialog-content>
    </md-dialog>
    <md-card-header>
      <md-card-header-text style="text-align: left">
        排行奖励
      </md-card-header-text>
    </md-card-header>
    <md-card-content class="md-primary">
            <div>
              <span>
                <md-icon style="color: #FFFFFF">
                  art_track
                </md-icon>
                <div style="display: block;text-align: left" v-html="text"></div>
                <div style="float: right"><small>发布时间:{{insertTime}}</small></div>
              </span>
            </div>
    </md-card-content>
    <md-card-actions>
      <md-button v-if="$store.state.user.type!=0" class="md-raised" style="color:#448aff;float: right;padding-right: 0!important;" v-on:click="edit_flag=true"><md-icon style="color: #448aff;">edit</md-icon>编辑</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
  export default {
    name: 'RewardCard',
    data: () => ({
      edit_flag:false,
      text:null,
      insertTime: null
    }),
    methods:{
      get_reward_new() {
        let _this = this
        this.$myapi.get("/reward_info/get_last", null, function (res) {
          _this.text = res.data.text
          _this.insertTime = _this.$myapi.parseMyDate(res.data.insertTime)
        })
      },
      save(){
        let _this = this
        _this.edit_flag = false
        _this.$myapi.post("/reward_info/add",{text:_this.text},function (res) {
          _this.$alert.show(100,"保存成功")
        })
      }
    },
    created() {
      this.get_reward_new()
    }
  }
</script>

<style scoped>
  .md-card{
    box-shadow: 0 0 0 white;
  }
</style>
