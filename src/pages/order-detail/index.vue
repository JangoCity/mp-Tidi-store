<template>
  <section class="container">
    <!-- 头部信息 -->
    <section class="header">
      <section class="state">
        <span class="text iconfont icon-shijian">{{payment}}</span>
      </section>
      <section class="user-info"
               v-if="contact">
        <user-info :hasType="false"
                   :contact="contact"></user-info>
      </section>
    </section>

    <!-- 订单SDK -->
    <section class="content"
             v-if="product">
      <section class="order-desc">
        <section class="img-wrapper">
          <img :src="product.image"
               mode="aspectFit"
               class="max-img">
        </section>
        <section class="text-wrapper">
          <p class="title">{{product.product_name}}</p>
          <p class="discounts">已有{{product.number}}人购买，可返现￥{{rebage}}</p>
          <p class="spec">
            <!--<span class="total">规格:单</span>-->
            <span class="count">x{{order.number}}</span>
          </p>
        </section>
      </section>
      <section class="total-desc border-bottom">
        实付：
        <span class="money">{{order.price}}</span>
        <span>（免运费）</span>
      </section>
      <section class="contact-desc">
        <p class="item">
          <span class="server iconfont icon-kefu"
                @click="handleServerClick">联系客服</span>
        </p>
        <p class="item">
          <span class="call iconfont icon-tel"
                @click="handleCallClick">拨打电话</span>
        </p>
      </section>
    </section>

    <!-- 订单信息 -->
    <section class="order-info"
             v-if="order!==null">
      <div></div>
      <ul class="list">
        <li class="item">
          <span class="label">订单编号:</span>
          <span class="info">{{order.list}}</span>
        </li>
        <li class="item">
          <span class="label">支付方式:</span>
          <span class="info">{{payaction}}</span>
        </li>
        <li class="item" v-if="order.pay_time">
          <span class="label">支付时间:</span>
          <span class="info"
                v-if="order.pay_time">{{order.pay_time}}</span>
        </li>
        <li class="item">
          <span class="label">下单时间:</span>
          <span class="info">{{order.created_at}}</span>
        </li>
        <li class="item"
            v-if="payment==='待兑换'">
          <span class="label">兑换码:</span>
          <span class="info">{{order.code}}</span>
        </li>
      </ul>
    </section>

    <!-- 底部按钮 -->
    <section class="bottom">
      <button class="btn btn-normal cancel"
              v-if="payment==='待支付'"
              @click="handleCancelOrderClick(order.id)">取消订单</button>
      <button class="btn btn-normal pay "
              v-if="payment==='待支付'"
              @click="handlePayNowClick(order.id)">去支付</button>
      <button class="btn btn-normal pay "
              v-if="payment==='待收货'"
              @click="handleConfirmClick(order.id)">确认收货</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import userInfo from '@/components/userInfo'
import fly from '@/utils/fly'
import { share, cancel, call, pay } from '@/common/js/mixins'

export default {
  mixins: [share, cancel, call, pay],
  components: {
    userInfo
  },
  data() {
    return {
      product: null, // 商品信息
      order: null, // 订单信息
      contact: null, // 联系方式信息
      rebage: null, // 返利
      shop_phone: null // 电话
    }
  },
  computed: {
    // 转换支付方式
    payment() {
      if (this.order) {
        let str = ''
        switch (this.order.status) {
          case 1:
            str = '待支付'
            break
          case 2:
            str = '待确认'
            break
          case 3:
            str = '待发货'
            break
          case 4:
            str = '待兑换'
            break
          case 5:
            str = '待收货'
            break
          case 6:
            str = '已完成'
            break
        }
        return str
      }
    },
    payaction() {
      if (this.order) {
        let skr = ''
        switch (this.order.pay_method) {
          case 1:
            skr = '余额支付'
            break
          case 2:
            skr = '微信支付'
            break
          case 3:
            skr = '组合支付'
            break
        }
        return skr
      }
    }
  },
  methods: {
    // 跳转支付
    handlePayClick() {
      wx.navigateTo({
        url: '../buy/main'
      })
    },
    // 获取订单接口信息
    async _fetchOrderDetail(id, payStatus) {

      try {
          const { uid } = wx.getStorageSync('userinfo')
          this.uid = uid
          const params = { uid, id, pay_status: payStatus }
          const res = await fly.get('orderDetail', params)
        const { product, contact, order, rebage, phone } = res.data
        this.product = product
        this.order = order
        this.rebage = rebage
        this.shop_phone = phone
        // 默认地址信息
        const { name, district, address } = contact
        const province = contact.province_id
        const city = contact.city_id
        const area = contact.area_id
        this.phone = contact.phone
        this.contact = { name, phone: this.phone, province, city, area, district, address }
        console.log('this.contact======', this.contact)
      } catch (err) {
        console.log('账单详情报错======', err)
      }
    }
  },
  mounted() {
    this._fetchOrderDetail(this.$root.$mp.query.id, this.$root.$mp.query.pay_status)
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
