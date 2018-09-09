<template>
  <scroll-view class="swiper-tab"
               scroll-x
               style="width: 100%">
    <section :style="menuStyle"
             v-for="(item,index) in tabList"
             :key="item.id"
             class="swiper-tab-item"
             :data-current="index"
             @tap="swichNav">{{item.status}}</section>
    <section class="block"
             :style="style"></section>
  </scroll-view>
</template>
<script>
import wxp from 'minapp-api-promise'
import { obj2style } from '@/utils'

export default {
  name: 'slider-nav',
  data() {
    return {
      winWidth: null,
      winHeight: null,
      navWidth: null
    }
  },
  props: {
    tabList: Array,
    menuWidth: Number,
    currentTab: {
      type: Number,
      default: 0
    },
    font: {
      type: Number,
      default: 14
    }
  },
  methods: {
    swichNav(e) {
      const { current } = e.target.dataset
      if (this.currentTab === current) return
      this.$emit('update:currentTab', current)
    },
    swiperChange(e) {
      this.currentTab = e.target.current
    }
  },
  computed: {
    style() {
      // 计算左侧剩余多少宽度，所以滚动条起始位置要加
      if (this.winWidth) {
        let leftWidth = (this.winWidth - this.tabList.length * this.navWidth) / 2
        let width = this.navWidth + 'px'
//      let left = leftWidth + this.navWidth * this.currentTab + 'px'
        let left = this.navWidth * this.currentTab + 'px'
        let style = { left, width }
        return obj2style(style)
      }
    },
    menuStyle() {
      let style = {}
      style['width'] = this.navWidth + 'px'
      return obj2style(style)
    }
  },
  async onLoad() {
    // 获取系统消息
    let info = await wxp.getSystemInfo()
    try {
      this.winWidth = info.windowWidth
      this.winHeight = info.windowHeight
      this.navWidth = this.winWidth
        ? this.menuWidth
        : this.winWidth / this.tabList.length
    } catch (err) {
      console.log('获取系统信息报错')
    }
  }
}
</script>
<style lang="stylus" scoped>
.swiper-tab
  width 100%
  text-align center
  line-height 42px
  white-space nowrap
  position relative
  background-color #fff
  border-bottom 1px solid #e1e2e3
  .swiper-tab-item
    transition all 200
    height 42px
    display inline-block
    font-size 14px
    color #777
  .block
    display block
    position absolute
    left 0
    height 4rpx
    background red
    top 40px
    transition left 200
    z-index 99
</style>
