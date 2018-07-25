<template>
  <section class="container">
    <section class="local-box"
             @click="handeleRestInfoClick">
      <span class="local iconfont icon-weizhi">{{address}}</span>
    </section>
    <section class="weather-box"
             v-if="weather">
      <section class="text">
        <span class="desc"> {{weather.wendu}}℃ {{weather.type}}</span>
        <span class="desc">{{airIndex}}</span>
      </section>
      <section class="iconfont icon"
               :class="weatherIcon">
      </section>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    address: String,
    weather: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // 转换空气质量
    airIndex() {
      let level = ''
      if (!this.weather) return
      let airIndex = this.weather.aqi
      if (airIndex > 0 && airIndex < 50) {
        level = '优'
      } else if (airIndex > 51 && airIndex < 100) {
        level = '良'
      } else if (airIndex > 101 && airIndex < 150) {
        level = '轻度'
      } else if (airIndex > 151 && airIndex < 200) {
        level = '中度'
      } else if (airIndex > 201 && airIndex < 300) {
        level = '重度'
      }
      return level
    },
    // 天气图标
    weatherIcon() {
      if (!this.weather) return

      const weatherType = [{ text: '台风', icon: 'icon-taifeng' }, { text: '沙尘暴', icon: 'icon-shachengbao' }, { text: '沙尘', icon: 'icon-shachen' }, { text: '风', icon: 'icon-feng' }, { text: '中雪', icon: 'icon-zhongxue' }, { text: '雨夹雪', icon: 'icon-yujiaxue' }, { text: '雷阵雪', icon: 'icon-leizhenxue' }, { text: '大雪', icon: 'icon-daxue' }, { text: '冰雹', icon: 'icon-bingbao' }, { text: '暴雪', icon: 'icon-baoxue' }, { text: '小雪', icon: 'icon-xiaoxue' }, { text: '雾霾', icon: 'icon-wumai' }, { text: '雷阵雨', icon: 'icon-leizhenyu' }, { text: '阵雨', icon: 'icon-leizhenyu' }, { text: '雾', icon: 'icon-wu' }, { text: '暴雨', icon: 'icon-baoyu' }, { text: '中雨', icon: 'icon-zhongyu' }, { text: '小雨', icon: 'icon-xiaoyu' }, { text: '多云转阴', icon: 'icon-duoyunzhuanyin' }, { text: '晴天', icon: 'icon-qingtian' }, { text: '多云', icon: 'icon-duoyun' }, { text: '大雨', icon: 'icon-dayu' }]
      const currentWeather = weatherType.filter(item => this.weather.type === item.text)
      // 防止不满足所有天气条件，若都不匹配则返回一个“多云”天气
      return currentWeather.length ? currentWeather[0].icon : 'icon-duoyun'
    }
  },
  methods: {
    handeleRestInfoClick() {
      this.$emit('rest', '123123')
    }
  },
  mounted() {
    // console.log('weather====', this.weather)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
.container
  display flex !important
  flex-wrap nowrap
  justify-content space-between
  font-size 36rpx
  .local-box
    position relative
    padding 0 30rpx 0 10rpx
    color #000
    .local
      no-wrap()
      display inline-block
      max-width 360rpx
    &::before, &::after
      position absolute
      transform translateY(-50%)
      top 50%
      content ''
    &::after
      right 0
      height 0
      width 0
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 6px solid #999
  .weather-box
    display flex !important
    width 170rpx
    text-align right
    .text
      font-size 24rpx
      line-height 24rpx
      .desc
        display block
    .icon
      width 50rpx
      margin-left 10rpx
      flex 0 0 50rpx
      height 48rpx
      font-size 50rpx
</style>
