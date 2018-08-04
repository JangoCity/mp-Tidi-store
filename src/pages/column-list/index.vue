<template>
  <section class="container">
    <swiper :autoplay="autoplay"
            :circular="circular"
            :indicatorDots="indicatorDots"
            :indicator-color="indicatorColor"
            :indicator-active-color="indicatorActiveColor"
            style="height:100%"
            v-if="columnList.length">
      <swiper-item class="swiper-item"
                   v-for="(item,index) in columnList"
                   :key="item.id">
        <section class="wrapper">

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
            <section class="rebate-wrapper">
              <rebate :activity="item.rebage"></rebate>
            </section>

            <p class="tip">
              已有
              <span class="item-diff">{{item.number}}</span>人购买, 还差
              <span class="item-diff">{{item.will_number}}</span>人就可每人返利
              <span class="item-diff money">{{item.money}}</span>
            </p>

            <!-- 购买人数滚动组件 -->
            <section class="scroll-buyer-wrapper"
                     v-if="item.buy_log.length>3">
              <scroll-text :list='item.buy_log'></scroll-text>
            </section>
          </section>
          <!-- 图片 -->
          <image :src="item.product_image"
                 mode="scaleToFill"
                 class="slide-image"
                 style="width:100%" />
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
  </section>
</template>

<script type='text/ecmascript-6'>
import swiperGroup from '@/components/swiper'
import scrollText from '@/components/scrollText'
import rebate from '@/components/rebate'
import countDown from '@/components/countDown'

import fly from '@/utils/fly'
export default {
  components: {
    swiperGroup,
    scrollText,
    rebate,
    countDown
  },
  data() {
    return {
      columnList: [], // 栏目列表,
      endTime: ''
    }
  },
  computed: {
    currentTime() {
      return new Date().getTime()
    }
  },
  methods: {
    countDownEnd(item) {
      item.isEmpty = true
    },
    // 购买
    handleToBuyClick(id) {
      const url = `../buy/main?id=${id}`
      wx.navigateTo({ url })
    },
    // 获取列表数据
    async _fetchColumnList() {
      const params = { shop_id: 8, category: 1, uid: 1 }
      const res = await fly.get('columnDetail', params)
      try {
        const data = res.data.product
        console.log('栏目列表', data.data)
        this.columnList = data.data
        this._transRebate(this.columnList)
      } catch (err) {
        console.error('获取栏目列表报错', err)
      }
    },
    // 转换优惠
    _transRebate(list) {
      list.forEach(goods => {
        const { rebage, number, repertory } = goods
        const willNumber = goods.will_number
        goods.end_buytime = new Date(goods.end_buytime).getTime()
        goods.isEmpty = parseInt(repertory, 10) === 0
        rebage.forEach(item => {
          const people = parseInt(item.number, 10)
          const money = parseInt(item.money, 10)
          item.reached = people === money || people === (number + willNumber)
        })
      })
    }
  },
  mounted() {
    this._fetchColumnList()
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
    .wrapper
      padding 30rpx
      box-sizing border-box
      height inherit
      width 100%
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
      // position absolute
      left 0
      top 0
      height 100%
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
