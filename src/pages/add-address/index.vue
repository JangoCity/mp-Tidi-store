<template>
  <section class="container">

    <section class="form-group">
      <!-- 地址类型 -->
      <radio-group class="radio-group border-bottom"
                   @change="handleChangeTypeClick">
        <label class="radio"
               v-for="(item, index) in createAddressType"
               :key="item.id">
          <radio :value="item.id"
                 :checked="item.id===addressType"
                 color="#e60012" />{{item.value}}
        </label>
      </radio-group>
      <section v-for="(item, key, index) in createAddressForm"
               :key="item.id"
               class="row  border-bottom">
        <span class="label">{{item.label}}</span>
        <p class="input-wrapper"
           v-if="key!=='address'">
          <input :placeholder="item.placehodleText"
                 :maxlength="item.maxlength"
                 v-model="item.value"
                 type="number"
                 class="input">
        </p>
        <picker mode="region"
                @change="handleRegionChangeClick"
                :value="region"
                v-else
                class="picker-wrapper">
          <view class="picker">
            {{region[0]}}{{region[1]}}{{region[2]}}
          </view>
        </picker>
      </section>
    </section>

    <section class="btn-wrapper">
      <button class="btn-confirm"
              hover-class="btn-confirm-hover"
              @click="handleConfirmClick">保存</button>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
import { showSuccess, showNormal } from '@/utils'
import { createAddressType, createAddressForm } from '@/common/js/staticData'
import fly from '@/utils/fly'

const REG = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

export default {
  components: {
  },
  data() {
    return {
      addressType: 1,
      createAddressType,
      createAddressForm,
      addressId: undefined,
      currentAddress: undefined,
      region: ['请选择地址']
    }
  },
  methods: {
    // 更改地址类型
    handleChangeTypeClick(ev) {
      const targetType = parseInt(ev.mp.detail.value, 10)
      this.addressType = targetType
    },
    // 更改城市地址
    handleRegionChangeClick(ev) {
      console.log('ev.mp.detail', ev.mp)
      this.region = ev.mp.detail.value
    },
    // 保存信息
    async handleConfirmClick() {
      const { name, phone, area, number } = createAddressForm
        const { uid } = wx.getStorageSync('userinfo')
      let params = {
        uid,
        name: name.value,
        phone: phone.value,
        province_id: this.region[0],
        city_id: this.region[1],
        area_id: this.region[2],
        district: area.value,
        address: number.value,
        remark: this.addressType
      }

      // 所有参数信息不得为空
      if (Object.values(params).some(item => !item)) {
        showNormal('请填写完整地址信息')
        return
      }
      console.log('phone.value', phone.value)
      // 验证手机号码
      if (!REG.test(phone.value)) {
        showNormal('请填写正确的手机号码')
        return
      }

      // 根据判断是否有地址ID来判断编辑或新增的请求逻辑
      if (this.addressId) {
        params = Object.assign({}, params, { id: this.addressId })
      }

      const res = this.addressId
        ? await fly.post('editPostContact', params)
        : await fly.post('createContact', params)
      const url = '../my-address/main'
      try {
        showSuccess(res.message)
        wx.navigateTo({ url })
      } catch (err) {
        console.log('保存地址报错', err)
      }
    },
    // 获取地址
    async _fetchAddressData() {
      if (!this.addressId) return
      const params = { uid: 1, id: this.addressId }
      const res = await fly.get('editContact', params)
      try {
        this.currentAddress = res.data.contact
        const { name, phone, province, city, area, district, address, remark } = this.currentAddress
        this.addressType = remark
        this.region = [province, city, area]
        createAddressType[this.addressType].checked = true

        createAddressForm.name.value = name
        createAddressForm.phone.value = phone
        createAddressForm.area.value = district
        createAddressForm.number.value = address
      } catch (err) {
        console.log('获取编辑地址报错', err)
      }
    }
  },
  mounted() {
    this._fetchAddressData(this.addressId)
  },
  beforeMount() {
    this.addressId = this.$root.$mp.query.id
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  position relative
  background #f6f6f6
  height 1206rpx
  .radio-group
    display flex
    padding 10rpx 20rpx
  .radio
    padding 5px
  .form-group
    padding 0 30rpx
    margin-bottom 40rpx
    background #fff
  .row
    position relative
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-content center
    padding 20rpx 0
    vertical-align top
    .label
      width 100rpx
      height 60rpx
      line-height 60rpx
    .input-wrapper, .input
      text-align right
      flex 1
      height 60rpx
      line-height 60rpx
    .picker
      display block
      height 60rpx
      line-height 60rpx
      color #666
  .btn-wrapper
    position absolute
    left 30rpx
    right 30rpx
    bottom 40rpx
</style>
