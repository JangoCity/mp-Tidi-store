<template>
  <section class="container">
    <!-- 地址类型 -->
    <radio-group class="radio-group border-bottom"
                 @change="handleChangeTypeClick">
      <label class="radio"
             v-for="(item, index) in createAddressType"
             :key="item.id">
        <radio :value="item.id"
               :checked="item.checked"
               color="#e60012" />{{item.value}}
      </label>
    </radio-group>

    <section class="form-group">

      <!-- 表单列表 -->
      <section v-for="(item, key, index) in createAddressForm"
               :key="item.id"
               class="row  border-bottom">
        <span class="label">{{item.label}}</span>
        <p class="input-wrapper">
          <input :placeholder="item.placehodleText"
                 :maxlength="item.maxlength"
                 v-model="item.value"
                 type="number"
                 class="input">
        </p>
        <button v-if="item.verify"
                class="btn-verify"
                @click="handleCountDownClick">发送验证码</button>
      </section>

    </section>

    <section class="btn-wrapper">
      <button class="btn-confirm"
              hover-class="btn-confirm-hover"
              @click="handleConfirmClick">保存</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import { createAddressType, createAddressForm } from '@/common/js/staticData'

export default {
  components: {
  },
  data() {
    return {
      type: 0,
      createAddressType,
      createAddressForm
    }
  },
  computed: {
  },
  methods: {
    handleCountDownClick() {
      console.log('发送验证码')
    },
    // 保存信息
    handleConfirmClick() {
      console.log('表单信息', createAddressForm)
    },
    // 更改地址类型
    handleChangeTypeClick(e) {
      this.type = e.mp.detail.value
      console.log('携带value值==========', e.mp.detail.value)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background #f6f6f6
  height 1206rpx
  .radio-group
    display flex
    padding 10rpx 20rpx
  .radio
    padding 5px
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
      text-align right
      flex 1
      height 60rpx
      line-height 60rpx
  .btn-wrapper
    position absolute
    left 30rpx
    right 30rpx
    bottom 40rpx
</style>
