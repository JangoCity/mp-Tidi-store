<template>
  <section class="container">
    <scroll-view scroll-y
                 scroll-top="scrollTop"
                 style="height:100%">
      <!-- 一条 -->
      <section class="scroll-view-item"
               v-for="item in favoriteList"
               :key="item.id">
        <section class="img-wrapper">
          <img :src="item.product_image"
               alt="item.product_name"
               class="img">
        </section>
        <section class="text-wrapper border-bottom">
          <p class="title">{{item.product_name}}</p>
          <section class="inside">
            <section class="price">
              <span class="now-price money">{{item.selling_price}}</span>
              <span class="old-price money">{{item.original_price}}</span>
            </section>
            <section class="favorite icon-wodeshoucang iconfont"
                     @click="handleRemoveClick(item.id)"></section>
          </section>
          <section class="btn-wrapper">
            <button class="btn">去购买</button>
            <span class="count-down">剩余15小时23分11秒</span>
          </section>
        </section>
      </section>
    </scroll-view>
  </section>
</template>

<script type='text/ecmascript-6'>
import fly from '@/utils/fly'
import { showSuccess } from '@/utils'
import { share } from '@/common/js/mixins'
import { mapMutations, mapGetters } from 'vuex'

export default {
  mixins: [share],
  data() {
    return {
      favoriteList: []
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {

    // 取消收藏
    async handleRemoveClick(id) {
      console.log('id', id)
      let data = await fly.get('favoriteDel', { uid: id })
      try {
        showSuccess(data.message)
        this._getFavoriteList()
      } catch (err) {
        console.log('删除收藏报错', err)
      }
    },
    //  获取收藏列表
    async _getFavoriteList() {
      wx.showNavigationBarLoading()
      // const params = { uid: this.userinfo.uid }
      const params = { uid: 1 }
      const data = await fly.get('favorite', params)
      console.log('信息列表页返回结果====', data)
      this.favoriteList = data.list
      // 注销下拉刷新事件
      wx.stopPullDownRefresh()
      // 注销刷新icon状态
      wx.hideNavigationBarLoading()
    },
    ...mapMutations({
      setFavorite: 'SET_FAVORITE'
    })
  },
  mounted() {
    this._getFavoriteList()
  },
  onPullDownRefresh() {
    this._getFavoriteList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .scroll-view-item
    font-size 0
    padding 0 30rpx
    margin-bottom 20rpx
    .img-wrapper, .text-wrapper
      display inline-block
    .img-wrapper
      width 205rpx
      height 205rpx
      margin-right 20rpx
      vertical-align top
      .img
        fix-image-size()
    .text-wrapper
      width 465rpx
      font-size 14px
      padding-bottom 40rpx
      .title
        mult_line_ellipsis()
      .inside
        height 38px
        line-height 38px
        display flex
        justify-content space-between
        .now-price
          font-size 18px
          color $color-theme
          margin-right 20rpx
          font-weight 600
        .old-price
          font-size 14px
          color #999
          text-decoration line-through
        .favorite
          font-size 48rpx
          color #ffb266
    .btn-wrapper
      display flex
      justify-content space-between
      line-height 52rpx
      .btn
        margin 0
        font-size 14px
        height 52rpx
        line-height 52rpx
        color #fff
        background-color $color-theme
      .count-down
        font-size 12px
        color #666
</style>
