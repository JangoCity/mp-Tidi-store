<template>
  <section class="container">
    <section class="list-wrapper">

      <scroll-view scroll-y
                   scroll-top="scrollTop">

        <section v-for="(item, index) in noticeList"
                 :key="item.id"
                 class="scroll-view-item  border-bottom"
                 @click="handleReadDetailClick(item, index)">
          <section class="header">
            <span class="title">
              <em class="icon system"
                  :class={new:!item.status}></em>{{item.title}}</span>
            <span class="date">
              {{item.created_at}}
            </span>
          </section>
          <section class="content">
            <p v-html="item.content"></p>
          </section>
        </section>
      </scroll-view>

    </section>
  </section>
</template>

<script type='text/ecmascript-6'>

import fly from '@/utils/fly'
import { showModal } from '@/utils'
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
    // 弹框展示消息详情，并且更改已读状态
    handleReadDetailClick(item, index) {
      const { title, content } = item
      showModal(title, content)
      let target = this.noticeList[index]
      if (target.status) return
      target.status = 1
      fly.get('messageDetail', { id: item.id })
    },
    async _getNoticeList(init) {
      wx.showNavigationBarLoading()
      const params = { uid: 1, type: 3 }
      const data = await fly.get('messageList', params)
      console.log('信息列表页返回结果====', data)
      this.noticeList = data
      // 注销下拉刷新事件
      wx.stopPullDownRefresh()
      // 注销刷新icon状态
      wx.hideNavigationBarLoading()
      this.noticeList.forEach(item => {
        item.created_at = item.created_at.substring(5, 16)
      })
    }
  },
  mounted() {
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
    border-bottom 1px solid #eaeaea
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
    mult_line_ellipsis()
    font-size 14px
    line-height 1.6
</style>
