<template>
  <section class="container">
    <p class="text">您是第
      <span class="rank">{{rank}}</span>位购买用户，活动结束后可返现
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
    line-height 38rpx
    border 1rpx #ff9996 solid
    background #fff7f8
    border-radius 4px
    font-size 14px
    box-sizing border-box
    padding 15rpx 5rpx
    .rank, .sale
      color $color-theme
</style>
