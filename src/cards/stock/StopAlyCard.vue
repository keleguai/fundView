<template>
  <InfoTemp :temp-names="tempNames" :temp-datas="tempDatas"/>
</template>

<script>
  import InfoTemp from '../normal/InfoTemp'

  export default {
    name: "StopAlyCard",
    components: {InfoTemp},
    data() {
      return {
        tempNames: ['停牌股票数量', '全部股票数目', '比值'],
        tempDatas: [],
        disCount: 0,
        count:0,
        rate:0
      }
    },
    created() {
      let _this = this
      _this.$myapi.get('/stock/disappear/1',{},function (res) {
        _this.disCount = res.data.total
        _this.$myapi.get('/stock/list/1/8',{},function (res) {
          _this.count = res.data.total
          _this.tempDatas.push(_this.disCount)
          _this.tempDatas.push(_this.count)
          _this.tempDatas.push(((_this.disCount/_this.count)*100).toFixed(2)+'%')
        })
      })

    }
  }
</script>

<style scoped>

</style>
