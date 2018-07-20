<template>
  <section class="container">
    <!-- 头部信息 -->
    <section class="header">
      <section class="state">
        <span class="text iconfont icon-shijian">待付款</span>
      </section>
      <section class="user-info" >
        <user-info :hasType="false"
                   :name="contact.name"
                   :phone="contact.phone"
                   :shoppingAddress="shoppingAddress"
                   v-if="contact"></user-info>
      </section>
    </section>

    <!-- 订单SDK -->
    <section class="content" >
      <section class="order-desc" v-if="product">
        <section class="img-wrapper">
          <img :src="product.image"
               mode="aspectFit"
               class="max-img">
        </section>
        <section class="text-wrapper">
          <p class="title">{{product.product_name}}</p>
          <p class="discounts">已有30人购买，可返现￥10</p>
          <p class="spec">
            <span class="total">规格:单</span>
            <span class="count">x1</span>
          </p>
        </section>
      </section>
      <section class="total-desc border-bottom">
        实付：
        <span class="money">104.00</span>
        <span>（免运费）</span>
      </section>
      <section class="contact-desc">
        <p class="item">
          <span class="server iconfont icon-kefu">联系客服</span>
        </p>
        <p class="item">
          <span class="call iconfont icon-tel">拨打电话</span>
        </p>
      </section>
    </section>

    <!-- 订单信息 -->
    <section class="order-info">
      <ul class="list">
        <li class="item">
          <span class="label">订单编号:</span>
          <span class="info">245935245324535</span>
        </li>
        <li class="item">
          <span class="label">支付方式:</span>
          <span class="info">待支付</span>
        </li>
        <li class="item">
          <span class="label">支付时间:</span>
          <span class="info">2018-04-20 11:25:34</span>
        </li>
        <li class="item">
          <span class="label">下单时间:</span>
          <span class="info">2018-04-20 11:23:34</span>
        </li>
      </ul>
    </section>

    <!-- 底部按钮 -->
    <section class="bottom">
      <button class="btn btn-normal cancel"
              @click="handleCancelClick">取消订单</button>
      <button class="btn btn-normal pay "
              @click="handlePayClick">去支付</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import userInfo from '@/components/userInfo'
import fly from '@/utils/fly'
import { share } from '@/common/js/mixins'

export default {
  minxins: [share],
  components: {
    userInfo
  },
  data() {
    return {
      product: null,
      order: null,
      contact: null
    }
  },
  computed: {
    shoppingAddress() {
      if (!this.contact) return ''
      const { province, city, area, district, address } = this.contact
      return province.name + city.name + area.name + district + address
    }
  },
  methods: {
    // 取消支付
    handleCancelClick() {
      console.log('取消支付')
    },

    // 跳转支付
    handlePayClick() {
      wx.navigateTo({
        url: '../buy/main'
      })
    },

    async _fetchOrderDetail() {
      const params = { uid: 1, id: 1 }
      const data = await fly.get('orderDetail', params)
      try {
        console.log('账单详情======', data)
        this.product = data.product
        this.contact = data.contact
        this.order = data.order
      } catch (err) {
        console.log('账单详情报错======', data)
      }
    }
  },
  mounted() {
    console.log('query参数=======', this.$root.$mp.query)
    this._fetchOrderDetail()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background #fbfafa
  .header
    position relative
    background red
    padding 40rpx 30rpx
    height 200rpx
    box-sizing border-box
    margin-bottom 140rpx
    .state
      position relative
      font-size 18px
      color #fff
      &::before
        margin-right 10rpx
    .user-info
      position absolute
      top 120rpx
      width 690rpx
      height 200rpx
      padding 35rpx 40rpx
      box-sizing border-box
      background #ffffff
      border-radius 10px
      box-shadow 0 4px 8px rgba(0, 0, 0, 0.08)
  .content
    .order-desc
      padding 30rpx
      background-color #fbfafa
      font-size 0
    .img-wrapper, .text-wrapper
      display inline-block
    .img-wrapper
      vertical-align top
      width 146rpx
      height 146rpx
      margin-right 20rpx
    .text-wrapper
      width 524rpx
      font-size 14px
      .title
        mult_line_ellipsis()
        height 76rpx
      .discounts, .spec
        line-height 50rpx
      .discounts
        color $color-theme
    .total-desc
      padding-right 30rpx
      text-align right
      background #fff
      font-size 14px
      line-height 90rpx
    .contact-desc
      display flex
      background #fff
      justify-content space-between
      line-height 90rpx
      text-align center
      font-size 14px
      .item
        position relative
        width 50%
        box-sizing border-box
        &:nth-of-type(1)::after
          position absolute
          top 50%
          right 0
          transform translateY(-50%)
          content ''
          width 1px
          height 10px
          background #eee
      .server, .call
        position relative
        &::before
          font-size 18px
          margin-right 10px
      .server::before
        color #ffc435
      .call::before
        color #e60012
  .order-info
    margin 20rpx 0
    width 100%
    height auto
    background #f6f6f6
    .list
      font-size 14px
      background #fff
      padding 0 30rpx
      color #333
      line-height 40px
      .label
        margin-right 20rpx
      .info
        color #666
  .bottom
    background #fff
    height 100rpx
    padding 20rpx 30rpx
    text-align right
    box-sizing border-box
    .btn
      height 60rpx
      line-height 60rpx
      border-radius 30rpx
      font-size 14px
      padding 0 30rpx
      box-shadow none
      margin-left 20rpx
      &.cancel
        background #F8F8F8
        border 1px solod #ccc !important
      &.pay
        color #fff
        background linear-gradient(to bottom, #e61b00, #ff5408)
        border none
</style>
