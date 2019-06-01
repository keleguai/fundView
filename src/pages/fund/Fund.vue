<template>
  <div id="title">
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-30 md-large-size-30 md-medium-size-30 md-small-size-100 md-xsmall-size-100">
        <FundCard/>
      </div>
      <div class="md-layout-item md-size-55 md-large-size-55 md-medium-size-55 md-small-size-100 md-xsmall-size-100">
        <FundInfoCard/>
      </div>
    </div>
  </div>
</template>

<script>
  import FundCard from "../../cards/fund/FundCard"
  import FundInfoCard from "../../cards/fund/FundInfoCard"
  export default {
    name: "Fund",
    components: {
      FundCard,
      FundInfoCard,
    },
    data() {
      return {
        words: ['持仓表......?.......详细信息？.......估值表??????????']
      }
    },
    created() {
      this.$store.commit("setWords", this.words)
    },
    mounted() {
      this.$myapi.returnTop('title')
    }
  }
</script>
<style scoped>

</style>
