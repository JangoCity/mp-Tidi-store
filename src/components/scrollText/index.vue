<template>
  <section class='container' ref="box" data-tag="box">
    <section class="list1">
      <section v-for="(item, index) in list" :key="item.id" class="item">
        <span>{{item.name}}</span>刚购买了该商品
      </section>
    </section>
    <section class="list2"></section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    _scroll(e) {
      console.log(this.list)
    }
  },
  mounted() {
    this._scroll()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.container
  .item
    height 50rpx
    line-height 50rpx
    text-indent 20rpx
</style>
