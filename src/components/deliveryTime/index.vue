<template>
  <div class="container order-time-info">
    <section class="box border-right">
      <p class="header">下单时间</p>
      <p class="time">{{orderTime}}</p>
    </section>
    <section class="box">
      <p class="header">配送时间</p>
      <p class="time">{{distributionTime}}</p>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    orderTime: String, // 下单时间
    distributionTime: String // 配送时间
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="stylus">
.order-time-info
  display flex
  justify-content space-between
  flex-wrap nowrap
  text-align center
  border 1px solid #eee
  line-height 70rpx
  .box
    width 50%
  .header
    background #f6f6f6
    color #777
</style>
