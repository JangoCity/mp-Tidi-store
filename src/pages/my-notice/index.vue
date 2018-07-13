<template>
  <section class="container">
    <section class="list-wrapper">

      <scroll-view scroll-y scroll-top="scrollTop">

        <section v-for="(item, index) in noticeList" :key="item.id" class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system new"></em>{{item.title}}</span>
            <span class="date">
              {{item.created_at}}
            </span>
          </section>
          <section class="content">
            <p>{{item.content}}</p>
          </section>
        </section>
      </scroll-view>

    </section>
  </section>
</template>

<script type='text/ecmascript-6'>

import fly from '@/utils/fly'
import { share } from '@/common/js/mixins'
export default {
  mixins: [share],
  components: {
  },
  data() {
    return {
      scrollTop: 100,
      noticeList: []
    }
  },
  methods: {
    upper(e) {
      console.log(123)
    },
    lower(e) {
      console.log(456)
    },
    scroll(e) {
      console.log(789)
    },
    tapMove(e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    },
    async _getNoticeList(init) {
      wx.showNavigationBarLoading()
      const params = { uid: 1, type: 3 }
      const res = await fly.get('messageList', params)
      this.noticeList = res.data.data.data
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      this.noticeList.forEach(item => {
        item.created_at = item.created_at.substring(5, 16)
      })
    }
  },
  async created() {
    this._getNoticeList()
  },
  onPullDownRefresh() {
    this._getNoticeList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .scroll-view-item
    padding 35rpx 30rpx
    box-sizing border-box
  .header
    display flex
    justify-content space-between
    font-size 16px
    height 40rpx
    line-height 40rpx
    margin-bottom 20rpx
    .title
      font-weight 600
      .icon
        position relative
        display inline-block
        vertical-align top
        width 38rpx
        height 38rpx
        margin-right 10rpx
        background-size contain
        &.new::before
          position absolute
          right -5rpx
          top -5rpx
          border-radius 50%
          content ''
          width 15rpx
          height 15rpx
          background red
        &.system
          bg-image('icon-notice')
    .date
      color #595959
  .content
    font-size 14px
    line-height 1.6
</style>
