<template>
  <section class="container">
    <section class="list-wrapper">

      <scroll-view scroll-y scroll-top="scrollTop">
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system new"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system new"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system new"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system new"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system new"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
        <section class="scroll-view-item  border-bottom">
          <section class="header">
            <span class="title">
              <em class="icon system"></em>系统消息</span>
            <span class="date">
              9-08 12:26
            </span>
          </section>
          <section class="content">
            <p>您好，恭喜您，您发起的火龙果4人拼团拼团成功，请等待派送员送货</p>
          </section>
        </section>
      </scroll-view>

    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
// import scrollView from '@/components/scrollView'
export default {
  components: {

  },
  data() {
    return {
      scrollTop: 100
    }
  },
  methods: {
    upper: function (e) {
      console.log(123)
    },
    lower: function (e) {
      console.log(456)
    },
    scroll: function (e) {
      console.log(789)
    },
    tapMove: function (e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    },
    onPullDownRefresh(e) {
      // 开始下拉
      wx.startPullDownRefresh({
        success: () => {
          console.log('刷新成功')
        },
        fail: () => {
          console.log('刷新失败')
        }
      })
    }
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
