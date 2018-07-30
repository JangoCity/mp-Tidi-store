<template>
  <section class='container'>
    <section v-for="(item, index) in activity"
             :key="item.id"
             class="item"
             :class="item.active"
             :style={zIndex:item.zIndex,left:item.offsetLeft}>
      <span class="text"
            v-if="item.reached">满{{item.number}}人返{{item.money}}元</span>
      <span class="text"
            v-else>更多优惠</span>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    activity: Array
  },
  methods: {
    _countStyle() {
      if (!this.activity.length) return
      const OFFSET_LEFT_ACTIVE = 90
      const OFFSET_LEFT_NORMAL = 75
      const ACTIVE_LENGTH = this.activity.length - this.activity.filter(item => item.reached === 1).length - 1

      // 区分返利的样式
      this.activity.forEach((item, index) => {
        item.zIndex = index
        item.active = item.reached ? 'active' : 'normal'
        item.offsetLeft = item.reached || index === ACTIVE_LENGTH
          ? OFFSET_LEFT_ACTIVE * index + 'rpx'
          : OFFSET_LEFT_NORMAL * index + 'rpx'
      })
    }
  },
  mounted() {
  },
  created() {
    this._countStyle()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
$theme-color = #fa0000
.container
  position relative
  width 100%
  height 130rpx
  background transparent
  .item
    width 100rpx
    height 130rpx
    position absolute
    box-sizing border-box
    padding 10rpx
    top 0
    border-radius 10rpx
    overflow hidden
    border-width 1px
    border-style solid
    box-shadow -1px 0 2rpx rgba(36, 36, 36, 0.35)
    &.active
      background #fff
      border-color $theme-color
      color $theme-color
      font-weight 600
    &.normal
      padding 25rpx 10rpx
      background $theme-color
      color #fff
      border-color #fff
</style>
