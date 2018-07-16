<template>
  <section class="container">
    <!-- 头部信息 -->
    <section class="header">
      <section class="state">
        <span class="text">待付款</span>
      </section>
      <section class="user-info">
        <user-info :hasType="false"
                   :phone="3665656565"></user-info>
      </section>
      <!-- 插入组件 user-info-->
    </section>

    <!-- 订单SDK -->
    <section class="content">
      <section class="order-desc">
        <section class="img-wrapper">
          <img src="./aasdasd.jpg"
               mode="aspectFit"
               class="max-img">
        </section>
        <section class="text-wrapper">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 枣香枣脆 等你抢购</p>
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
          <span class="server">联系客服</span>
        </p>
        <p class="item">
          <span class="call">拨打电话</span>
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
      <button class="btn  cancel"
              @click="handleCancelClick">取消订单</button>
      <button class="btn pay "
              @click="handlePayClick">去支付</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import userInfo from '@/components/userInfo'
export default {
  components: {
    userInfo
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
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
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
      padding-left 45rpx
      &::before
        bg-image('icon-clock')
        prefix-icon(36rpx, 36rpx)
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
    margin-bottom 20rpx
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
        padding-left 45rpx
        &::before
          prefix-icon(32rpx, 32rpx)
      .server::before
        bg-image('icon-server')
      .call::before
        bg-image('icon-phone')
  .order-info
    padding 20rpx 0 50rpx
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
    .btn
      display inline-block
      height 60rpx
      line-height 60rpx
      border-radius 30rpx
      border 1px solid #dcdcdc
      font-size 14px
      box-shadow none
      margin-left 20rpx
      &.cancel
        background #fff
      &.pay
        color #fff
        background linear-gradient(to bottom, #e61b00, #ff5408)
        border none
</style>
