<template>
  <div class="container">
    <h5 class="title">请选择支付方式</h5>
    <section data-type="1"
             @click="handlepaymentClick"
             class="item iconfont icon-yuezhifu balance"
             :class="{active:isBalance}"
             v-if="!groupShow">
      余额支付
    </section>
    <section data-type="3"
             @click="handlepaymentClick"
             class="item iconfont icon-yuezhifu balance"
             :class="{active:isGroup}"
             v-if="groupShow">
      组合支付
    </section>
    <section data-type="2"
             @click="handlepaymentClick"
             class="item iconfont icon-weixinzhifu wechat"
             :class="{active:isWechat}">
      微信支付
    </section>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    groupShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isBalance() {
      return this.payment === 1
    },
    isWechat() {
      return this.payment === 2
    },
    isGroup() {
      return this.payment === 3
    },
    ...mapGetters(['payment'])
  },
  methods: {
    // 切换付费方式
    handlepaymentClick(ev) {
      const mode = parseInt(ev.mp.currentTarget.dataset.type, 10)
      this.setPayment(mode)
    },
    ...mapMutations({
      setPayment: 'SET_PAYMENT'
    })
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .title
    height 40rpx
    line-height 40rpx
    font-size 14px
  .item
    position relative
    line-height 80rpx
    padding-left 30px
    &::before
      posY()
      font-size 24px
    &.balance
      border-bottom 0.5rpx #eee solid
    &.balance::before
      color #f39800
    &.wechat::before
      color #15ac21
    &.active
      &:after
        content '\e646'
        position absolute
        right 0
        color red
</style>
