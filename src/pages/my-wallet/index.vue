<template>
  <section class="container">
    <section class="balance-warapper">
      <section class="balance-bar">
        <p class="label">可用余额</p>
        <p class="balance-text">{{balance}}.00</p>
      </section>
      <section class="balance-bg-wrapper">
        <img :src="balanceBg"
             class="balance-bg">
      </section>
    </section>

    <!-- 消费总计 -->
    <section class="total-info border-bottom">
      <p class="date">{{currentMonth}}</p>
      <p class="total">总计:
        <span class="money">{{total}}.00</span>
        <picker class="picker-date iconfont icon-rili"
                mode="date"
                :value="date"
                start="2015-09-01"
                end="2017-09-01"
                @change="handleDateChange">
          <span class="placehodle">时间控件</span>
        </picker>
      </p>
    </section>

    <!-- 消费情况 -->
    <section class="consume-list"
             v-if="walletList.length">
      <scroll-view scroll-y
                   scroll-top="scrollTop"
                   style="height:775rpx">
        <!-- 一条记录 -->
        <section class="scroll-view-item"
                 v-for="(item, index) in walletList"
                 :key="item.id">
          <section class="wrapper border-bottom iconfont icon-jiantouyou">
            <section class="goods-info">
              <span class="title"
                    :class=item.style>{{item.product_name}}</span>
              <span class="date">{{item.pay_time}}</span>
            </section>
            <section class="state-info">
              <span class="price">{{item.cash}}</span>
              <span class="state">{{item.state}}</span>
            </section>
          </section>
        </section>

      </scroll-view>
    </section>

    <!-- 列表为空 -->
    <section class="empty-wrapper"
             v-else>
      <empty></empty>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import fly from '@/utils/fly'
import { padTime } from '@/utils'
import { share } from '@/common/js/mixins'
import { balanceBg } from './images'

import Empty from '@/components/Empty'
export default {
  mixins: [share],
  components: {
    Empty
  },
  data() {
    return {
      walletList: [],
      balance: 0, // 余额
      balanceBg, // 背景图片
      total: 0, // 总额
      currentMonth: '', // 当前月份
      date: '' // 当前日期
    }
  },
  computed: {
    // // 获取今天的月份
    // 获取今天的日期
    currentDay() {
      let day = new Date()
      day.setTime(day.getTime())
      return day.getFullYear() + '年' + padTime((day.getMonth() + 1)) + '月' + padTime(day.getDate()) + '日'
    }
  },
  methods: {
    // 触发日历
    handleDateChange(ev) {
      let date = ev.mp.detail.value
      date = date.split('-')
      date = date[0] + '年' + date[1] + '月' + date[2] + '日'
      this._fetchWalletList(date)
    },
    _currentMonth() {
      let day = new Date()
      day.setTime(day.getTime())
      return day.getFullYear() + '-' + padTime((day.getMonth() + 1))
    },
    // 获取消费列表
    async _fetchWalletList(date) {
      date = date || this.currentDay
      this.currentMonth = date.substring(0, 8)
      const params = { uid: 1, time: date }
      const res = await fly.get('walletList', params)
      try {
        const data = res.data
        this.balance = data.balance
        this.walletList = data.list

        const states = ['待支付', '支付成功', '已退款']
        const stateStyles = ['nopaid', 'succses', 'back']
        const price = []
        this.walletList.forEach((item, index) => {
          item.state = states[item.pay_status]
          item.style = stateStyles[item.pay_status]
          price.push(parseInt(item.cash, 10))
        })
        this.total = price.reduce((prev, next) => prev + next)
      } catch (err) {
        console.log('获取钱包信息报错===', res)
      }
    }
  },
  mounted() {
    this._fetchWalletList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .balance-warapper
    position relative
    padding 30rpx
    .balance-bar
      position relative
      z-index 5
      height 236rpx
      box-sizing border-box
      color #fff
      padding 50rpx 0 0 40rpx
      background-size contain
      background-repeat no-repeat
      .label
        font-size 14px
        margin-bottom 20rpx
      .balance-text
        font-size 28px
    .balance-bg-wrapper
      position absolute
      top 0
      left 30rpx
      right 30rpx
      height 236rpx
      z-index 1
    .balance-bg
      width 100%
      height 100%
  .total-info
    position relative
    padding 0 30rpx 30rpx
    line-height 1.8
    .picker-date
      position absolute
      top 0
      right 30rpx
      font-size 24px
      .placehodle
        position absolute
        top 0
        text-indent -9999px
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
        &::before
          posY(0, false)
          color #ccc
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
            // left -30rpx
          &.nopaid::before
            background-color $color-theme
          &.success
            background red
            &::before
              background-color $color-theme
          &.back::before
            background-color #ff9013
        .price
          color $color-theme
</style>
