<template>
  <section class="container">
    <swiper :autoplay="autoplay" :circular="circular" :indicatorDots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" style="height:100%">
      <section v-for="(item,index) in list" :key="item.id" class="wrapper">
        <swiper-item class="swiper-item">

          <section class="header">
            <h2 class="title">{{item.name}}</h2>
            <p class="price">
              <span class="now-price money">{{item.nowPrice}}</span>
              <span class="old-price money">{{item.oldPrice}}</span>
            </p>
          </section>

          <section class="content">
            <p class="tip">
              已有
              <span class="item-diff">{{item.sold}}</span>人购买, 还差
              <span class="item-diff">{{item.diff}}</span>人就可每人返利
              <span class="item-diff money">{{item.rebate}}</span>
            </p>

            <!-- 人数滚动组件 -->
            <section class="scroll-buyer-wrapper">
              <scroll-text :list='item.buyer'></scroll-text>
            </section>
          </section>
          <!-- 图片 -->
          <image :src="item.imgUrl" mode="scaleToFill" class="slide-image" style="width:100%" />
          <!-- 底部信息 -->
          <section class="bottom">
            <section class="count-time">
              本品将于
              <span class="time">15</span>:
              <span class="time">22</span>:
              <span class="time">33</span>后停止购买
            </section>
            <button class="line-gradient-btn btn">立即购买</button>
          </section>
        </swiper-item>
      </section>
    </swiper>
  </section>
</template>

<script type='text/ecmascript-6'>
import swiperGroup from '@/components/swiper'
import scrollText from '@/components/scrollText'
export default {
  components: {
    swiperGroup,
    scrollText
  },
  data() {
    return {
      list: [{
        id: 1001,
        name: '【店铺配送】新鲜水果上市大荔冬枣  5斤/ 箱 枣香枣脆 等你抢购【商品名1称】',
        oldPrice: '98',
        nowPrice: '75',
        sold: 34, // 已卖
        diff: 16, // 差值
        rebate: 10, // 返利
        spec: [],
        buyer: [{
          id: 101,
          name: '赵赵赵'
        }, {
          id: 101,
          name: '钱钱钱'
        }, {
          id: 101,
          name: '孙孙孙'
        }, {
          id: 101,
          name: '李李李'
        }, {
          id: 101,
          name: '李李李'
        }, {
          id: 101,
          name: '王王王'
        }, {
          id: 101,
          name: '欧阳欧阳'
        }],
        count: '16:24:22',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529263999482&di=3ea3ffbc95250dda4423761791c61d22&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F590ac2cddbd03.jpg'
      }]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  height 1146rpx
  padding 30rpx
  background #f7f7f7
  .wrapper
    height inherit
  .swiper-item
    height 100%
    box-sizing border-box
    padding 30rpx
    .header, .content
      position absolute
      width 630rpx
      z-index 99
    .header
      top 30rpx
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
      position absolute
      left 0
      top 0
      height 100%
      z-index 1
  .bottom
    position absolute
    display flex
    z-index 99
    left 0
    bottom 0
    width 100%
    background #fff
    height 100rpx
    line-height 100rpx
    .count-time, .btn
      display inline-block
    .count-time
      width 460rpx
      line-height 100rpx
      font-size 12px
      text-align center
      .time
        background #ddd
        display inline-block
        height 34rpx
        line-height 34rpx
        width 34rpx
        color #333
        margin-right 5rpx
        color #000
        border-radius 2px
    .btn
      width 290rpx
      flex 0 0 290rpx
      border-radius 0
</style>
