<template>
  <section class="container">
    <!-- 用户信息 -->
    <section class="user-info">
      <section class="avatar-wrapper">
        <img :src="userinfo.avatarUrl" class="avatar" mode="">
      </section>
      <section class="profile">
        <button open-type="getUserInfo" class="nickname" size="mini" @getuserinfo="handleGetUserInfo" @click="handleCheckVersion">{{userinfo.nickName}}</button>
        <p class="local" v-if="userinfo.city" v-text="userinfo.city"></p>
      </section>
      <section class="id">
        ID:19700001
      </section>

      <!-- mask -->
      <section class="bg-img">
        <section class="mask"></section>
        <img :src="userBgImg" class="img">
      </section>
    </section>

    <!-- panel -->
    <section class="list">
      <ul>
        <li v-for="(item, index) in myList" :key="item.id" class="item">
          <section class="text">{{item.title}}</section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import { myList } from '@/common/js/staticData'
export default {
  data() {
    return {
      id: '',
      userBgImg: 'http://image.zhangxinxu.com/image/blog/201208/2012-08-19_155221.jpg',
      userinfo: {
        avatarUrl: '../../../static/images/unlogin.png',
        nickName: '点击登录',
        city: ''
      },
      myList
    }
  },
  computed: {
  },
  methods: {
    // 检测用户微信版本
    handleCheckVersion() {
      if (!wx.canIUse('button.open-type.getUserInfo')) {
        console.log('请升级微信版本')
      }
    },
    handleGetUserInfo(e) {
      let userinfo = wx.getStorageSync('userinfo')
      // 首次登陆
      if (!userinfo) {
        const detail = e.mp.detail
        if (detail.rawData) { // 用户按了允许授权按钮
          const userInfo = detail.userInfo
          wx.setStorageSync('userinfo', userInfo)
          this.userinfo = userInfo
          this.userBgImg = userInfo.avatarUrl
        } else {
          console.log('用户按了拒绝按钮')
        }
      }
    }
  },
  mounted() {
  },
  onShow() {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
      this.userBgImg = userinfo.avatarUrl
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .user-info
    position relative
    height 230rpx
    padding 60rpx 0 60rpx 30rpx
    background-size contain
    box-sizing border-box
    color #fff
    font-size 0
    .bg-img
      position absolute
      width 100%
      height 230rpx
      overflow hidden
      z-index -1
      top 0
      left 0
      .img
        position absolute
        width 100%
        filter blur(15px)
    .avatar-wrapper
      display inline-block
      width 112rpx
      height 112rpx
      vertical-align top
      background #fff
      padding 2rpx
      border-radius 50%
      margin-right 30rpx
      overflow hidden
      .avatar
        width 112rpx
        height 112rpx
        border-radius 50%
    .profile
      display inline-block
      .nickname
        color #fff
        padding 0
        position static
        font-size 32rpx
        background transparent
        border none
      .local
        font-size 24rpx
    .id
      position absolute
      font-size 32rpx
      background rgba(0, 0, 0, 0.3)
      right 0
      top 60rpx
      padding 10rpx 10rpx 10rpx 30rpx
      border-top-left-radius 30rpx
      border-bottom-left-radius 30rpx
  .list
    padding 0 30rpx
  .item
    position relative
    padding 20rpx 0
    font-size 32rpx
    border-bottom 0.5rpx solid #d7d7d7
    extend-click()
    &::after, .text::before
      prefix-icon()
    &::after
      bg-image('icon-arrow-r')
      left auto
      right 0
      width 11rpx
      height 18rpx
    .text
      position relative
      height 60rpx
      line-height 60rpx
      padding-left 60rpx
    .text::before
      width 36rpx
      height 36rpx
    &:nth-of-type(1)
      .text::before
        bg-image('icon-01')
    &:nth-of-type(2)
      .text::before
        bg-image('icon-02')
    &:nth-of-type(3)
      .text::before
        bg-image('icon-03')
    &:nth-of-type(4)
      .text::before
        bg-image('icon-04')
    &:nth-of-type(5)
      .text::before
        bg-image('icon-05')
</style>
