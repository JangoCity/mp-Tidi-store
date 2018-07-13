<template>
  <section class="container">
    <!-- 表单列表 -->
    <section class="form-group">
      <!-- 头像 -->
      <section class="row  border-bottom">
        <span class="label">头像</span>
        <p class="input-wrapper">
          <img :src="userinfo.avatarUrl" class="avatar" mode="aspectFill">
        </p>
      </section>
      <!-- 昵称 -->
      <section class="row  border-bottom">
        <span class="label">昵称</span>
        <p class="input-wrapper">
          {{userinfo.nickName}}
        </p>
      </section>
      <!-- 性别 -->
      <section class="row  border-bottom">
        <span class="label">性别</span>
        <p class="input-wrapper">
          {{userinfo.gender}}
        </p>
      </section>
      <!-- 姓名 -->
      <section class="row  border-bottom">
        <span class="label">姓名</span>
        <p class="input-wrapper">
          {{userinfo.name}}
        </p>
      </section>
      <!-- 手机 -->
      <section class="row  border-bottom">
        <span class="label">手机</span>
        <p class="input-wrapper">
          <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btn-normal phone">{{userinfo.phone}} </button>
        </p>
      </section>

      <!-- <section v-for="(item, index) in list" :key="item.id" class="row  border-bottom">
        <span class="label">{{item.label}}</span>
        <p class="input-wrapper">
          <input :placeholder="item.placehodleText" :maxlength="item.maxlength" type="number" class="input">
        </p>
        <button v-if="item.verify" class="btn-verify" @click="handleCountDownClick">发送验证码</button>
      </section> -->
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
      userinfo: {
        avatarUrl: '../../../static/images/unlogin.png',
        nickName: '未绑定',
        phone: '未绑定',
        gender: '未知',
        name: '未填写',
        city: ''
      }
    }
  },
  computed: {
  },
  methods: {
    // 获取手机号
    getPhoneNumber(e) {
      let phone = this.userinfo.phone
      if (!phone) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
      }
    },
    handleCountDownClick() {
      console.log('发送验证码')
    },
    handleConfirmClick() { // 保存
    },
    _parseSex(sex = '') {
      sex = parseInt(sex, 10)
      switch (sex) {
        case 0:
          sex = '未知'
          break
        case 1:
          sex = '男'
          break
        case 2:
          sex = '女'
          break
      }
      return sex
    },
    _getUserInfo() {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = Object.assign({}, this.userinfo, userinfo)
        this.userinfo.gender = this._parseSex(userinfo.gender)
      }
    }
  },
  mounted() {
    this._getUserInfo()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background #f6f6f6
  height 1206rpx
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
      overflow hidden
    .input-wrapper
      .avatar
        display inline-block
        height inherit
        width 60rpx
        border-radius 50%
      .phone
        font-size 28rpx
  .btn-wrapper
    padding 0 30rpx
</style>
