<template>
  <div>
    <div class="md-layout md-gutter md-alignment-top-center" style="margin-top: 40px;padding-top: 0!important;">
      <div class="md-layout  md-gutter md-alignment-top-center" style="padding-top: 0!important;">
        <div class="md-layout-item md-large-size-70 md-medium-size-70 md-small-size-100 md-xsmall-size-100">
          <LoginCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginCard from '../../cards/user/LoginCard'

  export default {
    name: 'Login',
    components: {
      LoginCard
    },
    created() {
      this.$store.commit("setWords", ['哼，再不登录我就生气辣！', '你在干什么呢？可以和我说说话吗？', '没有注册过的亲亲可以偷偷跑去注册哦。'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  .md-card {
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

</style>
