<template>
  <md-dialog :md-active.sync="$store.state.msg.isLoadDialog" class="md-elevation-5 ">
    <md-dialog-content>
      <p>
        (｡･∀･)ﾉﾞ嗨
      </p>
      <p v-if="$store.state.msg.code==100" v-html="$store.state.msg.content">
      </p>
      <div v-else-if="$store.state.msg.code==401">
        <p>{{$store.state.msg.content}}</p>
        <span>虽然你还没登录，但是你可以<a href="javascript:void(0)" v-on:click="go_to_login">点我登录</a></span>
      </div>
      <div v-else-if="$store.state.msg.code==233">
        <p v-html="$store.state.msg.content">{{$store.state.msg.content}}</p>
        <span>是否返回上一个界面？<a href="javascript:void(0)" v-on:click="go_back">是</a></span>
      </div>
      <p v-else>
        {{$store.state.msg.content}}
      </p>
      <md-card-actions>
        <a v-on:click="$store.commit('closeDialog')" href="#">{{$store.state.msg.code==401||$store.state.msg.code==233?'关闭':'好哒'}}</a>
      </md-card-actions>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
  export default {
    name: "DialogCard",
    methods:{
      go_to_login(){
        this.$store.commit("closeDialog")
        this.$router.push('/login')
      },
      go_back(){
        this.$store.commit("closeDialog")
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
