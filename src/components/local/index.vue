<template>
  <section class="container">
    <section class="local-box" @click="handeleRestInfoClick">
      <span class="local">{{address}}</span>
    </section>
    <section class="weather-box">
      <span> {{weather.avgTemperature}} {{weather.type}}</span>
      <span>{{weather.aqi}}</span>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    address: String,
    weather: Object
  },
  data() {
    return {
    }
  },
  methods: {
    handeleRestInfoClick() {
      this.$emit('rest', '123123')
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
    padding 0 30rpx 0 40rpx
    color #000
    .local
      no-wrap()
      display inline-block
      max-width 420rpx
    &::before, &::after
      position absolute
      transform translateY(-50%)
      top 50%
      content ''
    &::before
      bg-image('local')
      left 0
      top 20rpx
      width 28rpx
      height 33rpx
      background-size contain
    &::after
      right 0
      height 0
      width 0
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 6px solid #999
  .weather-box
    display flex
    flex-direction column
    font-size 24rpx
    line-height 24rpx
    text-align right
</style>
