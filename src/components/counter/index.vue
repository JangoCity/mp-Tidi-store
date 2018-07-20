<template>
  <div class="container">
    <span class=" btn decrement iconfont icon-subtract"
          @click="decrement"></span>
    <span class="count">{{ count }}</span>
    <span class=" btn increment iconfont icon--jiahao"
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
  .count
    background #f6f6f6
    height 50rpx
    line-height 50rpx
    width 100rpx
    font-size 16px
    border-radius 10rpx
  .btn
    position relative
    width 50rpx
    height 50rpx
    line-height 50rpx
    color #333
</style>
