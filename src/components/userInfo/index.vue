<template>
  <section class="container">
    <section class="user-name">阿米
      <span class="phone-num">{{hidePhone}}</span>
    </section>
    <p class="address">
      <span class="type company" v-if="hasType">{{addressType}}</span>
      湖北武汉市洪山区城区 珞喻路876号华工科技产业大 厦9层</p>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    hasType: {
      type: Boolean,
      default: true
    },
    addressType: {
      type: String,
      default: '公司'
    },
    phone: {
      type: [String, Number],
      default: 13425187777
    }
  },
  data() {
    return {
    }
  },
  computed: {
    hidePhone() {
      const num = this.phone + ''
      return num.substr(0, 3) + '****' + num.substr(7)
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
      padding 0 20rpx
      &.company
         background #4d87ff
</style>
