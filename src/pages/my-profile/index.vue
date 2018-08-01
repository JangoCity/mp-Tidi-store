<template>
  <section class="container">
    <!-- 表单列表 -->
    <section class="form-group"
             v-if="userinfo">
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
          <button class="btn-normal phone"
                  @click="getPhoneNumber">{{userinfo.phone||'未绑定'}} </button>
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
import { showSuccess } from '@/utils'
import fly from '@/utils/fly'
import { ERR_OK } from '@/utils/config'
export default {
  components: {
  },
  data() {
    return {
      userinfo: wx.getStorageSync('userinfo') // 自定义个人信息
    }
  },
  methods: {
    // 获取手机号
    getPhoneNumber(e) {
      let phone = this.userinfo.phone
      if (!phone) {
        let url = '../bind-phone/main'
        wx.navigateTo({ url })
      }
    },
    // 转换性别
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
    // 获取个人信息
    async _fetchUserInfo() {
      const params = { uid: this.userinfo.uid }
      console.log(params)
      const res = await fly.get('customerInfo', params)
      try {
        const data = res.data
        const custom = {
          avatarUrl: data.image,
          gender: this._parseSex(data.sex),
          nickName: data.wechat_name,
          name: data.username,
          phone: data.tel
        }
        this.userinfo = Object.assign({}, this.userinfo, custom)
      } catch (err) {
        console.log('获取个人信息报错====', err)
      }
    },
    // 保存资料
    async handleConfirmClick() {
      const params = { uid: this.userinfo.uid, username: this.userinfo.name }
      const res = await fly.post('postuserinfoerInfo', params)
      try {
        wx.setStorageSync('userinfo', this.userinfo)
        // this._fetchUserInfo()
        res.code === ERR_OK && showSuccess(res.message)
      } catch (err) {
        console.log('保存资料错误', err)
      }
    }
  },
  mounted() {
    this._fetchUserInfo()
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
