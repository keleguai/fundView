<template>
  <div id="title">
    <div class="md-layout md-alignment-top-center md-gutter">

      <div class="md-layout-item md-size-75 md-large-size-75 md-medium-size-75 md-small-size-100 md-xsmall-size-100">
        <FundInfoCard/>
      </div>
    </div>
    <div class="md-layout md-alignment-top-center md-gutter" style="margin-top: 0!important;padding-top: 0px!important;">
      <div class="md-layout-item md-size-30 md-large-size-30 md-medium-size-30 md-small-size-100 md-xsmall-size-100">
        <FundCard/>
      </div>
      <div class="md-layout-item md-size-45 md-large-size-45 md-medium-size-45 md-small-size-100 md-xsmall-size-100">
        <CommentCard :manager_id="null" :fund_id="$route.params.id"/>
      </div>
    </div>
  </div>
</template>

<script>
  import FundCard from "../../cards/fund/FundCard"
  import FundInfoCard from "../../cards/fund/FundInfoCard"
  import CommentCard from '../../cards/normal/CommentCard'

  export default {
    name: "Fund",
    components: {
      FundCard,
      FundInfoCard,
      CommentCard
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
  .md-layout .md-layout-item {
    margin-top: 0;
  }
</style>
