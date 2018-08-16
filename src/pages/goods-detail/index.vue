<template>
  <section class="container">
    <!-- 轮播图 -->
    <section class="swiper-wrapper"
             v-if="imgUrls.length">
      <swiper-group :list="imgUrls"></swiper-group>
    </section>

    <!-- 商品简介 -->
    <section class="summary-wrapper"
             v-if="goods">
      <!-- 商品价格 -->
      <section class="price-info">
        <section class="price">
          <span class="now-price money">{{goods.selling_price}}</span>
          <span class="old-price money">{{goods.original_price}}</span>
          <span class="addition">每人限购{{goods.curb_sales}}件</span>
        </section>
        <section class="sold-info">
          已有{{goods.number}}人购买
        </section>
      </section>

      <!-- 商品标题 -->
      <section class="title"
               v-html="goods.product_name"></section>

      <!-- 商品副标题 -->
      <!-- <section class="summary"></section> -->

      <!-- 下单时间 -->
      <section class="delivery-wrapper">
        <delivery-time :orderTime="orderTime"
                       :distributionTime="distributionTime"></delivery-time>
      </section>

      <!-- 活动 组件-->
      <section class="progress-wraper"
               v-if="activity.list.length">
        <progress-bar :activity="activity"></progress-bar>
      </section>
    </section>

    <!-- 商品描述 -->
    <section class="goods-desc-wrapper"
             v-if="goods">
      <h4 class="title">商品描述</h4>
      <section v-html="goods.desc"
               class="goods-desc">
      </section>
    </section>

    <!-- 底部信息 -->
    <section class="bottom-wrapper">
      <bottom-bar :isLike="isLike"
                  @addFavorite="handleAddFavoriteClick(goodsId)"
                  @server="handleServerClick"
                  @buy="handleToBuyClick(goodsId)"></bottom-bar>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import progressBar from '@/components/progressBar'
import swiperGroup from '@/components/swiper'
import deliveryTime from '@/components/deliveryTime'
import bottomBar from '@/components/bottomBar'

import fly from '@/utils/fly'
import { showSuccess } from '@/utils'
import { share, cancel, call, pay } from '@/common/js/mixins'
export default {
  mixins: [share, cancel, call, pay],
  components: {
    progressBar,
    swiperGroup,
    deliveryTime,
    bottomBar
  },
  data() {
    return {
      goodsId: null, // 商品ID
      goods: null, // 商品信息
      imgUrls: [], // 轮播图
      isLike: false, // 收藏
      buyNum: null, // 购买人数
      orderTime: '', // 下单时间
      distributionTime: '', // 配送时间
      phoneNumber: null, // 客服电话
      activity: {} // 活动
    }
  },
  methods: {
    // 点击购买
    handleToBuyClick(goodsId) {
      const url = `../buy/main?id=${goodsId}`
      wx.navigateTo({ url })
    },
    // 点击收藏
    async handleAddFavoriteClick(id) {
      const { uid } = wx.getStorageSync('userinfo')
      const params = { uid, id }
      const res = await fly.get('favoriteGet', params)
      try {
        this.isLike = !this.isLike
        showSuccess(res.message)
      } catch (err) {
        console.log('点击收藏报错', err)
      }
    },
    // 裁剪时间
    _clipTime(time) {
      return time // .substr(11)
    },
    // 获取详情信息
    async _fetchDetailInfo(id) {
      const { uid } = wx.getStorageSync('userinfo')
      const params = { uid, id }
      const res = await fly.get('productDetail', params)
      try {
        const data = res.data
        this.imgUrls = data.product_image
        this.goods = data.product
        this.isLike = data.is_like
        this.phoneNumber = data.phone
        this.buyNum = data.buy_num
        this.goodsId = this.goods.id

        // const { start_buytime, end_buytime, start_ordertime, end_ordertime } = this.goods
        const s1 = this.goods.start_buytime
        const e1 = this.goods.end_buytimes
        const s2 = this.goods.start_ordertime
        const e2 = this.goods.end_ordertime
        this.orderTime = `${this._clipTime(s1)}-${this._clipTime(e1)}`
        this.distributionTime = `${this._clipTime(s2)}-${this._clipTime(e2)}`

        const activity = data.rebage

        const final = activity[activity.length - 1].number
        this.activity.list = activity
        this.activity.current = this.goods.number
        this.activity.final = final
        console.log('this.activity', this.activity)
      } catch (err) {
        console.log('商品详情报错======', err)
      }
    }
  },
  watch: {
    activity(n, o) {
      console.log('nnn', n)
    }
  },
  onLoad() {
    console.log('this.$root.$mp.query.id=======', this.$root.$mp.query.id)
    this._fetchDetailInfo(this.$root.$mp.query.id)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  background #fbfafa
  padding-bottom 100rpx
  .summary-wrapper
    padding 30rpx
    margin-bottom 30rpx
    background #fff
    .price-info
      display flex
      justify-content space-between
      height 50rpx
      line-height 50rpx
      margin-bottom 30rpx
      .price
        font-size 0
        .now-price, .old-price, .addition
          display inline-block
          margin-right 20rpx
        .now-price
          font-size 24px
          color $color-theme
          vertical-align top
        .old-price
          font-size 12px
          color #999
          text-decoration line-through
        .addition
          font-size 12px
          background #fff0f1
          color $color-theme
          height 30rpx
          line-height 30rpx
          padding 2rpx 10rpx
      .sold-info
        font-size 14px
        color #999
    .title
      font-size 16px
      margin-bottom 30rpx
    .summary
      font-size 14px
      color #999
      margin-bottom 30rpx
  .delivery-wrapper
    margin-bottom 30rpx
  .goods-desc-wrapper
    background #fff
    padding 30rpx
    .title
      font-size 16px
      margin-bottom 30rpx
    .goods-desc
      white-space nowrap
  .progress-wraper
    margin-bottom 30rpx
  .bottom-wrapper
    position fixed
    z-index 99
    left 0
    bottom 0
    width 100%
    background #fff
    height 100rpx
</style>
