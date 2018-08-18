<template>
  <section class="container">
    <!-- 节点 -->
    <section class="node-wrapper">
      <section class="node"
               v-for="(item, index) in activity.list"
               :style="{left:(item.number/activity.final)*100+'%'}"
               :key="item.id">
        <span class="dott"></span>
        <span class="text">满{{item.number}}人<br>返{{item.money}}元</span>
      </section>
    </section>

    <!-- 进度条 -->
    <section class="progress-wrapper"
             v-if="activity">
      <progress :percent="(activity.current / activity.final) * 100"
                active="true"
                stroke-width="4"
                activeColor="#e60012"
                backgroundColor="#ccc">
      </progress>
    </section>

  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    activity: {
      type: Object,
      default: {
        list: {
          number: 0,
          money: 0
        },
        current: 0,
        final: 1
      }
    }
  },
  methods: {
    left(number, final) {
      return `left:${number}/${final}%`
    }
  },
  computed: {
    percent() {
      return (this.activity.current / this.activity.final).toFixed(2) * 100
    }
  },
  mounted() {
    // console.log('this.activity.current', this.activity.current)
    // console.log('this.activity.final', this.activity.final)
    // console.log('this.activity', this.activity)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  height 100rpx
  background #fff
  .progress-wrapper
    position absolute
    z-index 10
    width 100%
    top 15rpx
  .node-wrapper
    position absolute
    z-index 19
    top 0
    left 0
    right 0
    width 100%
    display flex
    flex-flow row nowrap
    justify-content space-around
    align-content space-around
    .node
      position absolute
      text-align center
      width 100px
    .dott
      display block
      background #e60012
      margin-left -15rpx
      border-radius 50%
      border 5rpx #fff solid
      width 30rpx
      height 30rpx
    .text
      color #e60012
      position absolute
      left -38px
</style>
