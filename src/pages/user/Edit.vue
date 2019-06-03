<template>
  <div>
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-25 md-large-size-25 md-medium-size-25 md-small-size-100 md-xsmall-size-100">
        <div
          class="md-layout-item md-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
          <UserAlyCard/>
        </div>
        <div
          class="md-layout-item md-size-100 md-large-size-100 md-medium-size-100 md-small-size-100 md-xsmall-size-100">
          <UserCard/>
        </div>

      </div>

      <div
        class="md-layout-item md-large-size-50 md-medium-size-40 md-small-size-100 md-xsmall-size-100">
        <EditCard/>
      </div>
    </div>
  </div>

</template>

<script>
  import EditCard from "../../cards/user/EditCard"
  import UserCard from "../../cards/user/UserCard"
  import UserAlyCard from "../../cards/user/UserAlyCard"

  export default {
    name: "Edit",
    components: {
      EditCard,
      UserCard,
      UserAlyCard
    },
    created() {
      this.$store.commit("setWords", ['<b style="color:orange;">你你你.......在偷偷编辑个人信息！</b>'])
    }
  }
</script>

<style scoped>

</style>
