<template>
  <section class="container">
    <section class="user-info">
      <section class="avatar-wrapper">

      </section>
      <section class="profile">
        <p class="nickname">无敌的被窝君</p>
        <p class="local">华中科技产业大厦</p>
      </section>
      <section class="id">
        ID:19700001
      </section>
    </section>
    <section class="list">
      <ul>
        <li v-for="(item, index) in myList" :key="item.id" class="item">
          <section class="text">{{item.title}}</section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import { myList } from '@/common/js/staticData'
export default {
  data() {
    return {
      myList
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .user-info
    position relative
    height 230rpx
    padding 60rpx 0 60rpx 30rpx
    background red
    box-sizing border-box
    color #fff
    font-size 0
    .avatar-wrapper
      display inline-block
      width 112rpx
      height 112rpx
      vertical-align top
      background #666
      padding 2rpx
      border-radius 50%
      margin-right 30rpx
    .profile
      display inline-block
      line-height 56rpx
      .nickname
        font-size 32rpx
      .local
        font-size 24rpx
    .id
      position absolute
      font-size 32rpx
      background rgba(0, 0, 0, 0.3)
      right 0
      top 60rpx
      padding 10rpx 10rpx 10rpx 30rpx
      border-top-left-radius 30rpx
      border-bottom-left-radius 30rpx
  .list
    padding 0 30rpx
  .item
    position relative
    padding 20rpx 0
    border-bottom 0.5rpx solid #d7d7d7
    extend-click()
    &::after,.text::before
      prefix-icon()
    &::after
       bg-image('icon-arrow-r')
       left auto
       right 0
       width 11rpx
       height 18rpx
    .text
      position relative
      font-size 32rpx
      height 60rpx
      line-height 60rpx
      padding-left 60rpx
    .text::before
      width 36rpx
      height 36rpx
    &:nth-of-type(1)
      .text::before
        bg-image('icon-01')
    &:nth-of-type(2)
      .text::before
        bg-image('icon-02')
    &:nth-of-type(3)
      .text::before
        bg-image('icon-03')
    &:nth-of-type(4)
      .text::before
        bg-image('icon-04')
    &:nth-of-type(5)
      .text::before
        bg-image('icon-05')
</style>
