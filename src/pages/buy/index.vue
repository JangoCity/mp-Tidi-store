<template>
  <section class="container">

    <!-- 用户信息 -->
    <section class="user-info"
             v-if="contact"
             @click="handleChangeContactClick">
      <user-info :contact="contact"></user-info>
    </section>

    <!-- 支付方式 -->
    <section class="pay-way-wrapper">
      <payment-mode @changeType="handlePayModeClick"></payment-mode>
    </section>

    <!-- 商品信息 -->
    <section class="order-wrapper">
      <section class="store-info">
        <p class="title iconfont icon-shop">{{shop_name}}</p>
        <p class="address">{{address}}</p>
      </section>

      <!-- 商品相关信息 -->
      <section class="goods-total">
        <section class="img-wrapper">
          <img :src="image"
               class="max-img">
        </section>
        <section class="text-wrapper">
          <p class="title">{{product_name}}</p>
          <p class="price money">{{total}}</p>
        </section>
      </section>

      <!-- 购买数量 -->
      <section class="count-wrapper">
        <span class="label">购买数量</span>
        <span class="count">
          <counter @change="handleCountClick"></counter>
        </span>
      </section>
      <tip :rank="tipInfo.rank"
           :sale="tipInfo.sale"
           v-if="tipInfo"></tip>
    </section>

    <!-- 客户留言 -->
    <section class="comment-wrapper">
      <p class="title">订单留言</p>
      <section class="textarea-wrapper">
        <textarea class="textarea"
                  v-model="message"
                  :placeholder="'请填写您需要备注的信息'"
                  placeholder-class="placehodle"
                  placeholder-style="color:#999; font-size:14px;"></textarea>
      </section>
    </section>

    <!-- 底部支付 -->
    <section class="bottom">
      <p class="text  border-top">
        应付款
        <span class="money">{{total}}</span>（{{type}}）
      </p>
      <button class="line-gradient-btn btn-normal btn"
              @click.prevent="handlePayClick">
        立即支付
      </button>
    </section>

  </section>
</template>

<script type='text/ecmascript-6'>

import counter from '@/components/counter'
import userInfo from '@/components/userInfo'
import paymentMode from '@/components/paymentMode'
import tip from '@/components/tip'

import fly from '@/utils/fly'
import { share, pay } from '@/common/js/mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [share, pay],
  components: {
    userInfo,
    paymentMode,
    counter,
    tip
  },
  data() {
    return {
      price: 0, // 商品价格
      contact: undefined,
      tipInfo: undefined,
      message: '', // 用户留言
      shop_name: null,
      address: null,
      product_name: null,
      image: null,
      type: 1
    }
  },
  computed: {
    // 总价
    total() {
      return this.price * this.count + '.00'
    },
    ...mapGetters(['count', 'payment'])
  },
  methods: {
    // 切换收货地址
    handleChangeContactClick() {
      const url = '../my-address/main'
      wx.navigateTo({ url })
    },
    // 拉取接口数据
    async _fetchData(id) {
      const { uid } = wx.getStorageSync('userinfo')
      const params = { id, uid }
      const res = await fly.get('buyProduct', params)
      try {
        const data = res.data
        const { contact, product, shop } = data

        // 默认地址信息
        const { name, phone, district, address } = contact
        const province = contact.province_id
        const city = contact.city_id
        const area = contact.area_id
        // 商品信息
        this.product_name = product.product_name
        this.image = product.image
        // 店铺信息
        this.shop_name = shop.shop_name
        this.address = shop.address
        this.type = product.type === 1 ? '店铺配送' : '到店消费'
        this.contact = { name, phone, province, city, area, district, address }

        console.log('this.contact', this.contact)
        // 商品价格
        this.price = product.selling_price
        // 提示
        this.tipInfo = {
          rank: data.orderBy,
          sale: data.rebage
        }
      } catch (err) {
        console.log('拉取接口信息报错', err)
      }
    }
  },
  mounted() {
    this._fetchData(this.$root.$mp.query.id)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  padding 20rpx 30rpx 100rpx 30rpx
  background #f6f6f6
  .user-info, .pay-way-wrapper, .order-wrapper, .comment-wrapper
    position relative
    padding 30rpx
    box-sizing border-box
    background #fff
    margin-bottom 20rpx
    border-radius 10rpx
  .user-info
    &::after
      position absolute
      content ''
      left 0
      bottom 0
      width 100%
      height 4px
      background linear-gradient(-60deg, #fc4331 25%, #f6f6f6 50%, #2e93ff 25%)
      background-size 30px 100%
  .order-wrapper
    .store-info
      position relative
      margin-bottom 25rpx
      &::before
        top 25rpx
      .title
        font-size 16px
        margin-bottom 20rpx
      .address
        font-size 12px
    .goods-total
      margin-bottom 35rpx
      .img-wrapper
        display inline-block
        width 165rpx
        height 165rpx
        vertical-align top
        margin-right 20rpx
    .text-wrapper
      display inline-block
      width 445rpx
      height 165rpx
      .title
        mult_line_ellipsis()
        font-size 16px
        margin-bottom 35rpx
        line-height 26px
      .price
        color $color-theme
        font-size 20px
  .count-wrapper
    display flex
    justify-content space-between
    margin-bottom 40rpx
    .label
      font-size 18px
  .comment-wrapper
    position relative
    z-index 1
    .title
      font-size 16px
      margin-bottom 20rpx
    .textarea
      position static
      z-index 1
      font-size 14px
      background #fbfafa
      border 0.5rpx solid #f0f0f0
      padding 15rpx 20rpx
      box-sizing border-box
      border-radius 10rpx
      width 100%
  .bottom
    position absolute
    display flex
    z-index 100
    left 0
    right 0
    bottom 0
    width 100%
    background #fff
    height 100rpx
    line-height 100rpx
    .text, .btn
      display inline-block
    .text
      padding-left 30rpx
      font-size 14px
      line-height 100rpx
      width 430rpx
      .money
        color $color-theme
        font-size 18px
        font-weight 600
    .btn
      width 290rpx
      flex 0 0 290rpx
      line-height 100rpx
      border-radius 0
</style>
