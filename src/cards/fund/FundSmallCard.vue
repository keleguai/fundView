<template>
  <div>
    <a :href="'/#/fund/'+fund.fundId" style="color: #555">
      <md-card-media md-ratio="1:1">
        <img :src="fund.photo"/>
      </md-card-media>
      <p>{{fund.fundName}}</p>
    </a>
  </div>
</template>

<script>
  export default {
    name: "FundSmallCard",
    props: ['fund']
  }
</script>

<style scoped>
  .md-card{
    box-shadow: 0 0 0 white;
  }
</style>
