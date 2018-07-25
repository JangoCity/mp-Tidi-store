<template>
  <section class="container">
    <section class="list-wrapper">
      <scroll-view scroll-y
                   scroll-top="scrollTop"
                   style="height:100%">

        <section v-for="(item, index) in noticeList"
                 :key="item.id"
                 class="scroll-view-item  border-bottom"
                 @click="handleReadDetailClick(item, index)">
          <section class="header">
            <p class="title iconfont icon-xitongxiaoxi"
               :class={new:!item.status}>
              {{item.title}}
            </p>
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

    // 获取通知列表
    async _fetchNoticeList() {
      wx.showNavigationBarLoading()
      const params = { uid: 1, type: 3 }
      const res = await fly.get('messageList', params)
      try {
        this.noticeList = res.data
        // 注销下拉刷新事件
        wx.stopPullDownRefresh()
        // 注销刷新icon状态
        wx.hideNavigationBarLoading()
        this.noticeList.forEach(item => {
          item.created_at = item.created_at.substring(5, 16)
        })
      } catch (err) {
        console.log('获取通知列表报错====', err)
      }
    }
  },
  mounted() {
    this._fetchNoticeList()
  },
  onPullDownRefresh() {
    this._fetchNoticeList()
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
      position relative
      font-weight 600
      padding-left 25px
      &::before
        posY()
        color #ff9e14
        font-size 24px
        font-weight normal
      &.new::after
        position absolute
        right -5rpx
        top -5rpx
        border-radius 50%
        content ''
        width 15rpx
        height 15rpx
        background red
    .date
      color #595959
  .content
    mult_line_ellipsis()
    font-size 14px
    line-height 1.6
</style>
