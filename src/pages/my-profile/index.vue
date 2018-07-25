<template>
  <section class="container">
    <!-- 表单列表 -->
    <section class="form-group">
      <!-- 头像 -->
      <section class="row  border-bottom">
        <span class="label">头像</span>
        <p class="input-wrapper">
          <img :src="userinfo.avatarUrl"
               class="avatar"
               mode="aspectFill">
        </p>
      </section>
      <!-- 昵称 -->
      <section class="row  border-bottom">
        <span class="label">昵称</span>
        <p class="input-wrapper">
          <input placeholder="未填写"
                 disabled="!userinfo.nickName"
                 placeholder-style="color:#333"
                 v-model="userinfo.nickName">
        </p>
      </section>
      <!-- 性别 -->
      <section class="row  border-bottom">
        <span class="label">性别</span>
        <p class="input-wrapper">
          <input placeholder="未知"
                 disabled
                 placeholder-style="color:#333"
                 v-model="userinfo.gender">
        </p>
      </section>
      <!-- 姓名 -->
      <section class="row  border-bottom">
        <span class="label">姓名</span>
        <p class="input-wrapper">
          <input placeholder="未填写"
                 placeholder-style="color:#333"
                 v-model="userinfo.name">
        </p>
      </section>
      <!-- 手机 -->
      <section class="row  border-bottom">
        <span class="label">手机</span>
        <p class="input-wrapper">
          <button open-type="getPhoneNumber"
                  bindgetphonenumber="getPhoneNumber"
                  class="btn-normal phone">{{userinfo.phone||'未绑定'}} </button>
        </p>
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
import { showModal } from '@/utils'
import fly from '@/utils/fly'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
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

      let modal = e.detail.errMsg === 'getPhoneNumber:fail user deny'
        ? { title: '提示', content: '未授权' }
        : { title: '提示', content: '同意授权' }
      showModal(modal)
    },
    async _saveProfileInfo() {
      const params = { uid: this.userinfo.uid }
      let userinfo = await fly.post('postCustomerInfo', params)
      try {
        userinfo.avatarUrl = userinfo.image
        userinfo.nickName = userinfo.wechat_name
        userinfo.gender = this._parseSex(userinfo.sex)
        userinfo.name = userinfo.username
        console.log('info=======', userinfo)
        this.setUserInfo(userinfo)
      } catch (err) {
        console.log('保存资料错误', err)
      }
    },
    // 保存资料
    handleConfirmClick() {
      this._saveProfileInfo()
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
      userinfo.gender = this._parseSex(userinfo.gender)
      this.setUserInfo(userinfo)
    },
    ...mapMutations({
      setUserInfo: 'SET_USETINFO'
    })
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
