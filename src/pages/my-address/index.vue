<template>
  <section class="container">
    <!-- 地址类型 -->
    <radio-group class="radio-group border-bottom" bindchange="radioChange">
      <label class="radio" v-for="(item, index) in addressType" :key="index">
        <radio value="item.name" checked="item.checked" color="#e60012" />{{item.value}}
      </label>
    </radio-group>

    <section class="form-group">

      <!-- 表单列表 -->
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
      addressType: [
        { name: 'home', value: '家庭住址', checked: 'true' },
        { name: 'office', value: '办公住址' }
      ],
      // 列表
      list: [{
        id: 1001,
        label: '姓名',
        placehodleText: '收货人姓名',
        maxlength: 11
      }, {
        id: 1002,
        label: '手机',
        placehodleText: '请输入手机号码',
        maxlength: 11
      }, {
        id: 1002,
        label: '地区',
        placehodleText: '选择地区',
        maxlength: 6
      }, {
        id: 1002,
        label: '小区',
        placehodleText: '所在小区名称',
        maxlength: 6
      }, {
        id: 1002,
        label: '门牌号',
        placehodleText: '具体的楼栋但愿门牌号',
        maxlength: 6
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
    position absolute
    left 30rpx
    right 30rpx
    bottom 40rpx
</style>
