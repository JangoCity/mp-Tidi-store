<template>
  <section class="container">
    <section class="slide-nav-wrapper"
             v-if="tabList.length">
      <slide-nav :menuWidth="menuWidth"
                 :currentTab.sync="currentTab"
                 :tabList="tabList"></slide-nav>
    </section>

    <!-- 订单区域 -->
    <swiper :current="currentTab"
            :style="contentHeight"
            class="swiper-box"
            duration="200"
            @change="swiperChange"
            v-if="orderList.length">
      <swiper-item v-for="(list,index) in orderList"
                   :key="index">
        <scroll-view scroll-y
                     scroll-top="scrollTop"
                     :style="contentHeight"
                     @scrolltoupper="up">
          <order v-if="index===currentTab"
                 :currentTab="index"
                 :list="list"
                 :status="tabList"
                 @cancle="handleCancelOrderClick"
                 @pay="handlePayNowClick"
                 @confirm="handleConfirmClick"
                 @view="handleViewDetailClick"></order>
        </scroll-view>
      </swiper-item>
    </swiper>
  </section>
</template>

<script type='text/ecmascript-6'>
import wxp from 'minapp-api-promise'
import fly from '@/utils/fly'
import { share, cancel, pay } from '@/common/js/mixins'
import slideNav from '@/components/slideNav'
import order from '@/components/order'
export default {
  mixins: [share, cancel, pay],
  components: { slideNav, order },
  data() {
    return {
      winWidth: 0, // 设备宽度
      winHeight: 0, // 设备高度
      currentTab: 0, // tab切换
      scrollTop: 100,
      tabList: [],
      orderList: [],
      testList: []
    }
  },
  methods: {
    // 切换swiper
    swiperChange(e) {
      let { current } = e.target
      this.currentTab = current
    },
    // 查看订单
    handleViewDetailClick(id) {
      // this.$emit('view', id)
      let url = `../order-detail/main?id=${id}`
      wx.navigateTo({ url })
    },
    // 获取系统消息
    async _initSize() {
      let info = await wxp.getSystemInfo()
      this.winWidth = info.windowWidth
      this.winHeight = info.windowHeight
    },
    // 获取订单列表
    async _fetchOrderList() {

      try {

          const { uid } = wx.getStorageSync('userinfo')
          this.uid = uid
          const params = { uid }
          wx.showNavigationBarLoading()
          const res = await fly.get('orderList', params)
        const data = res.data
        this.tabList = data.status
        this.orderList = data.list.data
        this._parseOrderList(this.orderList)
        console.log(this.orderList)
        // 注销下拉刷新事件
        wx.stopPullDownRefresh()
        // 注销刷新icon状态
        wx.hideNavigationBarLoading()
      } catch (err) {
        console.log('error=========', err)
      }
    },
    // 将所有订单分入不同的
    _parseOrderList(list) {
      let arr = this.tabList.map(item => [])
      list.forEach(item => {
        // 属性新增一个映射的文本描述状态
        item.state = this.tabList[item.status - 1].status
        arr[item.status - 1].push(item)
      })
      this.orderList = arr
      console.log('订单列表分配后========', this.orderList)
    }
  },
  computed: {
    // 每个菜单的宽度
    menuWidth() {
      let width = 0
      switch (this.tabList.length) {
        case 5:
          width = 65
          break
        case 6:
          width = 63
          break
      }
      return width
    },
    // 内容高度
    contentHeight() {
      return `height:${this.winHeight * 2 - 85}rpx`
    }
  },
  mounted() {
    this._initSize()
  },
  onPullDownRefresh() {
    this._fetchOrderList()
  },
  onHide() {
    this.currentTab = 0
  },
  onShow() {
    this._fetchOrderList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background-color #fff
.swiper-box
  background-color #f6f6f6
::-webkit-scrollbar
  width 0
  height 0
  color transparent
  
</style>
