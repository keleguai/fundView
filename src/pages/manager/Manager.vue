<template>
  <div>
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-30 md-large-size-30 md-medium-size-30 md-small-size-100 md-xsmall-size-100">
        <ManagerCard/>
      </div>
      <div
        class="md-layout-item md-large-size-60 md-medium-size-60 md-size-60 md-small-size-100 md-xsmall-size-100">
        <ManagerProducts/>
      </div>
    </div>
  </div>

</template>

<script>
  import ManagerProducts from "../../cards/Manager/ManagerProductsCard"
  import ManagerCard from "../../cards/Manager/ManagerCard"

  export default {
    name: "Manager",
    components: {
      ManagerProducts,
      ManagerCard
    }
  }
</script>

<style scoped>

</style>
