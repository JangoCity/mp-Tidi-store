import { showSuccess, showFail } from '@/utils'
import fly from '@/utils/fly'

//  页面公共
export const share = {
  onShareAppMessage(res) {
    let target = res.from
    console.log(target) // 触发对象 'menu'或者'button'
    return {
      title: '梯递食堂',
      path: '/page/index/main'
    }
  }
}

// 支付或购买
export const pay = {
  methods: {
    // 点击支付
    async handlePayClick() {
      const params = { id: '1', uid: 2, contact_id: '2', pay_method: 2, price: '0.01', message: '', number: 1 }
      // 获取
      const getOrderId = await fly.post('postBuy', params)
      try {
        const id = getOrderId.order_id
        if (!id) return
        const payInfo = await fly.post('pay', { id, uid: 2 })
        let { paySign, signType, timeStamp } = payInfo
        const getPackage = payInfo.package // 'package' es关键字
        const nonceStr = payInfo.nonce_str // 'nonce_str' 非驼峰
        timeStamp = timeStamp + '' // 'timeStamp' 必须是string格式

        console.log(paySign, signType, timeStamp)
        const success = () => {
          console.log('支付成功')
        }
        wx.requestPayment({
          nonceStr,
          package: getPackage,
          paySign,
          signType,
          timeStamp,
          success
        })
      } catch (err) {
        console.log('支付报错=====', err)
      }
      showSuccess('支付订单')
    },
    // 点击去购买
    handleToBuyClick() {
      const url = `../buy/main?id=${this.orderId}`
      wx.navigateTo({ url })
    }
  }
}

// 取消订单
export const cancel = {
  methods: {
    handleCancelOrderClick() {
      wx.showModal({
        title: '提示',
        content: '确定取消该订单吗？',
        cancelText: '我再想想',
        success: async (res) => {
          if (res.confirm) {
            const params = { id: this.orderId, uid: 1 }
            const data = await fly.get('orderDelete', params)
            try {
              showSuccess(data[0])
              wx.navigateBack()
            } catch (err) {
              showFail(err)
            }
          } else if (res.cancel) {
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
        phoneNumber: this.phoneNumber
      })
    },
    // 在线客服
    handleServerClick() {
      console.log('客服')
    }
  }
}
