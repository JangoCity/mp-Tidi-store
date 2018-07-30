<template>
  <section class="ui-count-down">
    <section v-if="timeUp"
             class="time-up">
      {{doneText}}
    </section>
    <section class="count-down-wrap"
             wx:if="{{!timeUp}}">
      <section class="count-down-item"
               style="{{item.type === 'split' ? selfSplitStyle : selfNumberStyle}}"
               v-for="(item,index) in itemArray"
               :key="index">{{item.value}}</section>
    </section>
  </section>

  <view></view>
</template>

<script>
import StyleHelper from '@/utils/StyleHelper'
let moment = require('moment')

export default {
  // behaviors: [],
  props: {
    time: {
      type: [Number, String],
      default: moment().add(1, 'days').format('YYYY/MM/DD HH:mm:ss')
    },
    timetype: {
      type: String,
      default: 'datetime'
    },
    format: {
      type: String,
      default: '{%d}天{%h}时{%m}分{%s}秒'
    },
    numStyle: {
      type: String,
      default: ''
    },
    splitStyle: {
      type: [String, Object],
      default: '',
      observer(val) {
        this.setData({
          selfSplitStyle: StyleHelper.getPlainStyle(val)
        })
      }
    },
    numberStyle: {
      type: [String, Object],
      default: '',
      observer(val) {
        console.log(StyleHelper.getPlainStyle(val))
        this.setData({
          selfNumberStyle: StyleHelper.getPlainStyle(val)
        })
      }
    },
    doneText: {
      type: String,
      value: '已结束'
    }
  },
  data() {
    return {
      futureTimeStamp: undefined,
      itemArray: [],
      mode: 0,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
      selfSplitStyle: '',
      selfNumberStyle: ''
    }
  },
  attached() {
    this.selfSplitStyle = StyleHelper.getPlainStyle(this.splitStyle)
    this.selfNumberStyle = StyleHelper.getPlainStyle(this.numberStyle)
    console.log(this.selfNumberStyle)

    this.onPageShow()
  },
  ready() {
  },
  detached() {
    this.onPageHide()
  },
  methods: {
    onPageHide() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    onPageShow() {
      if (this.timetype === 'second') {
        this.futureTimeStamp = Math.floor(moment().add(this.time, 'seconds').format('x') / 1000)
      } else {
        this.futureTimeStamp = Math.floor(moment(this.time).format('x') / 1000)
      }
      let tempArray = this.format.split(/(\{.*?\})/)
      tempArray.forEach((item) => {
        let obj = {}
        if (item === '{%d}') {
          obj.type = 'day'
          obj.value = ''
          this.day = obj
        } else if (item === '{%h}') {
          obj.type = 'hour'
          obj.value = ''
          this.hour = obj
        } else if (item === '{%m}') {
          obj.type = 'minute'
          obj.value = ''
          this.minute = obj
        } else if (item === '{%s}') {
          obj.type = 'second'
          obj.value = ''
          this.second = obj
        } else {
          obj.type = 'split'
          obj.value = item
        }
        this.itemArray.push(obj)
      })
      this.startCountDown()
    },
    startCountDown() {
      this.interval = setInterval(() => {
        let diffSecond = Math.floor(moment(this.futureTimeStamp * 1000).diff(moment()) / 1000)
        this.timeUp = (diffSecond < 0)
        if (this.timeUp) {
          this.setData({
            timeUp: this.timeUp
          })
          this.triggerEvent('timeup')
          clearInterval(this.interval)
        } else {
          if (this.day) {
            this.day.value = Math.floor(diffSecond / (60 * 60 * 24))
            diffSecond = diffSecond % (60 * 60 * 24)
          }
          if (this.hour) {
            this.hour.value = Math.floor(diffSecond / (60 * 60))
            diffSecond = diffSecond % (60 * 60)
          }
          if (this.minute) {
            this.minute.value = Math.floor(diffSecond / 60)
            diffSecond = diffSecond % 60
          }
          if (this.second) {
            this.second.value = Math.floor(diffSecond)
          }
          this.setData({
            itemArray: this.itemArray
          })
        }
      }, 1000)
    }
  }
}
</script>

<style lang="stylus">
.ui-count-down
  .count-down-item
    display inline
</style>

