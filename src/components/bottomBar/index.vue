<template>
  <div class="container">
    <!-- 左邊區域 -->
    <section class="func-list">
      <button class="btn-normal item-btn"
              @click="handleToHomeClick">
        <span class="iconfont icon-shouye"></span>
        <span class="text">首页</span>
      </button>
      <button class="btn-normal  item-btn"
              @click="handleFavoriteClick">
        <span class="iconfont"
              :class="[favorite]"></span>
        <span class="text">收藏</span>
      </button>
      <button class="btn-normal  item-btn"
              open-type="contact"
              @click="handleServerClick">
        <span class="iconfont icon-kefu"></span>
        <span class="text">客服</span>
      </button>
      <button open-type="share"
              class="btn-normal  item-btn "
              @click="handleShareCurClick">
        <span class="iconfont icon-fenxiang"></span>
        <span class="text">分享</span>
      </button>
    </section>
    <button class="btn-normal line-gradient-btn btn-buy"
            hover-class="line-gradient-btn-hover"
            @click="handleToBuyClick" v-if="this.status===2 && this.is_status ===0">立即购买</button>
    <button class="btn-normal line-gradient-btn btn-buy"
            hover-class="line-gradient-btn-hover"
             v-else disabled>立即购买</button>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    isLike: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    favorite() {
      return this.isLike ? 'icon-shoucang-xuanzhong' : 'icon-shoucang'
    }
  },
  methods: {
    // 点击跳转首页
    handleToHomeClick() {
      const url = '../home/main'
      wx.switchTab({ url })
    },
    // 点击收藏
    handleFavoriteClick(goodsId) {
      this.$emit('addFavorite')
    },
    // 点击客服
    handleServerClick() {
      this.$emit('server')
    },
    // 点击购买
    handleToBuyClick() {
      this.$emit('buy')
    }
  }
}
</script>

<style scoped lang="stylus">
.container
  display flex
  flex-wrap nowrap
  .func-list
    width 460rpx
    display flex
    text-align center
    line-height 50rpx
    .item-btn
      position relative
      width 25%
      .iconfont
        display block
        margin auto
        height 50rpx
        line-height 50rpx
        font-size 20px
        &.icon-shoucang-xuanzhong
          color #ffb266
      .icon-shouye
      	font-size 51rpx
      .icon-kefu
      	font-size 40rpx
      .icon-fenxiang
      	font-size 60rpx
      .icon-shoucang
      	font-size 58rpx
      .text
        display block
        font-size 14px
        line-height 50rpx
        height 50rpx
  .btn-buy
    width 292rpx
    flex 0 0 292rpx
    margin 0
    line-height 100rpx
</style>
