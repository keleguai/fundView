<template>
  <div>
    <!--<SmallPerson :words="words" :duration="10000"/>-->
    <!--登录前模块-->
    <div class="md-layout md-gutter md-alignment-top-center" style="margin-top: 40px">
      <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-90 md-size-70">
        <ForgetPswCard/>
      </div>
    </div>

  </div>
</template>

<script>
  import ForgetPswCard from '../../cards/user/ForgetPswCard'

  export default {
    name: 'ForgetPsw',
    components: {
      ForgetPswCard
    },
    created() {
      this.$store.commit("setWords", ['哼，忘记了密码的你！！！！', '忘记了密码也不用太过担心哟。'])
    }
  }
</script>
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
