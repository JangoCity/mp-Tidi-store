<template>
  <section class="container">
    <scroll-view scroll-y scroll-top="scrollTop" style="height:100%">
      <!-- 一条 -->
      <section class="scroll-view-item">
        <section class="img-wrapper">
          <img src="./aasdasd.jpg" alt="" class="img">
        </section>
        <section class="text-wrapper border-bottom">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 果上市 大荔冬枣 5斤/箱 果上市 大荔冬枣 5斤/箱 枣香枣脆 等你抢购</p>
          <section class="inside">
            <section class="price">
              <span class="now-price money">78</span>
              <span class="old-price money">99</span>
            </section>
            <section class="favorite"></section>
          </section>
          <section class="btn-wrapper">
            <button class="btn">去购买</button>
            <span class="count-down">剩余15小时23分11秒</span>
          </section>
        </section>
      </section>
      <section class="scroll-view-item">
        <section class="img-wrapper">
          <img src="./aasdasd.jpg" alt="" class="img">
        </section>
        <section class="text-wrapper border-bottom">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 果上市 大荔冬枣 5斤/箱 果上市 大荔冬枣 5斤/箱 枣香枣脆 等你抢购</p>
          <section class="inside">
            <section class="price">
              <span class="now-price money">78</span>
              <span class="old-price money">99</span>
            </section>
            <section class="favorite"></section>
          </section>
          <section class="btn-wrapper">
            <button class="btn">去购买</button>
            <span class="count-down">剩余15小时23分11秒</span>
          </section>
        </section>
      </section>
      <section class="scroll-view-item">
        <section class="img-wrapper">
          <img src="./aasdasd.jpg" alt="" class="img">
        </section>
        <section class="text-wrapper border-bottom">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 果上市 大荔冬枣 5斤/箱 果上市 大荔冬枣 5斤/箱 枣香枣脆 等你抢购</p>
          <section class="inside">
            <section class="price">
              <span class="now-price money">78</span>
              <span class="old-price money">99</span>
            </section>
            <section class="favorite"></section>
          </section>
          <section class="btn-wrapper">
            <button class="btn">去购买</button>
            <span class="count-down">剩余15小时23分11秒</span>
          </section>
        </section>
      </section>
    </scroll-view>
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
  .scroll-view-item
    font-size 0
    padding 0 30rpx
    margin-bottom 20rpx
    .img-wrapper, .text-wrapper
      display inline-block
    .img-wrapper
      width 205rpx
      height 205rpx
      margin-right 20rpx
      vertical-align top
      .img
        fix-image-size()
    .text-wrapper
      width 465rpx
      font-size 14px
      padding-bottom 40rpx
      .title
        mult_line_ellipsis()
      .inside
        height 38px
        line-height 38px
        display flex
        justify-content space-between
        .now-price
          font-size 18px
          color $color-theme
          margin-right 20rpx
          font-weight 600
        .old-price
          font-size 14px
          color #999
          text-decoration line-through
        .favorite
          extend-click()
          width 38px
          height 38px
          &::after
            prefix-icon(32rpx, 32rpx)
            bg-image('icon-favorite')
            left auto
            right 0
            transform translate(-50%,-50%)
    .btn-wrapper
      display flex
      justify-content space-between
      line-height 52rpx
      .btn
        margin 0
        font-size 14px
        height 52rpx
        line-height 52rpx
        color #fff
        background-color $color-theme
      .count-down
        font-size 12px
        color #666
</style>
