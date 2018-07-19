<template>
  <section class="container">
    <section class="bill-state">
      <p class="info">
        <span class="iconfont" :class="billState.icon"></span>
        <span class="text ">{{billState.text}}</span>
      </p>
      <strong class="total">{{billDetail.cash}}</strong>
    </section>

    <!-- 商品信息 -->
    <section class="goods-info list-text-between border-bottom" v-if="billDetail">
      <section class="item">
        <span class="label">商品信息</span>
        <p class="info">{{billDetail.product_name}}{{billDetail.desc}}</p>
      </section>
    </section>

    <!-- 账单信息 -->
    <section class="bill-info list-text-between" v-if="billDetail">
      <ul>
        <li class="item">
          <span class="label">支付方式</span>
          <span class="info">{{payWay}}</span>
        </li>
        <li class="item">
          <span class="label">交易时间</span>
          <span class="info">{{billDetail.pay_time}}</span>
        </li>
        <li class="item">
          <span class="label">交易单号</span>
          <span class="info">{{billDetail.code}}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import fly from '@/utils/fly'
import { share } from '@/common/js/mixins'
export default {
  minxins: [share],
  data() {
    return {
      billDetail: null
    }
  },
  computed: {
    // 支付方式
    payWay() {
      let way = ''
      switch (this.billDetail.type) {
        case 1:
          way = '余额支付'
          break
        case 2:
          way = '微信支付'
          break
        case 3:
          way = '组合支付'
          break
      }
      return way
    },
    billState() {
      let state = {}
      switch (this.billDetail.status) {
        case 1:
          state = {
            text: '已到账（收入）',
            icon: 'icon-duihao2'
          }
          break
        case 2:
          state = {
            text: '支付成功（支出）',
            icon: 'icon-chahao'
          }
          break
      }
      return state
    }
  },
  methods: {
    async _fetchBillDetail() {
      const params = { id: 1, uid: 1 }
      const data = await fly.get('billDetail', params)
      try {
        this.billDetail = data.list[0]
        console.log(this.billDetail)
      } catch (err) {
        console.log('账单详情报错', err)
      }
    }
  },
  mounted() {
    this._fetchBillDetail()
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
      .iconfont
        font-size 20px
        &.icon-duihao2
          color #0f0
        &.icon-chahao
          color #f00
    .total
      font-size 40px
  .goods-info, .bill-info
    padding 0 30rpx
  .goods-info
    padding-bottom 40rpx
    .info
      mult_line_ellipsis()
      width 500rpx
  .bill-info
    .item
      line-height 60rpx
</style>
