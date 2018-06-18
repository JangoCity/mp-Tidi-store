<template>
  <section class="container">
    <section class="slide-nav-wrapper">
      <slide-nav :menuWidth="75" :currentTab.sync="currentTab" :tabList="tabList"></slide-nav>
    </section>
    <swiper :current="currentTab" :style="'height:'+contentHeight" class="swiper-box" duration="300" @change="swiperChange">
      <swiper-item v-for="(item,index) in tabList" :key="index">
        <order-list v-if="index==currentTab" :currentTab="item"></order-list>
      </swiper-item>
    </swiper>
  </section>
</template>

<script type='text/ecmascript-6'>
import wxp from 'minapp-api-promise'
import slideNav from '@/components/slideNav'
import orderList from '@/components/orderList'
import { tabList } from '@/common/js/staticData'
export default {
  components: {
    slideNav,
    orderList
  },
  data() {
    return {
      winWidth: 0, // 设备宽度
      winHeight: 0, // 设备高度
      currentTab: 0, // tab切换
      tabList
    }
  },
  methods: {
    swiperChange(e) {
      let { current } = e.target
      this.currentTab = current
    }
  },
  computed: {
    contentHeight() {
      return this.winHeight - 62 + 'px'
    }
  },
  async onLoad() {
    // 获取系统消息
    let info = await wxp.getSystemInfo()
    this.winWidth = info.windowWidth
    this.winHeight = info.windowHeight
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background-color #f6f6f6
.slide-nav-wrapper
  margin-bottom 30rpx
</style>
