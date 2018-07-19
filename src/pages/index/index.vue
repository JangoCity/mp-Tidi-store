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
              @click="handleTypeClick(item)">
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
import { getOpenId } from '@/utils'
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
      address: '未知地点...', // 地址
      geo: { lat: '', lng: '' }, // 经纬度
      weather: { wendu: '' }, // 天气
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
    // 进入栏目分类
    handleTypeClick(item) {
      const url = `../column-list/main?title=${item.title}&id=${item.id}`
      wx.navigateTo({ url })
    },
    // 获取设备经纬度
    _getGeo() {
      let _this = this
      let promise = new Promise((resolve, reject) => {
        wx.getLocation({
          success: geo => {
            _this.geo = { lat: geo.latitude, lng: geo.longitude }
            console.log(_this.geo)
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
      try {
        const geo = await this._getGeo() // 参数需要返回的经纬度
        const params = { uid: 1, ...geo }
        const data = await fly.get('index', params)
        this.address = data.address
        this.weather = data.weather
        this.weather.aqi = data.aqi
        this.weather.wendu = data.wendu
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    getOpenId()
    this._getInfo()
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
