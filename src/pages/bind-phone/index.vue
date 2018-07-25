<template>
  <section class="container">
    <section class="form-group">
      <!-- 绑定手机号 -->
      <section class="row border-bottom">
        <span class="label">手机号</span>
        <p class="input-wrapper">
          <input placeholder="请输入手机号"
                 maxlength="11"
                 type="number"
                 class="input"
                 v-model="phone">
        </p>
      </section>

      <!-- 发送验证码 -->
      <section class="row border-bottom">
        <span class="label">验证码</span>
        <p class="input-wrapper">
          <input placeholder="请输入验证码"
                 maxlength="6"
                 type="number"
                 class="input"
                 v-model="qrCode">
        </p>
        <button class="btn-verify"
                @click="handleCountDownClick">{{qrText}}</button>
      </section>
    </section>

    <section class="btn-wrapper">
      <button class="btn-confirm"
              hover-class="btn-confirm-hover">确定</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import { showSuccess, showNormal } from '@/utils'
import fly from '@/utils/fly'

const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

export default {
  components: {
  },
  data() {
    return {
      count: 60,
      qrCode: '',
      qrDisbled: false, // 禁止验证码
      qrText: '发送验证码',
      phone: '13425187659'
    }
  },
  computed: {
  },
  methods: {
    // 确定绑定
    handleConfirmClick() {

    },
    // 发送验证码
    async handleCountDownClick() {
      if (!reg.test(this.phone)) {
        showNormal('请填写正确的手机号')
        return
      }
      const params = { mobile: '18627175798', uid: 1 }
      const data = await fly.get('sendbindSms', params)

      console.log('data', data)
      showSuccess('绑定手机成功')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background #f6f6f6
  height 100%
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
