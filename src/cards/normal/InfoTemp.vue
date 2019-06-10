<template>
  <md-card class="md-primary">
    <md-card-header>
      <md-card-header-text style="text-align: left">
        信息统计
      </md-card-header-text>
    </md-card-header>
    <md-card-content class="md-primary">
      <div class="md-layout" v-show="tempDatas.length">
        <div class="md-layout-item md-size-33">
          <md-card-header class="center">
            <div>
              <span>
                <md-icon style="color: #FFFFFF">
                  art_track
                </md-icon>
                {{tempDatas[0]}}
              </span>
              <p>{{tempNames[0]}}</p>
            </div>
          </md-card-header>
        </div>
        <div class="md-layout-item md-size-33">
          <md-card-header class="center">
            <div>
              <span>
                <md-icon style="color: #FFFFFF">
                  assignment_return
                </md-icon>
                {{tempDatas[1]}}</span>
              <p>{{tempNames[1]}}</p>
            </div>
          </md-card-header>
        </div>
        <div class="md-layout-item md-size-33">
          <md-card-header class="center">
            <div>
              <span>
                <md-icon style="color: #FFFFFF">
                  youtube_searched_for
                </md-icon>
                {{tempDatas[2]}}
              </span>
              <p>{{tempNames[2]}}</p>
            </div>
          </md-card-header>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: "InfoTemp",
    props: ['tempNames', 'tempDatas']
  }
</script>

<style scoped>

</style>
