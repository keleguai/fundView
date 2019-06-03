<template>
  <div>
    <div class="md-layout md-alignment-top-center md-gutter" style="margin-top: 16px">
      <div
        class="md-layout-item md-large-size-30 md-medium-size-30 md-size-30 md-small-size-100 md-xsmall-size-100">
        <!--<div-->
          <!--class="md-layout-item md-large-size-100 md-medium-size-100 md-size-100 md-small-size-100 md-xsmall-size-100">-->
        <!--<md-list>-->
          <!--<md-list-item style="border-bottom: 1px solid #f4f4f4;">-->
            <!--<md-icon class="md-primary" v-show="user_flag">done</md-icon>-->
            <!--<a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"-->
               <!--@click="show_user_rank" href="javascript:void(0)">用户排行榜</a>-->
          <!--</md-list-item>-->
          <!--<md-list-item style="border-bottom: 1px solid #f4f4f4;">-->
            <!--<md-icon class="md-primary" v-show="fund_flag">done</md-icon>-->
            <!--<a class="md-list-item-text" style="color: #999;text-align: center;text-decoration:none"-->
               <!--@click="show_fund_rank" href="javascript:void(0)">基金排行榜</a>-->
          <!--</md-list-item>-->
        <!--</md-list>-->
        <!--</div>-->
        <div
          class="md-layout-item md-large-size-100 md-medium-size-100 md-size-100 md-small-size-100 md-xsmall-size-100">
          <RewardCard/>
        </div>
        <div
          class="md-layout-item md-large-size-100 md-medium-size-100 md-size-100 md-small-size-100 md-xsmall-size-100" style="margin-top: 16px">
          <CommentCard :rank_id="rank_id"/>
        </div>
      </div>

      <div
        class="md-layout-item md-large-size-45 md-medium-size-45 md-size-45 md-small-size-100 md-xsmall-size-100">
        <md-card style="margin-top: 0px">
          <md-card-content id="top">


            <h1
              style="text-align: left;font-size: 20px;color: #666;padding-bottom: 13px;border-bottom: 1px solid #e8e8e8;">
              <span v-show="user_flag">用户排行榜<small>(为保护隐私仅展示前十名)</small></span>
              <span v-show="fund_flag">基金排行榜</span>
            </h1>

            <div style="text-align: left">
              <h3 style="color: #666;font-size: 16px;margin-left: 24px;margin-right:20px;font-weight: 700;display: inline-block">
                排行
              </h3>
              <ul style="display: inline-block;">
                <li class="li"v-on:click="show_user_rank"
                    :style="user_flag?'color:#fff;background-color:#448aff':''">
                  用户排行榜
                </li>
                <li class="li"v-on:click="show_fund_rank"
                    :style="fund_flag?'color:#fff;background-color:#448aff':''">
                  基金排行榜
                </li>
              </ul>
            </div>

            <div style="text-align: left">
              <h3 style="color: #666;font-size: 16px;margin-left: 24px;margin-right:20px;font-weight: 700;display: inline-block">
                时间
              </h3>
              <ul style="display: inline-block;">
                <li class="li"v-on:click="get_rank(30,1)"
                  :style="day==30?'color:#fff;background-color:#448aff':''">
                  30天
                </li>
                <li class="li"v-on:click="get_rank(180,1)"
                    :style="day==180?'color:#fff;background-color:#448aff':''">
                  180天
                </li>
                <li class="li"v-on:click="get_rank(365,1)"
                    :style="day==365?'color:#fff;background-color:#448aff':''">
                  365天
                </li>
              </ul>
            </div>

            <div v-show="user_flag">
              <template v-for="(user,index) in users">
                <div class="md-layout md-gutter md-alignment-top-center"
                     style="margin-top: 10px;border-bottom: 1px solid #f4f4f4; ">
                  <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30 md-small-hide">
                    <md-card-header>
                      <md-card-media md-ratio="1:1">
                        <img :src="user.userInfo.photoUrl" style="width: 100%"/>
                      </md-card-media>
                    </md-card-header>
                  </div>
                  <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-50">
                    <p class="li" >
                      {{user.userInfo.userName}}
                    </p>
                    <p>
                      <span v-if="user.userInfo.autograph"><small>{{user.userInfo.autograph}}</small></span>
                      <span v-else><small>高手不留名....</small></span>
                    </p>

                  </div>
                  <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-50">
                    <li  class="li" :style="(parseInt(index)+1)+(parseInt(page-1)*5)<=3?'font-size: 18px;text-align: left;line-height: 18px;color:#75bbe1;':'color:#fff;background-color:#75bbe1;'">
                      <span v-show="(parseInt(index)+1)+(parseInt(page-1)*5)<=3">TOP</span> {{(parseInt(index)+1)+(parseInt(page-1)*5)}}
                    </li>
                    <p class="li"><small>收益率：{{((user.getRate-1)*100).toFixed(2)}}%</small></p>
                  </div>
                </div>
              </template>


            </div>


            <div v-show="fund_flag">
              <div class="md-layout md-gutter md-alignment-top-center"
                   style="margin-top: 10px;border-bottom: 1px solid #f4f4f4; "
                   v-for="(fund,index) in this.funds">
                <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">
                  <md-card-header>
                    <a style="text-underline: none;color: #666" :href="'/#/fund/'+fund.fundId">
                    <md-card-media md-ratio="1:1">
                      <img :src="fund.photo" style="width: 100%"/>
                    </md-card-media>
                    </a>
                  </md-card-header>
                </div>
                <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">

                  <li class="li" style="text-align: left">
                    <a style="text-underline: none;color: #666" :href="'/#/fund/'+fund.fundId">{{fund.fundName}}({{fund.fundId}})</a>
                  </li>
                  <span class="li" style="text-align: left;float: left" v-for="(manager,index) in fund.managerNames">
                    <a style="text-underline: none;text-align: left" :href="'/#/manager/'+fund.managerIds[index]">{{manager}}</a>
                  </span>

                </div>
                <div class="md-layout-item md-large-size-30 md-medium-size-30 md-small-size-30 md-xsmall-size-30">
                  <a style="text-underline: none;color: #666" :href="'/#/fund/'+fund.fundId">
                  <li  class="li" :style="(parseInt(index)+1)+(parseInt(page-1)*5)<=3?'font-size: 18px;text-align: left;line-height: 18px;color: #f49c9c;':'color:#fff;background-color:#f49c9c;'">
                    <span v-show="(parseInt(index)+1)+(parseInt(page-1)*5)<=3">TOP</span> {{(parseInt(index)+1)+(parseInt(page-1)*5)}}
                  </li>
                  <li class="li">收益率：{{(((parseFloat(fund.historyRate))-1)*100).toFixed(2)}}%</li>
                  </a>
                </div>
              </div>
              <md-card-actions>
                <md-field :class="$myapi.isMoreThanLastPage(page,end_page)">
                  <label>{{page}}页/{{end_page}}页</label>
                  <md-input v-model="page" type="number"></md-input>
                  <span class="md-error">页数为负数或者超出最大页数</span>

                </md-field>
                <md-button v-on:click="get_rank(day,page)">跳转</md-button>
                <md-button class="md-primary" v-if="page!=1" v-on:click="pre">
                  上一页.
                </md-button>
                <md-button class="md-primary" v-if="page!=end_page" v-on:click="next">
                  下一页.
                </md-button>
              </md-card-actions>
            </div>

          </md-card-content>
        </md-card>
      </div>


    </div>
  </div>
