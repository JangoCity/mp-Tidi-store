<template>
  <section class="container">
    <section class="order">
      <section class="header">
        <span class="code">2017062697569897</span>
        <span class="state">待付款</span>
      </section>
      <section class="content">
        <section class="img-wrapper">
          <img src="./aasdasd.jpg" mode="aspectFit" style="max-width:100%" alt="">
        </section>
        <section class="text-wrapper">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 枣香枣脆 等你</p>
          <p class="spec">
            <span class="total">规格:单</span>
            <span class="count">x1</span>
          </p>
          <p class="discounts">已有30人购买，可返现￥10</p>
        </section>
      </section>
      <section class="footer">
        <p class="total-wrapper">实付:
          <span class="total">78.00</span>
          <span>（免运费）</span>
        </p>
      </section>
      <section class="bottom">
        <button class="btn">取消订单</button>
        <button class="btn to-pay">去支付</button>
        <button class="btn">查看订单</button>
      </section>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  // props: {
  //   list: Object
  // },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .order
    background #fff
    margin-bottom 20rpx
    font-size 28rpx
    color #333
  .header, .content, .footer, .bottom
    padding 0 30rpx
  .header
    height 86rpx
    line-height 86rpx
    display flex
    justify-content space-between
    .code
      position relative
      padding-left 35rpx
      &::before
        bg-image('icon-order')
        prefix-icon(30rpx, 30rpx)
    .state
      color $color-theme
  .content
    background-color #fbfafa
    padding-top 20rpx
    padding-bottom 20rpx
    font-size 0
    .img-wrapper
      display inline-block
      vertical-align top
      width 148rpx
      height 148rpx
      margin-right 20rpx
      border-radius 8rpx
      img
        max-width 100%
        max-height 100%
    .text-wrapper
      display inline-block
      width 510rpx
      font-size 28rpx
      .title
        font-weight 600
      .spec
        display flex
        justify-content space-between
        color #999
      .discounts
        color $color-theme
  .footer
    height 80rpx
    line-height 80rpx
    text-align right
    border-bottom 1rpx solid #dcdcdc
    .total-wrapper
      display inline-block
      .total
        font-weight 600
  .bottom
    height 60rpx
    line-height 60rpx
    padding 20rpx 30rpx
    text-align right
    .btn
      display inline-block
      height 60rpx
      line-height 60rpx
      font-size 14px
      border-radius 30px
      border 1rpx solid #dcdcdc
      background-color #fff
      margin-left 10rpx
      &.to-pay
        color $color-theme
        border-color $color-theme
</style>
