<template>
  <section class="container">
    <section class="balance-warapper">
      <section class="balance-bar">
        <p class="label">可用余额</p>
        <p class="balance-text">200,300.00</p>
      </section>
    </section>

    <!-- 消费总计 -->
    <section class="total-info border-bottom">
      <p class="date">2018-05</p>
      <p class="total">总计:
        <span class="money">1311.00</span>
      </p>
    </section>

    <!-- 消费情况 -->
    <section class="consume-list">
      <scroll-view scroll-y scroll-top="scrollTop" style="height:775rpx">
        <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title back">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>
           <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title success">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>
           <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title back">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>
           <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title success">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>
           <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title back">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>
        <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title success">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>
        <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title back">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>

        <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title success">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>

        <!-- 一条记录 -->
        <section class="scroll-view-item">
          <section class="border-bottom wrapper">
            <section class="goods-info">
              <span class="title back">幸福的紫菜包饭下午茶</span>
              <span class="date">2018-05-08</span>
            </section>
            <section class="state-info">
              <span class="price">128</span>
              <span class="state">支付成功</span>
            </section>
          </section>
        </section>
      </scroll-view>
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
  .balance-warapper
    padding 30rpx
    .balance-bar
      background red
      height 236rpx
      box-sizing border-box
      color #fff
      padding 50rpx 0 0 40rpx
      .label
        font-size 14px
        margin-bottom 20rpx
      .balance-text
        font-size 28px
  .total-info
    position relative
    padding 0 30rpx 30rpx
    line-height 1.8
    &::after
      prefix-icon(35rpx, 35rpx)
      bg-image('icon-calendar')
      left auto
      right 30rpx
    .date
      font-size $font-size-medium-x
      color #333
  .total
    font-size $font-size-medium
    color #999
  .consume-list
    .scroll-view-item
      padding 0 30rpx
      .wrapper
        display flex
        justify-content space-between
        padding 30rpx 50rpx 30rpx 30rpx
        line-height 1.8
        &::after
          prefix-icon(11rpx, 18rpx)
          bg-image('icon-arrow-r')
          left auto
          right 0
        span
          display block
        .state-info
          text-align right
        .title, .price
          font-size $font-size-medium-x
        .date, .state
          font-size $font-size-medium
        .title
          position relative
          &::before
            prefix-icon(20rpx, 20rpx)
            border-radius 50%
            left -30rpx
          &.success::before
            background-color $color-theme
          &.back::before
            background-color #ff9013
        .price
          color $color-theme
</style>
