<template>
  <section class="container">
    <p class="text">您是第
      <span class="rank">{{rank}}</span>位购买用户，支付后可返现
      <span class="sale">￥{{sale}}</span>
    </p>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    rank: Number,
    sale: Number
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .text
    no-wrap()
    height 68rpx
    border 1rpx #ff9996 solid
    background #fff7f8
    border-radius 4px
    font-size 14px
    box-sizing border-box
    padding 15rpx 20rpx
    .rank, .sale
      color $color-theme
</style>
