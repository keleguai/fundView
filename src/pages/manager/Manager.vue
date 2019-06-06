<template>
  <div>
    <div class="md-layout md-alignment-top-center md-gutter">
      <div class="md-layout-item md-size-30 md-large-size-30 md-medium-size-30 md-small-size-100 md-xsmall-size-100">
        <ManagerCard/>
        <CommentCard :manager_id="$route.params.id" :fund_id="null"/>
      </div>
      <div
        class="md-layout-item md-large-size-45 md-medium-size-45 md-size-45 md-small-size-100 md-xsmall-size-100">
        <ManagerProducts/>
      </div>
    </div>
  </div>

</template>

<script>
  import ManagerProducts from "../../cards/Manager/ManagerProductsCard"
  import ManagerCard from "../../cards/Manager/ManagerCard"
  import CommentCard from '../../cards/normal/CommentCard'

  export default {
    name: "Manager",
    components: {
      ManagerProducts,
      ManagerCard,
      CommentCard
    },
    created() {
      this.$myapi.returnTop("top")
    }
  }
</script>

<style scoped>
</style>