</template>

<script>
  import RewardCard from '../../cards/normal/RewardCard'
  import CommentCard from '../../cards/normal/CommentCard'
  export default {
    name: 'Rank',
    components:{
      RewardCard,
      CommentCard
    },
    data() {
      return {
        select_see_date: 30,
        user_flag: true,
        fund_flag: false,
        words: ['<b style="color:#555;">做人是不可攀比的哦，更不可以嫉妒的吖', '<b style="color:orange;">不要被软妹币乱了眼吖'],
        funds: [],
        page: 1,
        end_page: 1,
        users: [],
        rank_id:1
      }
    },
    methods: {
      next() {
        this.page = parseInt(this.page) + 1;
        this.get_rank(this.day, this.page)
      },
      pre() {
        this.page = parseInt(this.page) - 1;
        this.get_rank(this.day, this.page)
      },
      show_user_rank() {
        this.page = 1
        this.user_flag = true;
        this.fund_flag = false;
        this.select_see_date = 30;
        this.get_user_rank(this.select_see_date)
      },
      show_fund_rank() {
        this.user_flag = false;
        this.fund_flag = true;
        this.select_see_date = 30;
        this.get_fund_rank(this.select_see_date, 1)
      },
      get_fund_rank(day, page) {
        let _this = this;
        _this.page = page;
        _this.day = day;
        _this.$myapi.get('/historical_fund/rank/' + day + '/' + _this.page, {}, function (res) {
          _this.funds = res.data.list;
          for (let i = 0; i < _this.funds.length; i++) {
            _this.funds[i].managerNames = _this.funds[i].managerNames.split('-');
            _this.funds[i].managerIds = _this.funds[i].managerIds.split('-')
          }
          _this.end_page = res.data.lastPage;
          _this.$myapi.returnTop("top")
        })
      },
      get_user_rank(day) {
        let _this = this;
        _this.day = day;
        _this.$myapi.get('/fund/rank/user/' + day, {}, function (res) {
          _this.users = res.data;
          _this.end_page = 1;
          _this.$myapi.returnTop("top")
        })
      },
      get_rank(day, page) {
        if (this.$myapi.isMoreThanLastPage(this.page, this.end_page)) {
          return
        }
        if (this.fund_flag) {
          this.get_fund_rank(day, page)
        } else {
          this.get_user_rank(day)
        }
      }
    },
    created() {
      this.show_user_rank(30);
      this.$store.commit("setWords", this.words)

      // this.init_weibo()
      // this.isLoginIn()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .li{
    font-size: 16px;margin: 0 13px 14px 0;padding: 2px 10px;color: #666;cursor: pointer;
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
  .md-card{
    box-shadow: 0 0 0 white;
  }

</style>
