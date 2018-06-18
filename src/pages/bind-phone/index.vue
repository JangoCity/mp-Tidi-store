<template>
  <section class="container">
    <section class="form-group">
      <section v-for="(item, index) in list" :key="item.id" class="row border-bottom" >
        <span class="label">{{item.label}}</span>
        <p class="input-wrapper">
          <input
          :placeholder="item.placehodleText"
          :maxlength = "item.maxlength"
          type="number"
          class="input">
        </p>
        <button v-if="item.verify" class="btn-verify" @click="handleCountDownClick">发送验证码</button>
      </section>

    </section>

    <section class="btn-wrapper">
      <button class="btn-confirm">确定</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {
  },
  data() {
    return {
      list: [{
        id: 1001,
        label: '手机号',
        placehodleText: '请输入手机号',
        maxlength: 11
      }, {
        id: 1002,
        label: '验证码',
        verify: true,
        placehodleText: '请输入验证码',
        maxlength: 6
      }],
      count: 60
    }
  },
  computed: {
  },
  methods: {
    handleConfirmClick() { // 确定

    },
    handleCountDownClick() {
      console.log('发送验证码')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background #f6f6f6
  height 1136rpx
  .form-group
    padding 0 30rpx
    margin-bottom 40rpx
    background #fff
  .row
    position relative
    display flex
    flex-direction row
    flex-wrap nowrap
    padding 20rpx 0
    vertical-align top
    .label
      width 100rpx
      height 60rpx
      line-height 60rpx
    .input-wrapper, .input
      flex 1
      height 60rpx
      line-height 60rpx
    .btn-verify
      background #ffeaec
      height 60rpx
      line-height 60rpx
      font-size 14px
      color $color-theme
  .btn-wrapper
    padding 0 30rpx
</style>
