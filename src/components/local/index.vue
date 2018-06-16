<template>
  <section class="container">
    <section class="local-box">华中科技大厦</section>
    <section class="weather-box">多云</section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
.container
  display flex
  flex-wrap nowrap
  justify-content space-between
  font-size 36rpx
  .local-box
    position relative
    padding 0 40rpx
    color #000
    &::before, &::after
      position absolute
      transform translateY(-50%)
      top 50%
      content ''
    &::before
      left 0
      width 28rpx
      height 33rpx
      background-size contain
      bg-image('local')
    &::after
      position absolute
      right 0
      height 0
      width 0
      border-left 6px solid transparent
      border-right 6px solid transparent
      border-top 8px solid #999
</style>
