<template>
  <section class="container">
    <section class="bill-state">
      <p class="info">
        <span class="text success">交易成功</span>
      </p>
      <strong class="total">129.00</strong>
    </section>

    <!-- 商品信息 -->
    <section class="goods-info list-text-between border-bottom">
      <section class="item">
        <span class="label">商品信息</span>
        <p class="info">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 枣香枣脆 等你抢购</p>
      </section>
    </section>

    <!-- 账单信息 -->
    <section class="bill-info list-text-between">
      <ul>
        <li class="item">
          <span class="label">支付方式</span>
          <span class="info">余额支付</span>
        </li>
        <li class="item">
          <span class="label">交易时间</span>
          <span class="info">2017-10-29 20:10</span>
        </li>
        <li class="item">
          <span class="label">交易单号</span>
          <span class="info">17124200654700</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
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
  font-size 16px
  .bill-state
    text-align center
    height 300rpx
    padding 50rpx 0
    box-sizing border-box
    line-height 50px
    .info
      .text
        position relative
        display inline-block
        padding-left 50rpx
        color #999
        font-size 14px
        &::before
          prefix-icon(40rpx, 40rpx)
        &.success::before
          bg-image('icon-success')
    .total
      font-size 40px
  .goods-info,.bill-info
    padding 0 30rpx
  .goods-info
    padding-bottom 40rpx
    .info
      width 500rpx
  .bill-info
    .item
      line-height 60rpx

</style>
