<template>
  <div class="container">
    <span class="count-btn decrement iconfont icon-subtract"
          :class="{disabled:count===1}"
          @click="decrement"></span>
    <span class="count">{{ count }}</span>
    <span class="count-btn increment iconfont icon--jiahao"
          @click="increment"></span>
  </div>
</template>

<script type='text/ecmascript-6'>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['count'])
  },
  methods: {
    ...mapMutations({
      'increment': 'INCREMENT',
      'decrement': 'DECREMENT'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  text-align center
  display flex
  width 120px
  .count
    background #f6f6f6
    height 50rpx
    line-height 50rpx
    width 50rpx
    margin 0 5px
    flex 1
    font-size 16px
    border-radius 4rpx
  .count-btn
    position relative
    flex 0 0 35px
    width 35rpx
    height 50rpx
    line-height 50rpx
    color #333
    text-align center
    &.disabled
      color #ddd
</style>
