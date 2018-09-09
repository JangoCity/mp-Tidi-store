<template>
  <section class='container'>

   <!-- <section v-if="allNotReached">
      <section class="item active"
               :style={zIndex:firstObj.zIndex,left:firstObj.offsetLeft}>
        <section class="text">满{{firstObj.number}}人返{{firstObj.money}}元</section>
      </section>
      <section class="item normal"
               style="left:45px">
        <section class="text">更多优惠</section>
      </section>
    </section> -->
    <section>
      <section v-for="(item, index) in activity"
               :key="item.id"
               class="item"
               :class="item.active"
               :style={zIndex:item.zIndex,left:item.offsetLeft}>
        <section class="text"
              >满{{item.number}}人返{{item.money}}元</section>
        <section class="text"
              >更多优惠</section>
      </section>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    activity: Array
  },
  computed: {
    firstObj() {
      if (this.allNotReached) {
        return this.activity[0]
      }
    },
    allNotReached() {
      return this.activity.every(item => item.reached === false)
    }
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
  font-weight 900
  .item
    width 100rpx
    height 130rpx
    position absolute
    box-sizing border-box
    white-space normal
    padding 13rpx
    top 0
    border-radius 10rpx
    overflow hidden
    border-width 1px
    border-style solid
    font-weight 900
    font-size 24rpx
    color #e60012
    border 1rpx solid #e60012
    background #fff
    
    .text
      width 43px
      display block
      word-wrap break-word
      word-break normal
      height inherit
      font-size 30rpx
      line-height 36rpx
      font-weight bold
			label
				float left
      	margin-left 4rpx
    &.active
      background #fff
      border-color $theme-color
      color $theme-color
      font-weight 600
    &.normal
     background #fff
     border-color $theme-color
     color $theme-color
     font-weight 600
</style>
