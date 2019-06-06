<template>
  <div class="md-layout md-alignment-top-center md-gutter">
    <div
      class="md-layout-item md-large-size-25 md-medium-size-25 md-size-25 md-small-size-100 md-xsmall-size-100">
      <UserAlyCard/>
    </div>
    <div
      class="md-layout-item md-large-size-50 md-medium-size-50 md-size-50 md-small-size-100 md-xsmall-size-100">
      <md-card>
        <md-card-header>
          <div style="color: #6b6b6b;
    height: 24px;
    font-size: 24px;
    line-height: 24px;text-align: left">{{!all&&read?'已读消息':''}}{{all?'全部消息':''}}{{!all&&!read?'未读消息':''}}
          </div>
        </md-card-header>
        <md-card-content>
          <div style="text-align: left">
            <h3
              style="color: #666;font-size: 16px;margin-left: 24px;margin-right:20px;font-weight: 700;display: inline-block">
              消息
            </h3>
            <ul style="display: inline-block;">
              <li class="li" v-on:click="get_not_read"
                  :style="!read&&!all?'color:#fff;background-color:#448aff':''">
                未读
              </li>
              <li class="li" v-on:click="get_all"
                  :style="all?'color:#fff;background-color:#448aff':''">
                全部
              </li>
              <li class="li" v-on:click="get_read"
                  :style="read&&!all?'color:#fff;background-color:#448aff':''">
                已读
              </li>
            </ul>
          </div>
        </md-card-content>
        <md-card-content>
          <div style="    text-align: center;
    background: #f4f4f4;
    margin: 20px;
    font: 400 14px/40px STHeiti,'Microsoft Yahei';
    color: #999;
    cursor: pointer;" v-if="!comments.length">暂时没有可显示的消息哦</div>
          <div class="md-layout md-gutter md-alignment-top-center"
               style="margin-top: 10px;border-bottom: 1px solid #f4f4f4;">
            <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
                 v-for="comment in comments" style="border-bottom: 1px solid #e8e8e8">
              <md-avatar style="height: 50px;width: 50px;text-align: left;float: left">
                <img :src="comment.photoUrl" style="width: 100%"/>
              </md-avatar>
              <div style="float: left;padding-left: 10px;width: 70%">
                <div style="text-align: left;margin-top: 8px">
                  <span style="font-size: 14px;color: #898989;margin-right: 5px">{{comment.userName}}</span>
                  <a style="font-size: 12px;color: #448aff" v-if="comment.fundId" :href="'/#/fund/'+comment.fundId">在基金区({{comment.fundId}})回复</a>
                  <a style="font-size: 12px;color: #448aff" v-else-if="comment.managerId" :href="'/#/manager/'+comment.managerId">在经理区({{comment.managerId}})回复</a>
                  <a style="font-size: 12px;color: #448aff" v-else-if="comment.rankId==1" :href="'/#/rank'">在排行榜回复</a>
                  <a style="font-size: 12px;color: #448aff" v-else-if="comment.rankId==2" :href="'/#/stop-stock'">在停牌榜回复</a>
                  <a style="font-size: 12px;color: #448aff" v-else-if="comment.rankId==3" :href="'/#/all-fund'">在全部基金区回复</a>

                  <span style="font-size: 12px;color: #b7b7b7;display: block">{{$myapi.parseMyDate(comment.insertTime)}}</span>

                  <p style="color: #535353;font-size: 14px;line-height:20px">
                    {{comment.text}}
                  </p>
                  <div style="background-color: #ebebeb;padding: 5px" v-if="comment.firstText">
                    <span style="font-size: 14px;color: #898989;margin-right: 5px;">原文：{{comment.firstText}}</span>
                  </div>
                  <p style="text-align: left"><a href="javascript:void(0)" style="color: #b7b7b7;font-size: 12px;"
                                                 v-on:click="addReply(comment.userName,comment.userId,comment.id)">{{!form.reply_content||form.reply_id!=comment.id?'回复':'取消回复'}}</a>
                  </p>
                  <md-card-actions v-if="!(!form.reply_content||form.reply_id!=comment.id)">
                    <md-field>
                      <label>{{form.reply_content?form.reply_content:'评论.....'}}</label>
                      <md-input maxlength="50" v-model="form.text"></md-input>
                    </md-field>
                    <md-button class="md-primary" v-on:click="addComment(comment)">
                      <md-icon>done</md-icon>
                      评论
                    </md-button>
                  </md-card-actions>
                </div>
              </div>
            </div>
          </div>
          <md-card-actions>
            <md-button class="md-primary" v-if="page!=1" v-on:click="pre">上一页</md-button>
            <md-button class="md-primary" v-if="page!=end_page" v-on:click="next">下一页</md-button>
          </md-card-actions>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  import NotificationCard from '../../cards/user/NotificationCard'
  import UserAlyCard from '../../cards/user/UserAlyCard'

  export default {
    name: "Notification",
    components: {
      NotificationCard,
      UserAlyCard
    },
    data() {
      return {
        comments: [],
        read: false,
        all: false,
        type: 0,
        form: {
          fund_id: null,
          manager_id: null,
          text: '',
          reply_id: null,
          reply_content: '',
          reply_user_id: null,
          rank_id: null
        },
        page: 1,
        end_page: 1
      }
    },
    methods: {
      get_not_read() {
        this.type = 0;
        this.read = false;
        this.page = 1;
        this.all = false;
        this.getComments()
      },
      get_read() {
        this.type = 1;
        this.page = 1;
        this.read = true;
        this.all = false;
        this.getComments()
      },
      get_all() {
        this.type = null;
        this.all = true;
        this.page = 1;
        this.getComments()
      },
      next() {
        this.page = parseInt(this.page) + 1;
        this.getComments()
      },
      pre() {
        this.page = parseInt(this.page) - 1;
        this.getComments()
      },
      clearReply() {
        this.form.reply_id = null;
        this.form.reply_content = '';
        this.form.reply_user_id = null
      },
      addReply(name, reply_user_id, reply_id) {
        if (this.form.reply_content && this.form.reply_id == reply_id) {
          this.clearReply()
        } else {
          this.form.reply_id = reply_id;
          this.form.reply_content = '@' + name;
          this.form.reply_user_id = reply_user_id
        }
      },
      addComment(comment) {
        let _this = this;
        _this.setAddCommentType(comment);
        _this.$myapi.post('/comment/add', _this.form, function (res) {
          _this.form.text = null;
          _this.getComments();
          _this.clearReply()
          _this.$alert.show(100,"回复成功")
        })
      },
      getCommentsApiUrl() {
        if (this.fund_id) {
          return '/comment/fund/' + this.fund_id + '/' + this.page
        } else if (this.manager_id) {
          return '/comment/manager/' + this.manager_id + '/' + this.page
        } else if (this.rank_id) {
          return '/comment/rank/' + this.rank_id + '/' + this.page
        }
      },
      setAddCommentType(comment) {
        this.form.fund_id = comment.fundId;
        this.form.manager_id = comment.managerId;
        this.form.rank_id = comment.rankId
      },
      getComments() {
        let _this = this;
        _this.$myapi.get('/comment/notification/' + _this.page, {type: _this.type}, function (res) {
          _this.comments = res.data.list;
          _this.end_page = res.data.lastPage;
          if (_this.end_page == 0) {
            _this.end_page = 1
          }
          _this.$myapi.returnTop("top")
        })
      }
    },
    created() {
      this.getComments()
    }
  }
</script>

<style scoped>
  .md-card {
    box-shadow: none;
  }

  .li {
    font-size: 16px;
    margin: 0 13px 14px 0;
    padding: 2px 10px;
    color: #666;
    cursor: pointer;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
