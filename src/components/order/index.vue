<template>
  <section class="container">
    <section v-if="list.length">
      <section class="order"
               v-for="(item, index) in list"
               :key="item.id">
        <section class="header">
          <span class="code iconfont icon-dingdan1">{{item.list}}</span>
          <span class="state">{{item.state}}</span>
        </section>
        <section class="content">
          <section class="img-wrapper">
            <img :src="item.image"
                 mode="aspectFit"
                 style="max-width:100%"
                 alt="item.product_name">
          </section>
          <section class="text-wrapper">
            <p class="title">{{item.product_name}}</p>
            <p class="spec">
              <!--<span class="total">规格:单</span>-->
              <span class="count">x{{item.number}}</span>
            </p>
            <p class="discounts"
               v-if="item.orderBy">已有{{item.orderBy}}人购买，可返现￥{{item.rebage}}</p>
          </section>
        </section>
        <section class="footer">
          <p class="total-wrapper">实付:
            <span class="total">{{item.price}}</span>
            <span>（免运费）</span>
          </p>
        </section>
        <section class="bottom">
          <button class="btn"
                  v-if="item.status===1"
                  @click="handleCancleClick(item.id)">取消订单</button>
          <button class="btn to-pay"
                  v-if="item.status===1"
                  @click="handlePayNowClick(item.id)">去支付</button>
          <button class="btn to-pay"
                  v-if="item.status===5"
                  @click="handleConfirmClick(item.id)">确认收货</button>
          <button class="btn"
                  @click="handleViewDetailClick(item.id)">查看订单</button>
        </section>
      </section>
    </section>
    <!-- 列表为空 -->
    <section class="empty-wrapper"
             v-else>
      <empty></empty>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import Empty from '@/components/Empty'
import { pay, cancel } from '@/common/js/mixins'

export default {
  components: {
    Empty,
    pay,
    cancel
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    status: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollTop: 100
    }
  },
  methods: {
    // 取消订单
    handleCancleClick(id) {
      this.$emit('cancle', id)
    },
    // 确认订单
    handleConfirmClick(id) {
      this.$emit('confirm', id)
    },
    // 支付订单
    handlePayNowClick(id) {
      this.$emit('pay', id)
    },
    // 查看订单
    handleViewDetailClick(id) {
      this.$emit('view', id)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background-color #f6f6f6
  height 100%
  .order
    background #fff
    margin-bottom 20rpx
    font-size 28rpx
    color #333
    margin-top 30rpx
  .header, .content, .footer, .bottom
    padding 0 30rpx
  .header
    height 86rpx
    line-height 86rpx
    display flex
    justify-content space-between
    .code
      &::before
        margin-right 10rpx
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
        mult_line_ellipsis()
        font-weight 600
        margin-bottom 20rpx
      .spec
        display flex
        justify-content space-between
        margin-bottom 20rpx
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
      border 1px solid #dcdcdc
      background #fff
      margin-left 10rpx
      &::after
        display none
      &.to-pay
        color $color-theme
        border-color $color-theme
</style>
