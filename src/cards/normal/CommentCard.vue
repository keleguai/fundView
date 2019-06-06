<template>
  <md-card>
    <md-card-header>
      <div style="color: #6b6b6b;
    height: 24px;
    font-size: 24px;
    line-height: 24px;text-align: left">热门评论
      </div>

    </md-card-header>
    <md-card-content>
      <div style="    text-align: center;
    background: #f4f4f4;
    margin: 20px;
    font: 400 14px/40px STHeiti,'Microsoft Yahei';
    color: #999;
    cursor: pointer;" v-if="!comments.length">来当第一个留言的人吧！</div>
      <div class="md-layout md-gutter md-alignment-top-center"
           style="margin-top: 10px;border-bottom: 1px solid #f4f4f4;" v-for="comment in comments">
        <div class="md-layout-item md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
          <md-avatar style="height: 50px;width: 50px;text-align: left;float: left">
            <img :src="comment.photoUrl" style="width: 100%"/>
          </md-avatar>
          <div style="float: left;padding-left: 10px;width: 70%">
            <div style="text-align: left;margin-top: 8px">
              <span style="font-size: 14px;color: #898989;margin-right: 5px">{{comment.userName}}</span>
              <span style="font-size: 12px;color: #b7b7b7">{{$myapi.parseMyDate(comment.insertTime)}}</span>
              <p style="color: #535353;font-size: 14px;line-height:20px"><span v-show="comment.replyContent"
                                                                               style="color: #448aff">{{comment.replyContent}}</span>
                {{comment.text}}</p>
              <p style="text-align: left"><a href="javascript:void(0)" style="color: #b7b7b7;font-size: 12px;"
                                             v-on:click="addReply(comment.userName,comment.userId,comment.id)">{{!form.reply_content||form.reply_id!=comment.id?'回复':'取消回复'}}</a>
              </p>
            </div>
          </div>
          <md-card-actions v-if="!(!form.reply_content||form.reply_id!=comment.id)" style="float: left">
            <md-field>
              <label>{{form.reply_content?form.reply_content:'评论.....'}}</label>
              <md-input maxlength="50" v-model="form.text"></md-input>
            </md-field>
            <md-button class="md-primary" v-on:click="addComment">
              <md-icon>done</md-icon>
              评论
            </md-button>
          </md-card-actions>
        </div>
      </div>
      <md-card-actions>
        <md-button class="md-primary" v-if="page!=1" v-on:click="pre">上一页</md-button>
        <md-button class="md-primary" v-if="page!=end_page" v-on:click="next">下一页</md-button>
      </md-card-actions>
      <md-card-actions>
        <md-field>
          <label>{{form.reply_content?form.reply_content:'评论.....'}}</label>
          <md-input maxlength="50" v-model="form.text"></md-input>
        </md-field>
        <md-button class="md-primary" v-on:click="addComment">
          <md-icon>done</md-icon>
          评论
        </md-button>
      </md-card-actions>

    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: "CommentCard",
    props: ['manager_id', 'fund_id','rank_id'],
    data() {
      return {
        comments: [],
        form: {
          fund_id: null,
          manager_id: null,
          text: null,
          reply_id: null,
          reply_content: null,
          reply_user_id: null,
          rank_id:null
        },
        page: 1,
        end_page: 1
      }
    },
    methods: {
      next() {
        this.page = parseInt(this.page) + 1
        this.getComments()
      },
      pre() {
        this.page = parseInt(this.page) - 1
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
      addComment() {
        let _this = this;
        _this.setAddCommentType()
        _this.$myapi.post('/comment/add', _this.form, function (res) {
          _this.form.text = null;
          _this.getComments();
          _this.clearReply()
        })
      },
      getCommentsApiUrl() {
        if(this.fund_id){
          return '/comment/fund/' + this.fund_id + '/' + this.page
        }else if(this.manager_id){
          return '/comment/manager/' + this.manager_id + '/' + this.page
        } else if(this.rank_id){
          return '/comment/rank/' + this.rank_id + '/' + this.page
        }
      },
      setAddCommentType() {
        this.form.fund_id = this.fund_id;
        this.form.manager_id = this.manager_id;
        this.form.rank_id = this.rank_id
      },
      getComments() {
        let _this = this;
        let url = _this.getCommentsApiUrl()
        _this.$myapi.get(url, {}, function (res) {
          _this.comments = res.data.list;
          _this.end_page = res.data.lastPage
          if(_this.end_page == 0){
            _this.end_page = 1
          }
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
</style>
