<template>
  <section class="container">
    <scroll-view scroll-y
                 scroll-top="scrollTop"
                 style="height:100%"
                 v-if="favoriteList.length">
      <!-- 收藏列表 -->
      <section class="scroll-view-item"
               v-for="(item,index) in favoriteList"
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
                     @click="handleRemoveClick(item.id,index)"></section>
          </section>
          <section class="btn-wrapper">
            <button class="btn btn-normal"
                    v-if="!item.isEmpty"
                    @click="handleToBuyClick(item)">去购买</button>
            <button class="btn-disabled btn-normal  btn"
                    v-else
                    @click="handleToBuyClick(item)">售罄</button>
            <span class="count-down">
              <count-down @endCallback="countDownEnd(item)"
                          :startTime="currentTime"
                          :endTime="item.end_buytime"
                          :onlyTime="true"></count-down>
            </span>
          </section>
        </section>
      </section>

    </scroll-view>
    <!-- 列表为空 -->
    <section class="empty-wrapper"
             v-else>
      <empty></empty>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import Empty from '@/components/Empty'
import countDown from '@/components/countDown'

import fly from '@/utils/fly'
import { showSuccess } from '@/utils'
import { share } from '@/common/js/mixins'

export default {
  components: {
    Empty,
    countDown
  },
  mixins: [share],
  data() {
    return {
      favoriteList: [], // 收藏列表
      currentTime: new Date().getTime() // 当前时间
    }
  },
  methods: {
    countDownEnd(item) {
      item.isEmpty = true
    },
    // 转换优惠
    _transRebate(list) {
      console.log('list===', list)
      list.forEach(goods => {
        const { repertory } = goods
        goods.end_buytime = new Date(goods.end_buytime).getTime()
        goods.isEmpty = goods.end_buytime < this.currentTime && parseInt(repertory, 10) <= 0
      })
    },
    // 点击购买
    handleToBuyClick(item) {
      console.log(item)
      showSuccess(item.product_name)
      const url = `../goods-detail/main?id=${item.id}`
      wx.navigateTo({ url })
    },
    // 取消收藏
    async handleRemoveClick(id, index) {
      const { uid } = wx.getStorageSync('userinfo')
      const res = await fly.get('favoriteDel', { uid, id })
      try {
        this.favoriteList.slice(index, 1)
        showSuccess(res.message)
        this._fetchFavoriteList()
      } catch (err) {
        console.log('删除收藏报错', err)
      }
    },
    //  获取收藏列表
    async _fetchFavoriteList() {
      wx.showNavigationBarLoading()
      const { uid } = wx.getStorageSync('userinfo')
      const params = { uid }
      const res = await fly.get('favorite', params)
      try {
        const data = res.data
        this.favoriteList = data.list
        this._transRebate(data.list)
        // 注销下拉刷新事件
        wx.stopPullDownRefresh()
        // 注销刷新icon状态
        wx.hideNavigationBarLoading()
      } catch (err) {
        console.log('获取收藏列表报错====', err)
      }
    }
  },
  mounted() {
    this._fetchFavoriteList()
  },
  onPullDownRefresh() {
    this._fetchFavoriteList()
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
      height 52rpx
      line-height 52rpx
      .btn
        margin 0
        font-size 14px
        height 52rpx
        line-height 52rpx
        border-radius 10rpx
        padding 0 10rpx
        color #fff
        background-color $color-theme
      .count-down
        font-size 12px
        color #666
</style>
