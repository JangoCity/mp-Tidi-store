<template>
  <section class='container' ref="box" data-tag="box">
    <section v-for="(item, index) in list" :key="item.id" class="item">
      <span class="name" :style={color:item.color}>{{item.name}}</span>刚购买了该商品
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>

import { getArrRandomColor } from '@/utils'

export default {
  data() {
    return {
      animate: false,
      nameColor: getArrRandomColor(6)
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  computed: {
  },
  methods: {
    _scroll(e) {
      setTimeout(() => {
        this.list.push(this.list[0])
        this.list.shift()
        this.animate = false
      }, 500)
    },
    _randomCorlor() {
      this.list.forEach((item, index) => {
        const color = Math.floor(Math.random() * this.nameColor.length)
        item.color = this.nameColor[color]
      })
    }
  },
  mounted() {
    setInterval(this._scroll, 500)
    this._randomCorlor()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.container
  background transparent
  .item
    height 50rpx
    line-height 50rpx
    color #fff
    .name
      display inline-block
      padding-right 15rpx
      font-weight 600
</style>
