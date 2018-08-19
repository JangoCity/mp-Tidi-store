<template>
  <section class="container">
    <swiper style="height:100%"
            @change="onTouchChange"
            v-if="columnList&&columnList.length">
      <swiper-item class="swiper-item"
                   v-for="(item,index) in columnList"
                   @touchstart="onTouchStart"
                   @touchmove="handleTouchMove"
                   @touchend="onTouchEnd"
                   :data-index="index+1"
                   :key="item.id">
        <section class="product">
          <section class="wrapper"
                   @click.stop="handleToDetailClick(item.id)">
            <!-- 顶部信息 -->
            <section class="header">
              <h2 class="title">{{item.product_name}}</h2>
              <p class="price">
                <span class="now-price money">{{item.selling_price}}</span>
                <span class="old-price money">{{item.original_price}}</span>
              </p>
            </section>

            <section class="content">

              <!-- 展示更多返利优惠 -->
              <section class="rebate-wrapper"
                       v-if="item.rebage.length">
                <rebate :activity="item.rebage"></rebate>
              </section>

              <p class="tip">
                已有
                <span class="item-diff">{{item.number}}</span>人购买, 还差
                <span class="item-diff">{{item.will_number}}</span>人就可每人返利
                <span class="item-diff money">{{item.money}}</span>
              </p>

              <!-- 购买人数滚动组件 -->
              <section class="scroll-buyer-wrapper">
                <scroll-text :list='item.buy_log'></scroll-text>
              </section>
            </section>

            <!-- 图片 -->
            <section class="img-wrapper">
              <image :src="item.product_image"
                     mode="scaleToFill"
                     class="slide-image" />
            </section>

          </section>

          <!-- 底部信息 -->
          <section class="bottom">
            <section class="count-time">
              <count-down @endCallback="countDownEnd(item)"
                          :startTime="currentTime"
                          :endTime="item.end_buytime"></count-down>
            </section>

            <button class="btn-disabled btn-normal  btn"
                    v-if="item.isEmpty"
                    disabled>售罄</button>
            <button class="line-gradient-btn btn-normal  btn"
                    v-else
                    @click="handleToBuyClick(item.id)">立即购买</button>
          </section>
        </section>

      </swiper-item>
    </swiper>
    <section class="empty-wrapper"
             v-else>
      <empty></empty>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import swiperGroup from '@/components/swiper'
import scrollText from '@/components/scrollText'
import rebate from '@/components/rebate'
import countDown from '@/components/countDown'

import { showNormal } from '@/utils'
import fly from '@/utils/fly'

import Empty from '@/components/Empty'

const OFFSET_LEFT_ACTIVE = 90
const OFFSET_LEFT_NORMAL = 92

