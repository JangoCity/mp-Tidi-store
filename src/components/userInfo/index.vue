<template>
  <section class="container">
    <section class="user-name">{{contact.name}}
      <span class="phone-num">{{hidePhone}}</span>
    </section>
    <p class="address">
      <span class="type company"
            v-if="addressType">{{addressType}}</span>
      {{shoppingAddress}}</p>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    contact: Object,
    hasType: {
      type: Boolean,
      default: true
    },
    addressType: ''
  },
  computed: {
    // 收货地址
    shoppingAddress() {
      if (!this.contact.province || !this.contact.city || !this.contact.area || !this.contact.district) return
      const { province, city, area, district, address } = this.contact
      return province + city + area + district + address
    },
    // 电话隐藏中间字段
    hidePhone() {
      const phone = this.contact.phone
      if (!phone) return ''
      const num = phone + ''
      return phone.length ? num.substr(0, 3) + '****' + num.substr(7) : ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  display flex
  flex-direction column
  justify-content space-between
  .user-name
    font-weight 600
    font-size 16px
    margin-bottom 10rpx
  .address
    font-size 14px
    .type
      display inline-block
      border-radius 30rpx
      color #fff
      padding 5rpx 20rpx
      &.company
        background #4d87ff
</style>
