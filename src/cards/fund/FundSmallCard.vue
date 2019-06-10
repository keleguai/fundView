<template>
  <div>
    <a :href="'/#/fund/'+fund.fundId" style="color: #555">
      <md-card-header>
        <md-card-media md-ratio="1:1">
          <img :src="fund.photo"/>
        </md-card-media>
      </md-card-header>
      <p style="border: 1px solid #f4f4f4;">{{fund.fundName}}</p>
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
  .md-card {
    box-shadow: 0 0 0 white;
  }
</style>
