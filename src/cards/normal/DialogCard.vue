<template>
  <md-dialog :md-active.sync="$store.state.msg.isLoadDialog" class="md-elevation-5 ">
    <md-dialog-content>
      <p>
        (｡･∀･)ﾉﾞ嗨
      </p>
      <p v-if="$store.state.msg.code==100">
        {{$store.state.msg.content}}
      </p>
      <div v-else-if="$store.state.msg.code==401">
        <p>{{$store.state.msg.content}}</p>
        <span>虽然你还没登录，但是你可以<a href="#" v-on:click="go_to_login">点我登录</a></span>
      </div>
      <p v-else>
        {{$store.state.msg.content}}
      </p>
      <md-card-actions>
        <a v-on:click="$store.commit('closeDialog')" href="#">好哒</a>
      </md-card-actions>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
  export default {
    name: "DialogCard",
    methods:{
      go_to_login(){
        this.$router.push('/login')
        this.$store.commit("closeDialog")
      }
    }
  }
</script>

<style scoped>

</style>
