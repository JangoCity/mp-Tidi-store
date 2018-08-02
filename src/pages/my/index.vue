<template>
  <section class="container">
    <!-- 用户信息 -->
    <section class="user-info">
      <section class="avatar-wrapper content">
        <img :src="userinfo.avatarUrl"
             class="avatar">
      </section>
      <section class="profile content">
        <button open-type="getUserInfo"
                class="nickname"
                size="mini"
                @getuserinfo="handleGetUserInfo"
                @click="handleCheckVersion">{{userinfo.nickName}}</button>
        <p class="local"
           v-if="userinfo.city"
           v-text="userinfo.city"></p>
      </section>
      <section class="id content"
               v-if="userinfo.uid">
        ID:{{userinfo.uid}}
      </section>

      <!-- mask -->
      <section class="bg-img">
        <section class="mask"></section>
        <img :src="userBgImg"
             class="img"
             mode="scaleToFill">
      </section>
    </section>

    <!-- panel -->
    <section class="list">
      <ul>
        <li v-for="(item, index) in myList"
            :key="item.id"
            class="item iconfont icon-jiantouyou">
          <section class="text iconfont"
                   :class="item.icon"
                   @click="handleLinkClick(item)">{{item.title}}</section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import { myList } from '@/common/js/staticData'
import { share } from '@/common/js/mixins'
import { getOpenId, showNormal } from '@/utils'

export default {
  mixins: [share],
  data() {
    return {
      userBgImg: 'http://image.zhangxinxu.com/image/blog/201208/2012-08-19_155221.jpg',
      userinfo: {
        avatarUrl: '../../../static/images/unlogin.png',
        nickName: '点击登录',
        uid: ''
      },
      myList
    }
  },
  computed: {
  },
  methods: {
    // 跳转
    handleLinkClick(item) {
      let url = ''
      switch (item.id) {
        case 101:
          url = '../my-profile/main'
          break
        case 102:
          url = '../my-wallet/main'
          break
        case 103:
          url = '../my-address/main'
          break
        case 104:
          url = '../my-favorite/main'
          break
        case 105:
          url = '../my-notice/main'
          break
        case 106:
          url = '../my-issues/main'
          break
      }
      // 跳转
      wx.navigateTo({ url })
    },
    // 检测用户微信版本
    handleCheckVersion() {
      if (!wx.canIUse('button.open-type.getUserInfo')) {
        showNormal('请升级微信版本')
      }
    },
    // 获取用户信息
    handleGetUserInfo(e) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) return
      // 首次登陆
      const detail = e.mp.detail
      if (detail.rawData) { // 用户按了允许授权按钮
        getOpenId(detail.userInfo, (userinfo) => {
          if (!userinfo) return
          this.userinfo = Object.assign({}, this.userinfo, userinfo)
          this.userBgImg = this.userinfo.avatarUrl
          wx.setStorageSync('userinfo', userinfo)
        })
      } else {
        console.log('用户按了拒绝按钮')
      }
    }
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
// @import '~common/stylus/icons.css'
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
      z-index 1
      top 0
      left 0
      .mask, .img
        position absolute
        width 100%
      .mask
        height inherit
        z-index 2
        background-image linear-gradient(to bottom, #222, #000)
        filter blur(5px)
        opacity 0.55
      .img
        z-index 1
        height 750rpx
        filter blur(10px)
    .content
      position relative
      z-index 9
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
        btn-normal()
        color #fff
        position static
        font-size 32rpx
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
    &::before
      posY(10rpx, false)
      color #ccc
      font-size 24rpx
    .text
      position relative
      height 60rpx
      line-height 60rpx
      padding-left 60rpx
    .text::before
      position absolute
      font-size 30px
      left 0
    &:nth-of-type(1)
      .text::before
        color #ff8376
    &:nth-of-type(2)
      .text::before
        color #8fd0ae
    &:nth-of-type(3)
      .text::before
        color #84c7ff
    &:nth-of-type(4)
      .text::before
        color #ff8376
    &:nth-of-type(5)
      .text::before
        color #8fd0ae
    &:nth-of-type(6)
      .text::before
        color #84c7ff
</style>
