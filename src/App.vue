<template>
  <div id="app">
    <!--<meta content="no-referrer" name="referrer"/>-->

    <!--<SmallPerson :duration="10000"/>-->
    <DialogCard/>

    <md-dialog :md-active.sync="$store.state.isLoading" style="z-index: 999999">
      <md-dialog-content>
        <p style="text-align: center">请稍候</p>
        <md-progress-bar class="md-primary" md-mode="query"></md-progress-bar>
      </md-dialog-content>
    </md-dialog>
    <md-app style="background-color: white;">
      <md-app-toolbar style="background-color: white" v-if="!$store.state.isAndroid">
        <md-tabs md-alignment="centered">
          <md-tab id="tab-home" md-label="首页" to="/"></md-tab>
          <md-tab id="tab-next" md-label="基金" to="/all-fund"></md-tab>
          <md-tab id="tab-aly" md-label="排行榜" to="/rank"></md-tab>
          <md-tab id="tab-game" md-label="小钱包" to="/mymoney"></md-tab>
          <md-tab id="tab-stop-stock" md-label="停牌表" to="/stop-stock"></md-tab>
        </md-tabs>
        <div class="md-toolbar-section-end" style="padding-left: 10px">
          <div v-if="!($store.state.isLogin)">
            <md-button class="md-primary" to="/login">
              登录
            </md-button>
            <md-button class="md-primary" to="/register">
              注册
            </md-button>
          </div>
          <div v-else>
            <md-menu md-direction="bottom-end">

              <md-button md-menu-trigger>
                <span style="color: #555;line-height: 30px">{{ $store.state.user.info.userName }}</span>
                <md-avatar>
                  <img :src="$store.state.user.info.photoUrl">
                </md-avatar>
              </md-button>
              <md-menu-content>
                <md-menu-item to="/edit">
                  <span>              <md-icon>person</md-icon>编辑个人信息</span>
                </md-menu-item>
                <md-menu-item to="" v-on:click="logout">
                  <md-icon>directions_run</md-icon>
                  <span>登出</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </md-app-toolbar>
      <md-app-toolbar class="md-primary" v-else>
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">宅基通</span>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">选取一个操作...</md-toolbar>
        <md-list>
          <md-list-item >
            <span class="md-list-item-text" @click="goto('/')">首页</span>
          </md-list-item>
          <md-list-item >
            <span class="md-list-item-text" @click="goto('/all-fund')">基金</span>
          </md-list-item>
          <md-list-item >
            <span class="md-list-item-text" @click="goto('/rank')">排行榜</span>
          </md-list-item>
          <md-list-item >
            <span class="md-list-item-text" @click="goto('/mymoney')">小钱包</span>
          </md-list-item>
          <md-list-item >
            <span class="md-list-item-text" @click="goto('/stop-stock')">停牌表</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content v-if="$store.state.isAndroid" style="padding: 0px">
        <router-view/>
      </md-app-content>

    </md-app>
    <router-view v-if="!$store.state.isAndroid"/>
    <footer style="background-color: white;padding: 30px;margin-top: 40px">
      <p>©2018-2019 zhaijitong. All rights reserved.</p>
      <p>作者：金证实习第二小组全体成员（尹浩然，门荣伟，韦韩，李子烁，周海昕，符真榜）</p>
      <p>技术交流群：<a href="#">966420562</a></p>
    </footer>
  </div>

</template>

