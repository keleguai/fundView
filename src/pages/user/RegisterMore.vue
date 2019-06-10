<template>
  <div class="md-layout md-gutter md-alignment-top-center" style="margin-top: 40px">
    <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-70 md-size-70 md-large-size-70">
      <EditCard/>
    </div>
  </div>
</template>

<script>
  import EditCard from '../../cards/user/EditCard'

  export default {
    name: "Register-more",
    components: {
      EditCard
    },
    created() {
      this.$store.commit("setWords", ['信息要认真填写哦'])
    }
  }
</script>

<style scoped>

</style>
