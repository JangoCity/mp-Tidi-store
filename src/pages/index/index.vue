<template>
  <section class="container">
    <section class="local-wraper">
      <Local :address="address" :weather="weather"></Local>
    </section>
    <!-- 分类 -->
    <section class="tabs wrapper">
      <section v-for="item in indexInfo" :key="item.id" class="item" :class="{ active: item.id===currentId }" @click="handleTabClick(item.id)">
        <span class="text">{{item.title}}</span>
      </section>
    </section>
    <!-- 内容 -->
    <section class="content">
      <section v-for="(list,i) in indexInfo" :key="list.id" :class="{ active: list.id===currentId }" v-show="list.id===currentId " @click="handleTabClick(list.id)">
        <ul class="list">
          <li v-for="(item, index) in list.list" :key="item.id" class="item">
            <section class="text-wrapper">
              <h4 class="title">{{item.title}}</h4>
              <p class="desc">{{item.desc}}</p>
            </section>
            <section class="img-wrapper">
              <img :src="item.image" mode="aspectFit" class="img">
            </section>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>

import fly from '@/utils/fly'
import { indexInfo } from '@/common/js/staticData'
import { share } from '@/common/js/mixins'

import Local from '@/components/local'

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
      userInfo: {},
      currentId: indexInfo[0].id,
      indexInfo: indexInfo
    }
  },
  computed: {

  },
  methods: {
    // 切换
    handleTabClick(id) {
      this.currentId = id
    },
    // 转换空气污染指数
    _parseAir(index) {
      let level = ''
      index = parseInt(index, 10)
      if (index > 0 && index < 50) {
        level = '优'
      } else if (index > 51 && index < 100) {
        level = '良'
      } else if (index > 101 && index < 150) {
        level = '轻度'
      } else if (index > 151 && index < 200) {
        level = '中度'
      } else if (index > 201 && index < 300) {
        level = '重度'
      }
      return level
    },
    // 转换平均温度
    _parseAvgTemp(high, low) {
      high = parseFloat(high.substring(2, 5), 10)
      low = parseFloat(low.substring(2, 5), 10)
      return (high + low) / 2 + '℃'
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
      const geo = await this._getGeo() // 参数需要返回的经纬度
      const params = { uid: 1, ...geo }
      const res = await fly.get('index', params)
      const data = res.data.data
      this.address = data.address
      this.weather = data.weather
      this.weather.aqi = this._parseAir(data.aqi)
      this.weather.avgTemperature = this._parseAvgTemp(this.weather.high, this.weather.low)
    }
  },
  async created() {
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
