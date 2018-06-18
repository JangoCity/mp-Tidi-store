<template>
  <section class="">
    <view class="section section_gap">
      <scroll-view class="scroll-view_H" scroll-x style="width: 100%">

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
