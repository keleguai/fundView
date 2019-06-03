<template>
  <div>
    <!--<md-card>-->
    <!-- 合作企业卡片 -->
    <md-card-header>
      <div class="md-title" style="text-align: left">
        基金列表
      </div>
      <p class="md-subhead" v-if="funds.length">
        左右滑动查看更多...
      </p>
      <p class="md-subhead" v-else>
        什么....?居然没有相对应的基金.....
      </p>
    </md-card-header>
    <md-card-content class="md-card-content">
      <md-content style="overflow-y: hidden; overflow-x:scroll; white-space:nowrap; width: 100%"
                  class="md-scrollbar">
        <template v-for="fund in funds">
          <a :href="'/#/fund/'+fund.fundId">
            <md-card class="scrollable-card">
              <md-card-header>
                <md-card-media md-ratio="1:1">
                  <img :src="fund.photo">
                </md-card-media>
              </md-card-header>
              <md-card-header>
                    <span class="md-title nobr" style="max-width: 200px;">
                      {{ fund.fundName }}
                    </span>
                <span class="md-subhead">
                      {{ fund.fundId }}
                    </span>
              </md-card-header>

              <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <md-button :to="'/fund/'+fund.fundId+'/#'">了解更多</md-button>
                </md-card-actions>
              </md-card-expand>
            </md-card>
          </a>
        </template>
      </md-content>
    </md-card-content>
    <!--</md-card>-->
  </div>
</template>

<script>
  export default {
    props: ['funds'],
    name: 'CooperativeCompanies'
  }
</script>

<style scoped>
  .scrollable-card {
    display: inline-block;
    width: 200px;
    position: relative;
    margin-bottom: 20px !important;
    margin-right: 40px;
  }

  .nobr {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .md-card{
    box-shadow: none;
    border: 1px solid #f4f4f4;
  }
</style>