export default {
  components: {
    swiperGroup,
    scrollText,
    rebate,
    countDown,
    Empty
  },
  data() {
    return {
      columnId: null,
      columnList: null, // 栏目列表,
      nextPageUrl: '', // 下一页
      isLastPage: false, // 是否是最后一页
      endTime: '',
      noMore: false,
      currentTime: new Date().getTime(),
      startX: 0,
      endX: 0
    }
  },
  computed: {
    columnWidth() {
      const PADDING = 30
      const systemInfo = wx.getSystemInfoSync()
      return systemInfo.windowWidth / 2 - PADDING
    }
  },
  methods: {
    onTouchStart(ev) {
      this.startX = ev.mp.changedTouches[0].clientX
    },
    onTouchEnd(ev) {
      this.endX = ev.mp.changedTouches[0].clientX
      const isLeft = this.startX - this.endX > 0
      if (isLeft && ev.mp.currentTarget.dataset.index === this.columnList.length) {
        this.isLastPage = true
        if (this.noMore && !this.nextPageUrl) {
          showNormal('已经到底了')
          return
        }
        this._fetchColumnList(this.columnId, this.nextPageUrl)
      }
    },
    _reset() {
      this.startX = 0
      this.endX = 0
    },
    // 倒计时结束回调
    countDownEnd(item) {
      item.isEmpty = true
    },
    // 去商品详情
    handleToDetailClick(id) {
      const url = `../goods-detail/main?id=${id}`
      wx.navigateTo({ url })
    },
    // 购买
    handleToBuyClick(id) {
      const url = `../buy/main?id=${id}`
      wx.navigateTo({ url })
    },
    // 获取列表数据
    async _fetchColumnList(columnId, nextPageUrl) {
      const { uid } = wx.getStorageSync('userinfo')
      const params = { shop_id: 8, category: columnId, uid }
      const res = this.nextPageUrl
        ? await fly.get(this.nextPageUrl, params)
        : await fly.get('columnDetail', params)
      try {
        const data = res.data.product
        this.nextPageUrl = data.next_page_url // 下一页的请求
        this.noMore = this.nextPageUrl === null // 是否还有更多
        this.columnList = this.isLastPage ? this.columnList.concat(data.data) : data.data
        if (!this.columnList.length) return
        this._transRebate(this.columnList)
        const ACTIVE_LENGTH = this.columnList.length - this.columnList.filter(item => item.reached === 1).length - 1
        this.columnList.forEach(column => {
          column.rebage.forEach((item, index) => {
            item.zIndex = index
            item.active = item.reached ? 'active' : 'normal'
            item.offsetLeft = item.reached || index === ACTIVE_LENGTH
              ? OFFSET_LEFT_ACTIVE * index + 'rpx'
              : OFFSET_LEFT_NORMAL * index + 'rpx'
          })
        })
      } catch (err) {
        console.error('获取栏目列表报错', err)
      }
    },
    // 转换优惠
    _transRebate(list) {
      list.forEach(goods => {
        const { rebage, number, repertory } = goods

        goods.end_buytime = new Date(goods.end_buytime).getTime() // 转换停止时间
        goods.isEmpty = parseInt(repertory, 10) === 0 // 是否售罄
        rebage.forEach(item => {
          const people = parseInt(item.number, 10) // 已购买人数
          item.reached = number >= people
        })
      })
    }
  },
  mounted() {
    this.columnId = this.$root.$mp.query.id
    this.columnList = []
    this._fetchColumnList(this.columnId)
  },
  beforeMount() {
    const title = this.$root.$mp.query.title
    if (title && title.length > 0) {
      wx.setNavigationBarTitle({ title })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  height 1216rpx
  box-sizing border-box
  background #f7f7f7
  .swiper-item
    height 100%
    .product
      overflow hidden
      height inherit
      width 100%
    .wrapper
      padding 30rpx
      box-sizing border-box
      height inherit
      width 100%
      overflow hidden
      position relative
    .header, .content
      position absolute
      width 630rpx
      z-index 99
      padding 30rpx
    .header
      color #fff
      .title
        font-size 16px
        margin-bottom 20rpx
      .price
        .now-price
          font-size 36px
          margin-right 20rpx
          &::before
            font-size 18px
        .old-price
          font-size 12px
    .content
      bottom 130rpx
      .tip
        color $color-theme
        padding 5rpx 15rpx
        margin-bottom 20rpx
        font-size 12px
        border-radius 4px
        display inline-block
        background hsla(0, 0%, 100%, 0.25) border-box
        overflow hidden
        border-radius 0.3em
        text-shadow 0 1px 1px hsla(0, 0%, 100%, 0.3)
        &::before
          content ''
          position absolute
          top 0
          right 0
          bottom 0
          left 0
          margin -10rpx
          z-index -1
          -webkit-filter blur(30px)
          filter blur(30px)
        .item-diff
          font-size 18px
      .scroll-buyer-wrapper
        height 250rpx
        overflow hidden
    .slide-image
      position fixed
      width 92vw
      height 90vh
      left 30rpx
      right 0
      top 0
      bottom 30rpx
      z-index 1
  .rebate-wrapper
    margin-bottom 30rpx
  .bottom
    position absolute
    display flex
    z-index 99
    left 30rpx
    right 30rpx
    bottom 30rpx
    background #fff
    height 100rpx
    line-height 100rpx
    .count-time
      width 460rpx
      line-height 100rpx
      font-size 12px
      text-align center
    .btn
      width 290rpx
      height 100rpx
      line-height 100rpx
      flex 0 0 290rpx
</style>
