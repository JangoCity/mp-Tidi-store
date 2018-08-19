<template>
  <section class="container">
    <section class="local-wraper"
             v-if="weather.wendu">
      <Local :address="address"
             :weather="weather"></Local>
    </section>
    <!-- 分类 -->
    <section class="tabs wrapper">
      <section v-for="item in indexInfo"
               :key="item.id"
               class="item"
               :class="{active: item.id===currentId }"
               @click="handleTabClick(item.id)">
        <p class="text">
          <span class="iconfont"
                :class="item.icon"></span>
          {{item.title}}
        </p>
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
              class="item"
              @click="handleTypeClick(item.name,item.id)">
            <section class="text-wrapper">
              <h4 class="title">{{item.name}}</h4>
              <p class="desc">{{item.desc}}</p>
            </section>
            <section class="img-wrapper">
              <img :src="item.column_pic"
                   mode="aspectFit"
                   class="img">
            </section>
          </li>
        </ul>
      </section>
    </section>

    <section class="empty-wrapper"
             v-if="!column">
      <empty></empty>
    </section>

    <!-- 进入遮罩 -->
    <!-- <section class="overlay-wrapper"
             v-show="!isLogin&&weather.wendu"> -->
    <section class="guide-wrapper"
             v-show="!isLogin">
      <section class="guide-text">
        <p class="text">上下滑动，可以找到不同的栏目哦！</p>
        <img :src="guideImg.up"
             class="up"
             mode="aspectFit">
        <img :src="guideImg.down"
             class="down"
             mode="aspectFit">
      </section>
      <button open-type="getUserInfo"
              class="btn-normal guide-btn"
              size="mini"
              @getuserinfo="handleGetUserInfo"
              @click="handleCheckVersion">知道了</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>

import fly from '@/utils/fly'
import { indexInfo } from '@/common/js/staticData'
import { login, share } from '@/common/js/mixins'
import Local from '@/components/local'

import { up, down } from './images'

import Empty from '@/components/Empty'

export default {
  mixins: [login, share],
  components: {
    Local,
    Empty
  },
  data() {
    return {
      isLogin: wx.getStorageSync('userinfo') !== '', // 是否登陆
      address: '未知地点...', // 地址
      geo: { lat: '', lng: '' }, // 经纬度
      weather: { wendu: '' }, // 天气
      currentId: indexInfo[0].id,
      indexInfo,
      guideImg: { up, down }, // 图片
      shopId: undefined, // 店铺ID
      column: []
    }
  },
  methods: {
    // 切换Tab
    handleTabClick(id) {
      this.currentId = id
    },
    // 进入栏目分类
    handleTypeClick(title, id) {
      const url = `../column-list/main?title=${title}&id=${id}`
      wx.navigateTo({ url })
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
    // 获取首页信息
    async _getInfo() {
      // const geo = await this._getGeo()
      // const params = { ...geo }

      const params = { lat: 30.499693, lng: 114.411457 }
      const res = await fly.get('index', params)
      try {
        const data = res.data
        this.address = data.address
        this.weather = data.weather
        this.weather.aqi = data.aqi
        this.weather.wendu = data.wendu
        this.indexInfo[0].list = []
        this.indexInfo[1].list = []
        // this.shopId = data.shop_id
        this.shopId = 8
        this.column = data.column
        if (Array.isArray(data.column)) {
          data.column.forEach(item => {
            indexInfo[item.category - 1].list.push(item)
          })
        }
      } catch (err) {
        console.log('获取首页信息报错', err)
      }
    }
  },
  onHide() {
    // this.currentId = indexInfo[0].id
  },
  // mounted() {
  //   this._getInfo()
  // },
  onShow() {
    this._getInfo()
    this.isLogin = wx.getStorageSync('userinfo') !== ''
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
@import '~common/stylus/icons.css'
.container
  padding 0 40rpx
  color #999
  .local-wraper
    margin 30rpx 0
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
      .text
        position relative
        display inline-block
        .iconfont
          vertical-align top
          display inline-block
          &::before
            left -25rpx
            font-size 24px
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
            mult_line_ellipsis()
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
            mult_line_ellipsis(3)
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
  .guide-wrapper
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background-color rgba(0, 0, 0, 0.35)
    .guide-text
      position relative
      height 300rpx
      color #fff
      top 45%
      left 50%
      transform translate(-50%, -60%)
      .text
        posCenter()
        text-align center
        width 100%
      .up, .down
        position absolute
        width 143rpx
        height 105rpx
      .up
        top 0
        left 80rpx
      .down
        bottom 0
        right 80rpx
    .guide-btn
      position absolute
      color #fff
      border 1px solid #fff
      border-radius 4px
      padding 2px 15px
      top 55%
      left 50%
      transform translate3d(-50%, 0, 0)
</style>
