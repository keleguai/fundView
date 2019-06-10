<template>
  <div>
    <div class="md-layout md-gutter md-alignment-top-center" style="margin-top: 40px">
      <div class="md-layout-item md-large-size-70 md-medium-size-70 md-small-size-100 md-xsmall-size-100">
        <Register/>
      </div>
    </div>


  </div>
</template>

<script>
  import Register from '../../cards/user/RegisterCard'

  export default {
    name: 'Index',
    components: {
      Register
    },
    created() {
      this.$store.commit("setWords", ['哼，看什么看！注册叭', '注册完啦我再和你说说话'])
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
