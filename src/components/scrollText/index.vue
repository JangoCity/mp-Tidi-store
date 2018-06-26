<template>
  <section class='container' ref="box" data-tag="box">
    <section class="list1">
      <section v-for="(item, index) in list" :key="item.id" class="item">
        <span class="name">{{item.name}}</span>刚购买了该商品
      </section>
    </section>
    <section class="list2"></section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      animate: false
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  created() {
    setInterval(this._scroll, 500)
  },
  methods: {
    _scroll(e) {
      setTimeout(() => {
        this.list.push(this.list[0])
        this.list.shift()
        this.animate = false
      }, 500)
    }
  },
  mounted() {
    // this._scroll()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.container
  background transparent
  .item
    height 50rpx
    line-height 50rpx
    .name
      display inline-block
      padding-right:15rpx
</style>
