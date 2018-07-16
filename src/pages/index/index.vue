<template>
  <section class="container">
    <section class="local-wraper">
      <Local :address="address"
             :weather="weather"></Local>
    </section>
    <!-- 分类 -->
    <section class="tabs wrapper">
      <section v-for="item in indexInfo"
               :key="item.id"
               class="item"
               :class="{ active: item.id===currentId }"
               @click="handleTabClick(item.id)">
        <span class="text">{{item.title}}</span>
      </section>
    </section>
    <!-- 内容 -->
    <section class="content">
      <section v-for="(list,i) in indexInfo"
               :key="list.id"
               :class="{ active: list.id===currentId }"
               v-show="list.id===currentId "
               @click="handleTabClick(list.id)">
        <ul class="list">
          <li v-for="(item, index) in list.list"
              :key="item.id"
              class="item">
            <section class="text-wrapper">
              <h4 class="title">{{item.title}}</h4>
              <p class="desc">{{item.desc}}</p>
            </section>
            <section class="img-wrapper">
              <img :src="item.image"
                   mode="aspectFit"
                   class="img">
            </section>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>

import fly from '@/utils/fly'
import { showModal } from '@/utils'
import { indexInfo } from '@/common/js/staticData'
import { share } from '@/common/js/mixins'
import Local from '@/components/local'

import { mapGetters } from 'vuex'

export default {
  mixins: [share],
  components: {
    Local
  },
  data() {
    return {
      address: '未知地点', // 地址
      geo: { lat: '', lng: '' }, // 经纬度
      weather: {}, // 天气
      currentId: indexInfo[0].id,
      indexInfo: indexInfo
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {
    // 切换
    handleTabClick(id) {
      this.currentId = id
      // console.log(this.userinfo.nickName)
      console.log('vm实例==========', this.userinfo)
    },
    // 获取设备经纬度
    _getGeo() {
      let _this = this
      let promise = new Promise((resolve, reject) => {
        wx.getLocation({
          success: geo => {
            _this.geo = { lat: geo.latitude, lng: geo.longitude }
            resolve(_this.geo)
          },
          fail: () => {
            wx.hideLoading()
          }
        })
      })
      return promise
    },
    // 授权并且获取openid以及用户ID
    _getOpenId() {
      wx.login({
        success: async (res) => {
          if (res.code) {
            // 获取openId
            let params = { code: res.code }
            let data = await fly.get('auth', params)
            let openid = data.openid

            let userinfo = wx.getStorageSync('userinfo')
            if (!userinfo) return

            // 根据openId获取用户信息
            params = {
              openid,
              wechat_name: userinfo.nickName,
              image: userinfo.avatarUrl,
              sex: userinfo.gender
            }
            let login = await fly.post('login', params)
            // 将uid并入userinfo并存储Storage
            userinfo.uid = login.user.id
            wx.setStorageSync('userinfo', userinfo)
          } else {
            showModal({
              title: '获取用户登录态失败！',
              content: res.errMsg
            })
          }
        }
      })
    },
    // 获取首页信息
    async _getInfo() {
      const geo = await this._getGeo() // 参数需要返回的经纬度
      const params = { uid: 1, ...geo }
      const data = await fly.get('index', params)
      // console.log('首页返回结果====', data)
      this.address = data.address
      this.weather = data.weather
      this.weather.aqi = data.aqi
      this.weather.avgTemperature = data.weather.high
    }
  },
  mounted() {
    this._getOpenId()
    this._getInfo()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  padding 0 40rpx
  color #999
  .local-wraper
    margin-bottom 30rpx
  .tabs
    display flex
    justify-content space-between
    margin-bottom 30rpx
    .item
      position relative
      text-align center
      box-sizing border-box
      width 320rpx
      height 120rpx
      line-height 120rpx
      font-size 16px
      background #fff
      border 1px solid #d9d9d9
      border-radius 6px
      text-indent 25rpx
      .text
        position relative
        display inline-block
        &::before
          prefix-icon(40rpx, 40rpx)
          left -25rpx
      &:nth-of-type(1) .text::before
        bg-image('icon-work')
      &:nth-of-type(2) .text::before
        bg-image('icon-life')
      &:nth-of-type(1).active .text::before
        bg-image('icon-work-active')
      &:nth-of-type(2).active .text::before
        bg-image('icon-life-active')
      &.active
        color #fff
        background linear-gradient(to bottom, #e61b00, #ff5408)
        border none
  .content
    .list
      display flex
      flex-direction column
      flex-wrap nowrap
      justify-content space-between
      .item
        position relative
        height 240rpx
        background #f4f4f4
        padding 40rpx 20rpx
        margin-bottom 40rpx
        .text-wrapper
          width 350rpx
          font-size 18px
          padding-right 20px
          .title
            position relative
            color #333
            font-weight 700
            font-size 20px
            margin-bottom 30rpx
            padding-left 30rpx
            &::before
              prefix-icon(14rpx, 14rpx)
              background-color $color-theme
              border-radius 50%
          .desc
            line-height 1.6
            font-size 16px
        .img-wrapper
          position absolute
          width 340rpx
          height 240rpx
          right 0
          bottom 0
        .img
          fix-image-size()
</style>
