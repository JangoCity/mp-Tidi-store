<template>
  <section class="container">
    <!-- 节点 -->
    <section class="node-wrapper">
      <section class="node" v-for="(item, index) in activity.list" :key="item.id">
        <span class="dott"></span>
        <span class="text">满{{item.number}}人返{{item.money}}</span>
      </section>
    </section>

    <!-- 进度条 -->
    <section class="progress-wrapper">
      <progress :percent="percent" active="true" stroke-width="4" activeColor="#e60012" backgroundColor="#ccc">
      </progress>
    </section>

  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    activity: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  computed: {
    percent() {
      return (this.activity.current / this.activity.final) * 100
    }
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
      text-align center
    .dott
      flex 1
      display block
      margin auto
      background #e60012
      border-radius 50%
      margin-bottom 20rpx
      border 5rpx #fff solid
      width 30rpx
      height 30rpx
    .text
      color #e60012
</style>
