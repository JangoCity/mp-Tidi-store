<template>
  <section class="container">
    <scroll-view scroll-y
                 scroll-top="scrollTop"
                 style="height:100%"
                 v-if="addressList.length">
      <section v-for="(item, index) in addressList"
               class="address-wrapper"
               :key="item.id">
        <section class="header"
                 @click="handleAddressClick(item)">
          {{item.name}} {{item.phone}}
          <span class="remark">{{item.type}}</span>
        </section>
        <section class="content border-bottom"
                 @click="handleAddressClick(item)">
          {{item.address}}
        </section>
        <section class="bottom">
          <section class="left">
            <radio-group class="radio-group"
                         @change="handleDefaultAddressClick(item)">
              <label class="radio">
                <radio :value="item.id"
                       :checked="item.id===defaultAddressId"
                       color="#e60012" />设为默认
              </label>
            </radio-group>
          </section>
          <section class="right">
            <section @click="handleEditClick(item.id)">
              <span class="iconfont icon-bj"></span>
              编辑
            </section>
            <section @click="handleDeleteClick(item.id)">
              <span class="iconfont icon-shanchu"></span>
              删除
            </section>
          </section>
        </section>
      </section>
    </scroll-view>
    <!-- 列表为空 -->
    <section class="empty-wrapper"
             v-else>
      <empty></empty>
    </section>
    <section class="btn-wrapper">
      <a class="btn-confirm btn"
         href="../add-address/main"
         hover-class="btn-confirm-hover">
        <span class="iconfont icon--jiahao"></span>新增地址</a>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import fly from '@/utils/fly'
import { showSuccess, showNormal } from '@/utils'
import { mapMutations } from 'vuex'

import Empty from '@/components/Empty'

export default {
  components: {
    Empty
  },
  data() {
    return {
      goodsId: null,
      addressList: [], // 地址列表
      defaultAddressId: undefined // 默认地址
    }
  },
  methods: {
    // 删除地址
    handleDeleteClick(id) {
      if (id === this.defaultAddressId) {
        showNormal('请设置其它地址为默认地址再删除')
        return
      }
      const index = this.addressList.forEach((item, index) => {
        if (item.id === id) {
          return index
        }
      })
      this.addressList.slice(index, 1)
      // 确定删除回调
      const del = async () => {
        const { uid } = wx.getStorageSync('userinfo')
        const params = { uid, id }
        const res = await fly.get('deleteContact', params)
        try {
          showSuccess(res.message)
          this._fetchAddressList()
        } catch (err) {
          console.log('删除地址报错', err)
        }
      }

      wx.showModal({
        title: '提示',
        content: '确定删除该地址吗?',
        success: (ev) => {
          ev.confirm && del()
        }
      })
    },
    // 编辑地址
    async handleEditClick(id) {
      const url = `../add-address/main?id=${id}`
      wx.navigateTo({ url })
    },
    // 更改默认地址
    async handleDefaultAddressClick(contact) {
      const { uid } = wx.getStorageSync('userinfo')
      const params = { uid, id: contact.id }
      const res = await fly.get('setDefault', params)
      this.setContact(contact)
      try {
        showSuccess(res.message)
        this.defaultAddressId = contact.id
        // 此处是“单独购买页面传过来的”
        setTimeout(() => {
          if (this.goodsId) {
            const url = `../buy/main?id=${this.goodsId}`
            wx.navigateBack({ url })
          }
        }, 600)
      } catch (err) {
        console.log('更改默认地址报错', err)
      }
    },
    // 更换地址
    async handleAddressClick(contact) {
      if (this.goodsId) {
        const { uid } = wx.getStorageSync('userinfo')
        const params = { uid, id: contact.id }
        const res = await fly.get('setDefault', params)
        this.setContact(contact)
        try {
          showSuccess(res.message)
          this.defaultAddressId = contact.id
          // 此处是“单独购买页面传过来的”
          setTimeout(() => {
            if (this.goodsId) {
              const url = `../buy/main?id=${this.goodsId}`
              wx.navigateBack({ url })
            }
          }, 600)
        } catch (err) {
          console.log('更改默认地址报错', err)
        }
      }
    },
    // 获取收货地址列表
    async _fetchAddressList() {
      const { uid } = wx.getStorageSync('userinfo')
      const params = { uid }
      const res = await fly.get('contact', params)

      try {
        const data = res.data
        if (!data.contact.length) return

        this.addressList = data.contact
        this.defaultAddressId = this.addressList.filter(item => item.default === 1)[0].id
        this.addressList.forEach(item => {
          item.type = item.remark === 1 ? '家' : '公司'
        })
      } catch (err) {
        console.log('获取收货地址列表报错', err)
      }
    },
    ...mapMutations({
      setContact: 'SET_CONTACT'
    })
  },
  mounted() {
    this.goodsId = this.$root.$mp.query.goodsId
    this._fetchAddressList()
  },
  onShow() {
    this._fetchAddressList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  background #f6f6f6
  height 100vh
  box-sizing border-box
  padding-bottom 120rpx
  .radio-group
    display flex
  .address-wrapper
    background #fff
    margin-bottom 20rpx
    .header
      padding 40rpx 30rpx 0 30rpx
      margin-bottom 25rpx
      .remark
        color #5575a8
        border 0.5rpx #5575a8 solid
        padding 3rpx 15rpx
        vertical-align top
        display inline-block
        border-radius 5rpx
        font-size 24rpx
    .content
      padding 0 30rpx 30rpx
    .bottom
      display flex
      justify-content space-between
      padding 20rpx 30rpx
      align-content center
      line-height 50rpx
      font-size 28rpx
      .right
        display flex
        width 200rpx
        flex 0 0 200rpx
        justify-content space-between
  .btn-wrapper
    position absolute
    height 120rpx
    right 30rpx
    left 30rpx
    bottom 20rpx
    .btn
      posY()
      width 100%
</style>
