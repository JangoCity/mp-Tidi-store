<template>
  <section class="container">
    <section class="local-wraper">
      <Local></Local>
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
import Local from '@/components/local'
import { indexInfo } from '@/common/js/staticData'
export default {
  components: {
    Local
  },
  data() {
    return {
      userInfo: {},
      currentId: indexInfo[0].id,
      indexInfo: indexInfo
    }
  },
  methods: {
    handleTabClick(id) {
      this.currentId = id
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },
  mounted() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
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
        bg-image('work')
      &:nth-of-type(2) .text::before
        bg-image('life')
      &:nth-of-type(1).active .text::before
        bg-image('work-active')
      &:nth-of-type(2).active .text::before
        bg-image('life-active')
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
