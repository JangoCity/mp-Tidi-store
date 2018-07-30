<template>
  <section class="container">
    <scroll-view scroll-y
                 scroll-top="scrollTop"
                 style="height:100%">
      <section v-for="(item, index) in addressList"
               class="address-wrapper"
               :key="item.id">
        <section class="header">
          {{item.name}} {{item.phone}}
          <span class="remark">{{item.type}}</span>
        </section>
        <section class="content border-bottom">
          {{item.address}}
        </section>
        <section class="bottom">
          <section class="left">
            <radio-group class="radio-group"
                         @change="handleDefaultAddressClick">
              <label class="radio">
                <radio :value="item.id"
                       :checked="item.id===defaultAddressId"
                       color="#e60012" />设为默认
              </label>
            </radio-group>
          </section>
          <section class="right">
            <section @click="handleEditClick(item.id)">
              <span class="iconfont icon--jiahao"></span>
              编辑
            </section>
            <section @click="handleDeleteClick(item.id)">
              <span class="iconfont icon--jiahao"></span>
              删除
            </section>
          </section>
        </section>
      </section>
    </scroll-view>
    <section class="btn-wrapper">
      <button class="btn-confirm"
              hover-class="btn-confirm-hover"
              @click="handleAddClick">
        <span class="iconfont icon--jiahao"></span>新增地址</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import fly from '@/utils/fly'
import { showSuccess, showNormal } from '@/utils'

export default {
  components: {
  },
  data() {
    return {
      addressList: [], // 地址列表
      defaultAddressId: undefined // 默认地址
    }
  },
  methods: {
    // 新增地址
    handleAddClick() {
      const url = '../add-address/main'
      wx.navigateTo({ url })
    },
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
        const params = { uid: 1, id }
        const res = await fly.get('deleteContact', params)
        try {
          showSuccess(res.message)
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
    async handleDefaultAddressClick(e) {
      const targetId = parseInt(e.mp.detail.value, 10)
      const params = { uid: 1, id: targetId }
      const res = await fly.get('setDefault', params)
      try {
        showSuccess(res.message)
        this.defaultAddressId = targetId
      } catch (err) {
        console.log('更改默认地址报错', err)
      }
    },
    // 获取收货地址列表
    async _fetchAddressList() {
      const params = { uid: 1 }
      const res = await fly.get('contact', params)
      try {
        const data = res.data
        this.addressList = data.contact
        this.defaultAddressId = this.addressList.filter(item => item.default === 1)[0].id
        this.addressList.forEach(item => {
          item.type = item.remark === 1 ? '家' : '公司'
        })
      } catch (err) {
        console.log('获取收货地址列表报错', err)
      }
    }
  },
  mounted() {
    this._fetchAddressList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  background #f6f6f6
  height 1206rpx
  box-sizing border-box
  padding-bottom 150rpx
  position relative
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
    right 30rpx
    left 30rpx
    bottom 20rpx
</style>
