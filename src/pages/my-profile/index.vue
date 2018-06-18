<template>
  <section class="container">
    <!-- 表单列表 -->
    <section class="form-group">
      <section v-for="(item, index) in list" :key="item.id" class="row  border-bottom">
        <span class="label">{{item.label}}</span>
        <p class="input-wrapper">
          <input :placeholder="item.placehodleText" :maxlength="item.maxlength" type="number" class="input">
        </p>
        <button v-if="item.verify" class="btn-verify" @click="handleCountDownClick">发送验证码</button>
      </section>
    </section>

    <section class="btn-wrapper">
      <button class="btn-confirm" @click="handleConfirmClick">保存</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  components: {
  },
  data() {
    return {
      // 列表
      list: [{
        id: 1001,
        label: '头像',
        placehodleText: '用户头像',
        url: 'imgurl'
      }, {
        id: 1002,
        label: '昵称',
        placehodleText: '请输入手机号码'
      }, {
        id: 1003,
        label: '性别',
        placehodleText: '未填写',
        maxlength: 1
      }, {
        id: 1002,
        label: '姓名',
        placehodleText: '未填写',
        maxlength: 6
      }, {
        id: 1002,
        label: '手机',
        placehodleText: '未绑定'
      }]
    }
  },
  computed: {
  },
  methods: {
    handleCountDownClick() {
      console.log('发送验证码')
    },
    handleConfirmClick() { // 保存

    },
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
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
    padding 0 30rpx
</style>
