<template>
  <section class="container">
    <!-- 轮播图 -->
    <section class="swiper-wrapper">
      <swiper-group :list="imgUrls"></swiper-group>
    </section>

    <!-- 商品简介 -->
    <section class="summary-wrapper">
      <!-- 商品价格 -->
      <section class="price-info">
        <section class="price">
          <span class="now-price money">75</span>
          <span class="old-price money">98</span>
          <span class="addition">每人限购2件</span>
        </section>
        <section class="sold-info">
          已有34人购买
        </section>
      </section>

      <!-- 商品文案 -->
      <h2 class="title">【店铺配送】新鲜水果上市大荔冬枣 5斤/箱 枣香 枣脆 等你抢购 商品名称</h2>
      <p class="summary">享有“南荔枝，北冬枣，百果王”的盛名。状如苹果，有“小苹果”之称。果皮赭红光亮、皮薄肉脆、甘甜清香、营养丰富，可食率达95%。</p>

      <!-- 下单时间 -->
      <section class="order-time-info ">
        <section class="box border-right">
          <p class="header">下单时间</p>
          <p class="time">09:00:00-11:00:00</p>
        </section>
        <section class="box">
          <p class="header">配送时间</p>
          <p class="time">11:00:00-14:00:00</p>
        </section>
      </section>

      <!-- 活动 组件-->
      <section class="progress-wraper">
        <!-- <progress-bar></progress-bar> -->
        <!-- <flow> -->
          <!-- <flow-state state="1" :title="'123123'" is-done></flow-state>
          <flow-line is-done></flow-line>
          <flow-state state="2" is-done>
            <span slot="title">打发的说法</span>
          </flow-state>
          <flow-line :tip="'啊啊啊'"></flow-line>
          <flow-state state="3" :title="'asdad'"></flow-state>
          <flow-line></flow-line>
          <flow-state state="4" :title="'阿斯蒂芬'"></flow-state>
          -->
        <!-- </flow> -->
      </section>
    </section>

    <!-- 商品描述 -->
    <section class="goods-desc-wrapper">
      <h4 class="title">商品描述</h4>
      <p>
        生产许可证编号: SC10837061300653<br/> 厂名: 烟台市萨卡奇食品有限公司<br/> 厂址: 山东省烟台市莱山区盛泉工业园东兴路盛水庄村厂家<br/> 联系方式: 05352100990 放阴凉通风干燥的地方保质期: 150食品添加剂: -净含量: 450g包装方式: 包装糕点种类: 营养饼干品牌: 健元堂系列: 什锦粗粮饼产地: 中国大陆省份: 山东省
      </p>
    </section>

    <!-- 底部信息 -->
    <section class="bottom">
      <section class="func-list">
        <span class="item">首页</span>
        <span class="item">收藏</span>
        <span class="item">客服</span>
        <span class="item">分享</span>
      </section>
      <button class="line-gradient-btn btn">立即购买</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import progressBar from '@/components/progressBar'
import swiperGroup from '@/components/swiper'
// import { Flow, FlowState, FlowLine } from 'vux'
export default {
  components: {
    progressBar,
    swiperGroup
    // Flow,
    // FlowState,
    // FlowLine
  },
  data() {
    return {
      imgUrls: [
        {
          id: 1001,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529263999482&di=3ea3ffbc95250dda4423761791c61d22&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F590ac2cddbd03.jpg'
        },
        {
          id: 1002,
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=486464195,1053051847&fm=27&gp=0.jpg'
        },
        {
          id: 1003,
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529264019432&di=e0144c64b92702eaf6b0e175a2385d46&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-10%2F59dc5ca75d021.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  .summary-wrapper
    padding 30rpx
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
  .order-time-info
    display flex
    justify-content space-between
    flex-wrap nowrap
    text-align center
    border 1px solid #eee
    line-height 70rpx
    .box
      width 50%
    .header
      background #f6f6f6
      color #777
  .goods-desc-wrapper
    padding 30rpx
    .title
      font-size 16px
      margin-bottom 30rpx
  .bottom
    position fixed
    display flex
    z-index 99
    left 0
    bottom 0
    width 100%
    background #fff
    height 100rpx
    .func-list, .btn
      display inline-block
    .func-list
      width 430rpx
      display flex
      text-align center
      .item
        position relative
        padding 10rpx 0
        width 25%
        &::before
          content ''
          display block
          width 46rpx
          height 46rpx
          margin auto
          background-size contain
          background-position center
          background-repeat no-repeat
        &:nth-of-type(1)::before
          bg-image('icon-home')
        &:nth-of-type(2)::before
          bg-image('icon-favorite')
        &:nth-of-type(3)::before
          bg-image('icon-service')
        &:nth-of-type(4)::before
          bg-image('icon-share')
    .btn
      width 290rpx
      flex 0 0 290rpx
      border-radius 0
</style>
