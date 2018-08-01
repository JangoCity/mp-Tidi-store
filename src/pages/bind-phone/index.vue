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

        <button class="btn-disabled"
                disabled
                v-if="qrDisbled"
                @click="handleCountDownClick">{{countdown}}秒后发送</button>
        <button class="btn-verify"
                v-else
                @click="handleCountDownClick">{{qrText}}</button>
      </section>
    </section>

    <section class="btn-wrapper">
      <button class="btn-confirm"
              hover-class="btn-confirm-hover"
              @click="handleConfirmClick">确定</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import { showNormal, showSuccess } from '@/utils'
import fly from '@/utils/fly'
import { ERR_OK } from '@/utils/config'

const MAX_COUNT = 60
const REG = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

export default {
  data() {
    return {
      countdown: MAX_COUNT,
      qrCode: '',
      qrDisbled: false, // 禁止验证码
      qrText: '发送验证码',
      phone: '',
      timer: null
    }
  },
  methods: {
    // 确定绑定
    async handleConfirmClick() {
      let userinfo = wx.getStorageSync('userinfo')
      const params = {
        tel: this.phone,
        code: this.qrCode,
        uid: 1
      }
      const res = await fly.post('postPhoneAuth', params)
      console.log('res', res)
      res.code === ERR_OK && showSuccess(res.message)
      userinfo.phone = this.phone
      wx.setStorageSync('userinfo', userinfo)
      wx.navigateBack()
    },
    // 发送验证码
    async handleCountDownClick() {
      if (!REG.test(this.phone)) {
        showNormal('请填写正确的手机号')
        return
      }
      const params = { mobile: this.phone, uid: 1 }
      const res = await fly.get('sendbindSms', params)
      res.code === ERR_OK && (res.message) && this._setQrTime()
    },
    // 倒计时
    _setQrTime() {
      if (this.countdown === 1) {
        this.qrDisbled = false
        this.countdown = MAX_COUNT
        return
      } else {
        this.qrDisbled = true
        this.countdown--
      }
      setTimeout(() => { this._setQrTime(this) }
        , 1000)
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
    .btn-disabled, .btn-verify
      background #ffeaec
      height 60rpx
      line-height 60rpx
      font-size 14px
      color $color-theme
    .btn-disabled
      background #e7e7e7
      color #666
  .btn-wrapper
    padding 0 30rpx
</style>