<script>
  import DialogCard from './cards/normal/DialogCard'
  import SmallPerson from './cards/normal/SmallPerson'

  export default {
    name: 'App',
    components: {
      DialogCard,
      SmallPerson,
    },
    data() {
      return {
        nextImg: null,
        text: null,
        menuVisible: false
      }
    },
    methods: {
      changeImgs() {
        let imgs = ['/static/bk/1.jpg', '/static/bk/2.jpg', '/static/bk/3.jpg', '/static/bk/4.jpg', '/static/bk/5.jpg', '/static/bk/6.jpg', '/static/bk/7.jpg', '/static/bk/8.jpg', '/static/bk/9.jpg', '/static/bk/10.jpg', '/static/bk/11.jpg', '/static/bk/12.jpg', '/static/bk/13.jpg', '/static/bk/14.jpg', '/static/bk/15.jpg', '/static/bk/16.jpg', '/static/bk/17.jpg', '/static/bk/18.jpg', '/static/bk/19.jpg'];
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
          document.body.style.backgroundImage = "url(" + imgs[10] + ")";
          document.body.style.backgroundAttachment = "fixed";
          document.body.style.backgroundRepeat = 'repeat'
        } else {
          this.$store.commit("isComputer");
          this.pcimg()
        }
      },
      pcimg() {
        setInterval(this.pcimgchange, 5000)
      },
      pcimgchange() {
        let imgs = ['http://wx1.sinaimg.cn/large/006okS32ly1fxc2j8dghlj31hc0ukn5v.jpg', 'http://wx4.sinaimg.cn/large/006okS32ly1fxc2j8qhnxj31hc0u0dml.jpg', 'http://wx2.sinaimg.cn/large/006okS32ly1fxc2189brbj31hc0u07az.jpg', 'http://wx1.sinaimg.cn/large/006okS32ly1fxc218ifdaj31hc0u0446.jpg', 'http://wx2.sinaimg.cn/large/006okS32ly1fxc2j9wxkjj31hc0vmk0m.jpg', 'http://wx4.sinaimg.cn/large/006okS32ly1fxc2ja64g4j31hc0sojwa.jpg', 'http://wx2.sinaimg.cn/large/006okS32ly1fxc2in9gmhj31hc11k134.jpg', 'http://wx2.sinaimg.cn/large/006okS32ly1fxc2inw9zxj31hc0u0gqy.jpg', 'http://wx4.sinaimg.cn/large/006okS32ly1fxc2ip2m4xj31hc0u0qa7.jpg', 'http://wx1.sinaimg.cn/large/006okS32ly1fxc2ipysn2j31hc0x343l.jpg', 'http://wx2.sinaimg.cn/large/006okS32ly1fxc2iqh98vj31hc0vvjy8.jpg', 'http://wx4.sinaimg.cn/large/006okS32ly1fxc2ir6yugj31hc12edp2.jpg', 'http://wx4.sinaimg.cn/large/006okS32ly1fxc2i0zv4hj31hc0u07a0.jpg', 'http://wx1.sinaimg.cn/large/006okS32ly1fxc2i1r41aj31hc11qajj.jpg', 'http://wx4.sinaimg.cn/large/006okS32ly1fxc2i27w0bj31hc0wyjzo.jpg', 'http://wx2.sinaimg.cn/large/006okS32ly1fxc2i2iqxsj31hc0v7wje.jpg', 'http://wx3.sinaimg.cn/large/006okS32ly1fxc2i39e8wj31hc11hdph.jpg', 'http://wx2.sinaimg.cn/large/006okS32ly1fxc2i3zaenj31hc13eqf4.jpg', 'http://wx1.sinaimg.cn/large/006okS32ly1fxc2i4f7cij31hc0xcdr2.jpg'];
        let index = Math.floor(Math.random() * imgs.length);
        if (this.nextImg) {
          document.body.style.backgroundImage = "url(" + this.nextImg.src + ")"
        } else {
          document.body.style.backgroundImage = "url(" + imgs[index] + ")"
        }
        this.nextImg = new Image();
        this.nextImg.src = imgs[index]

      },
      getMe() {
        let _this = this;
        this.$myapi.get("/user_info/me", null, function (res) {
          _this.user_info = res.data;
          _this.user_info.bankCardNumber = _this.user_info.bankCardNumber.split('-');
          _this.$store.commit('setUserInfo', _this.user_info)
        })
      },
      logout() {
        sessionStorage.clear();
        this.$store.commit("logout");
        this.$router.push("/")
      },
      goto(url){
        this.$router.push(url)
        this.menuVisible = false

      }
    },
    created: function () {
      if (!(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))) { //移动端
          this.$store.commit("isComputer")
      }
        this.$store.commit("loginByToken", sessionStorage.hasOwnProperty("token"));
      if (this.$store.state.isLogin) {
        this.getMe();
      }
    }
  }
</script>

<style>

  a {
    color: #448aff;
    font-size: 16px;
  }

  body {
    /*color: #555;*/
    /*background-image: url("/static/bk/part-two-bg.jpg");*/
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;


  }

  .md-card {
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  h3, p {
    text-align: left;
  }

  body {
    -webkit-tap-highlight-color: transparent;
    background-color: #ebebeb;
    /*background-color: white;*/
    margin: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    transition: background-image 1s linear;
    -moz-transition: background-image 1s linear; /* Firefox 4 */
    -webkit-transition: background-image 1s linear; /* Safari 和 Chrome */
    -o-transition: background-image 1s linear; /* Opera */

  }

  .md-layout.md-gutter {
    margin-right: 0px;
    margin-left: 0px;
  }


  img {
    /*width: 100%;*/
  }

  .cute_move {
    position: fixed;
    bottom: 20px;
    right: 20px;
    animation-direction: alternate;
    animation: kan-swing 40s linear normal;
    -webkit-animation: kan-swing 40s linear normal;
    z-index: 100;
    animation-iteration-count: infinite;
  }

  .cute_image {
    position: relative;
  }

  @keyframes kan-swing {
    0% {
      transform: rotate(6deg);
    }
    10% {
      transform: rotate(-6deg);
    }
    20% {
      transform: rotate(6deg);
    }
    30% {
      transform: rotate(-6deg);
    }
    40% {
      transform: rotate(6deg);
    }
    50% {
      transform: rotate(-6deg);
    }
    60% {
      transform: rotate(6deg);
    }
    70% {
      transform: rotate(-6deg);
    }
    80% {
      transform: rotate(6deg);
    }
    90% {
      transform: rotate(-6deg);
    }

    100% {
      transform: rotate(6deg);
    }
  }

  .scrollbar {
    width: 30px;
    height: 300px;
    margin: 0 auto;

  }

  *::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  *::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  *::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #EDEDED;
  }

  .my-raised {
    background-color: rgba(10, 10, 0, .1);
    border-radius: 7px;
  }


</style>
