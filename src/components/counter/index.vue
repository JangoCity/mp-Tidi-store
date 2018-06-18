<template>
  <div class="container">
    <span class="sub btn" @click="decrement"></span>
    <span class="count">{{ count }}</span>
    <span class="add btn" @click="increment"></span>
  </div>
</template>

<script type='text/ecmascript-6'>
import store from '@/store'

export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  computed: {
    count() {
      return store.state.count
    }
  },
  methods: {
    increment() {
      store.commit('increment')
      if (!this.count) return
      this.$emit('change', this.count)
    },
    decrement() {
      store.commit('decrement')
      if (!this.count) return
      this.$emit('change', this.count)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  text-align center
  display flex
  .count
    background #f6f6f6
    height 50rpx
    width 100rpx
    font-size 16px
  .btn
    position relative
    width 50rpx
    height 50rpx
    line-height 50rpx
    extend-click()
    &::before
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      background-size contain
      background-repeat no-repeat
      content ''
      width 24rpx
  .add::before
    height 24rpx
    bg-image('icon-add')
  .sub::before
    height 4rpx
    bg-image('icon-sub')
</style>
