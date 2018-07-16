<template>
  <section class="container">

    <!-- 用户信息 -->
    <section class="user-info">
      <user-info></user-info>
    </section>

    <!-- 支付方式 -->
    <section class="pay-way">
      <h5 class="title">请选择支付方式</h5>
      <section data-id=0
               @click="handlePayWayClick"
               class="item balance border-bottom"
               :class="{ active: isBalance}">余额支付</section>
      <section data-id=1
               @click="handlePayWayClick"
               class="item wechat"
               :class="{active:isWechat}">微信支付</section>
    </section>

    <!-- 商品信息 -->
    <section class="order-wrapper">
      <section class="store-info">
        <p class="title">麒林便利店</p>
        <p class="address">深圳市宝安区西乡汇一城商铺</p>
      </section>

      <!-- 商品相关信息 -->
      <section class="goods-total">
        <section class="img-wrapper">
          <img src="./aasdasd.jpg"
               class="max-img">
        </section>
        <section class="text-wrapper">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 枣香枣脆 等你</p>
          <p class="price money">{{total}}</p>
        </section>
      </section>

      <!-- 购买数量 -->
      <section class="count-wrapper">
        <span class="label">购买数量</span>
        <span class="count">
          <counter @change="handleCountClick"></counter>
        </span>
      </section>
      <tip :rank='100'
           :sale="10"></tip>
    </section>

    <!-- 客户留言 -->
    <section class="comment-wrapper">
      <p class="title">订单留言</p>
      <section class="textarea-wrapper">
        <textarea class="textarea"
                  :placeholder="'请填写您需要备注的信息'"
                  placeholder-class="placehodle"
                  placeholder-style="color:#999; font-size:14px;"
                  auto-focus></textarea>
      </section>
    </section>

    <!-- 底部支付 -->
    <section class="bottom">
      <p class="text  border-top">
        应付款
        <span class="money">75.00</span>（店铺配送）
      </p>
      <button class="line-gradient-btn btn">
        立即支付
      </button>
    </section>

  </section>
</template>

<script type='text/ecmascript-6'>
import counter from '@/components/counter'
import userInfo from '@/components/userInfo'
import tip from '@/components/tip'
import store from '@/store'

export default {
  components: {
    userInfo,
    counter,
    tip
  },
  data() {
    return {
      payWay: null,
      total: 78
    }
  },
  methods: {
    handlePayWayClick(ev) {
      this.payWay = ev.currentTarget.dataset.id
      console.log(store.state.count)
    },
    handleCountClick(count) {
      console.log(this.total)
      const base = 78
      this.total = base * count
    }
  },
  computed: {
    isBalance() {
      return parseInt(this.payWay, 10) === 0
    },
    isWechat() {
      return parseInt(this.payWay, 10) === 1
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  padding 20rpx 30rpx 100rpx 30rpx
  background #f6f6f6
  .user-info, .pay-way, .order-wrapper, .comment-wrapper
    position relative
    padding 30rpx
    box-sizing border-box
    background #fff
    margin-bottom 20rpx
    border-radius 10rpx
  .user-info
    &::after
      position absolute
      content ''
      left 0
      bottom 0
      width 100%
      height 4px
      background linear-gradient(-60deg, #fc4331 25%, #f6f6f6 50%, #2e93ff 25%)
      background-size 30px 100%
  .pay-way
    padding-bottom 0
    font-size 14px
    .title
      height 40rpx
      line-height 40rpx
      font-size 14px
    .item
      position relative
      height 80rpx
      line-height 80rpx
      padding-left 40rpx
      &.balance
        border-bottom 1rpx solid #eee
      &::before
        prefix-icon(31rpx, 31rpx)
      &.balance::before
        bg-image('icon-balance')
      &.wechat::before
        bg-image('icon-wechat')
    .active
      &:after
        prefix-icon(22rpx, 19rpx)
        bg-image('icon-check')
        left auto
        right 0
  .order-wrapper
    .store-info
      position relative
      padding-left 40rpx
      margin-bottom 25rpx
      &::before
        prefix-icon(30rpx, 30rpx)
        bg-image('icon-goods')
        top 25rpx
      .title
        font-size 16px
      .address
        font-size 12px
    .goods-total
      margin-bottom 35rpx
      .img-wrapper
        display inline-block
        width 165rpx
        height 165rpx
        vertical-align top
        margin-right 20rpx
      .text-wrapper
        display inline-block
        width 445rpx
        height 165rpx
        .title
          mult_line_ellipsis()
          font-size 16px
          margin-bottom 35rpx
        .price
          color $color-theme
          font-size 20px
  .count-wrapper
    display flex
    justify-content space-between
    margin-bottom 40rpx
    .label
      font-size 18px
  .comment-wrapper
    .title
      font-size 16px
      margin-bottom 20rpx
    .textarea
      font-size 14px
      background #fbfafa
      border 1px solid #f0f0f0
      padding 20rpx
  .bottom
    position fixed
    display flex
    z-index 99
    left 0
    bottom 0
    width 100%
    background #fff
    height 100rpx
    line-height 100rpx
    .text, .btn
      display inline-block
    .text
      padding-left 30rpx
      font-size 14px
      line-height 100rpx
      width 430rpx
      .money
        color $color-theme
        font-size 18px
        font-weight 600
    .btn
      width 290rpx
      flex 0 0 290rpx
      border-radius 0
</style>
