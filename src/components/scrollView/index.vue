<template>
  <section class="">
    <view class="section">
      <view class="section__title">纵向</view>
      <scroll-view scroll-y style="height: 200px;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" scroll-into-view="toView" scroll-top="scrollTop">
        <view id="green" class="scroll-view-item bc_green"></view>
        <view id="red" class="scroll-view-item bc_red"></view>
        <view id="yellow" class="scroll-view-item bc_yellow"></view>
        <view id="blue" class="scroll-view-item bc_blue"></view>
      </scroll-view>
      <view class="btn-area">
        <button size="mini" bindtap="tap">click me to scroll into view </button>
        <button size="mini" bindtap="tapMove">click me to scroll</button>
      </view>
    </view>
    <view class="section section_gap">
      <view class="section__title">横向</view>
      <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
        <view id="green" class="scroll-view-item_H bc_green"></view>
        <view id="red" class="scroll-view-item_H bc_red"></view>
        <view id="yellow" class="scroll-view-item_H bc_yellow"></view>
        <view id="blue" class="scroll-view-item_H bc_blue"></view>
      </scroll-view>
    </view>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      toView: 'red',
      scrollTop: 100,
      order: ['red', 'yellow', 'blue', 'green', 'red']
    }
  },
  methods: {
    upper: function (e) {
      console.log(e)
    },
    lower: function (e) {
      console.log(e)
    },
    scroll: function (e) {
      console.log(e)
    },
    tap: function (e) {
      for (var i = 0; i < this.order.length; ++i) {
        if (this.order[i] === this.data.toView) {
          this.setData({
            toView: this.order[i + 1]
          })
          break
        }
      }
    },
    tapMove: function (e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.bc_green
  background green
.bc_red
  background red
.bc_blue
  background blue
.bc_yellow
  background yellow
.scroll-view-item
  height 400rpx
.scroll-view_H
  white-space nowrap
.scroll-view-item_H
  width 200px
  height 100px
  display inline-block
</style>
