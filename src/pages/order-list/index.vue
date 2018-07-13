<template>
  <section class="container">
    <section class="slide-nav-wrapper" v-if="tabList.length">
      <slide-nav :menuWidth="menuWidth" :currentTab.sync="currentTab" :tabList="tabList"></slide-nav>
    </section>
    <swiper :current="currentTab" :style="contentHeight" class="swiper-box" duration="300" @change="swiperChange">
      <swiper-item v-for="(item,index) in tabList" :key="item.id">
        <order-list v-if="index===currentTab" :currentTab="item"></order-list>
      </swiper-item>
    </swiper>
  </section>
</template>

<script type='text/ecmascript-6'>
import wxp from 'minapp-api-promise'
import fly from '@/utils/fly'

import { share } from '@/common/js/mixins'
import slideNav from '@/components/slideNav'
import orderList from '@/components/orderList'
export default {
  mixins: [share],
  components: {
    slideNav,
    orderList
  },
  data() {
    return {
      winWidth: 0, // 设备宽度
      winHeight: 0, // 设备高度
      currentTab: 0, // tab切换
      tabList: [],
      orderList: []
    }
  },
  methods: {
    // 切换swiper
    swiperChange(e) {
      let { current } = e.target
      this.currentTab = current
    },
    // 获取系统消息
    async _initSize() {
      let info = await wxp.getSystemInfo()
      this.winWidth = info.windowWidth
      this.winHeight = info.windowHeight
    },
    async _getOrderList() {
      const params = { uid: 2 }
      const res = await fly.get('orderList', params)
      const data = res.data.data
      console.log('data===========', data)
      this.tabList = data.status
    }
  },
  computed: {
    menuWidth() {
      let width = 0
      switch (this.tabList.length) {
        case 5:
          width = 75
          break
        case 6:
          width = 60
          break
      }
      return width
    },
    // 内容高度
    contentHeight() {
      return `height:${this.winHeight - 49}px`
    }
  },
  mounted() {
    this._getOrderList()
    this._initSize()
  },
  onHide() {
    this.currentTab = 0
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
