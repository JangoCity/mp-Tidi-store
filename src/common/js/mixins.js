import { getOpenId, showSuccess, showNormal } from '@/utils'
import { ERR_OK } from '@/utils/config'
import fly from '@/utils/fly'

//  页面分享
export const share = {
  onShareAppMessage(res) {
    let target = res.from
    console.log(target) // 触发对象 'menu'或者'button'
    return {
      title: '商品详情',
      path: '/page/goods-detail/main'
    }
  }
}

export const login = {
  methods: {
    // 检测用户微信版本
    handleCheckVersion() {
      if (!wx.canIUse('button.open-type.getUserInfo')) {
        showNormal('请升级微信版本')
      }
    },
    // 获取用户信息
    handleGetUserInfo(e) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) return
      // 首次登陆
      const detail = e.mp.detail
      if (detail.rawData) { // 用户按了允许授权按钮
        getOpenId(detail.userInfo, (userinfo) => {
          if (!userinfo) return
          this.userinfo = Object.assign({}, this.userinfo, userinfo)
          this.userBgImg = this.userinfo.avatarUrl
          wx.setStorageSync('userinfo', userinfo)
          this.isLogin = true
          // this._getInfo()
        })
      } else {
        console.log('用户按了拒绝按钮')
      }
    }
  }
}

// 支付或购买
export const pay = {
  methods: {
    // 点击支付
    async handlePayClick() {
      let params = {
        id: this.id,
        uid: this.uid,
        contact_id: this.contact_id,
        pay_method: this.payment, // 支付方式
        price: this.total, // 支付价格
        message: this.message, // 留言
        number: this.count // 购买个数
      }
      // 获取订单Id
      const getOrderId = await fly.post('postBuy', params)
      // 组合支付判断，余额大于或等于商品价格的情况

      try {
        const id = getOrderId.data.order_id
        if (!id) return
        // 然后处理支付接口
        params = { id, uid: this.uid }
        const payInfo = await fly.post('pay', params)
        console.log('payinfo===', payInfo)
        let { paySign, signType, timeStamp } = payInfo.data
        const getPackage = payInfo.data.package // 'package' es关键字
        const nonceStr = payInfo.data.nonce_str + '' // 'nonce_str' 非驼峰
        timeStamp = payInfo.data.timeStamp + '' // 'timeStamp' 必须是string格式

        console.log(nonceStr, paySign, signType, timeStamp, getPackage)
        wx.requestPayment({
          nonceStr,
          package: getPackage,
          paySign,
          signType,
          timeStamp,
          success: async () => {
            let url = `../order-detail/main?id=${id}&pay_status=1`
            this.message = ''
            wx.navigateTo({ url })
          },
          fail: async () => {
            let url = `../order-detail/main?id=${id}`
            wx.navigateTo({ url })
          }
        })
      } catch (err) {
        console.log('支付报错=====', err)
      }
      // showSuccess('支付订单')
    },
    // 立即支付
    async handlePayNowClick(id) {
      let params = { id, uid: this.uid }
      console.log('params===', params)
      const payInfo = await fly.post('pay', params)
      let { paySign, signType, timeStamp } = payInfo.data
      const getPackage = payInfo.data.package // 'package' es关键字
      const nonceStr = payInfo.data.nonce_str // 'nonce_str' 非驼峰
      timeStamp = payInfo.data.timeStamp + '' // 'timeStamp' 必须是string格式

      console.log(nonceStr, paySign, signType, timeStamp, getPackage)
      // const success = (msg) => {
      //   showSuccess(msg)
      // }
      // const fail = (er) => {
      //   showNormal(er)
      // }
      wx.requestPayment({
        nonceStr,
        package: getPackage,
        paySign,
        signType,
        timeStamp,
        success: async () => {
          let url = `../order-detail/main?id=${id}&pay_status=1`
          wx.navigateTo({ url })
        },

        fail: async () => {
          let url = `../order-detail/main?id=${id}`
          wx.navigateTo({ url })
        }
      })
      // showSuccess('支付订单')
    }
  }
}

// 取消订单
export const cancel = {
  methods: {
    handleCancelOrderClick(id) {
      wx.showModal({
        title: '提示',
        content: '确定取消该订单吗？',
        cancelText: '我再想想',
        success: async (ev) => {
          if (ev.confirm) {
            const params = { id, uid: this.uid }
            const res = await fly.get('orderDelete', params)
            try {
              res.code === ERR_OK && showSuccess(res.message)
              this._fetchOrderList()
            } catch (err) {
              showNormal(err)
            }
          } else if (ev.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    handleConfirmClick(id) {
      wx.showModal({
        title: '提示',
        content: '您确定收到货物了吗？',
        cancelText: '取消',
        success: async (ev) => {
          if (ev.confirm) {
            const params = { id, uid: this.uid }
            const res = await fly.get('orderSkip', params)
            try {
              res.code === ERR_OK && showSuccess(res.message)
              this._fetchOrderDetail(id)
            } catch (err) {
              showNormal(err)
            }
          } else if (ev.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}

// 呼叫服务
export const call = {
  methods: {
    // 电话服务
    handleCallClick() {
      wx.makePhoneCall({
        phoneNumber: this.shop_phone
      })
    },
    // 在线客服
    handleServerClick() {
      showNormal('暂未开通')
    }
  }
}
