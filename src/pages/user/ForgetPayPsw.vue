<template>
  <div>
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-25 md-large-size-25 md-medium-size-25 md-small-size-100 md-xsmall-size-100">
        <UserCard/>
      </div>

      <div
        class="md-layout-item md-size-50 md-large-size-50 md-medium-size-50 md-small-size-100 md-xsmall-size-100">
        <ForgetPayPswCard/>
      </div>
    </div>
  </div>

</template>

<script>
  import ForgetPayPswCard from "../../cards/user/ForgetPayPswCard"
  import UserCard from "../../cards/user/UserCard"

  export default {
    name: "ForgetPayPsw",
    components: {
      ForgetPayPswCard,
      UserCard
    },
    created() {
      this.$store.commit("setWords",['<b style="color:orange;">你你你.......在偷偷编辑个人信息！</b>'])
    }
  }
</script>

<style scoped>

</style>
