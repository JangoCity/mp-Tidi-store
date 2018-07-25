import { showSuccess, showNormal } from '@/utils'
import { ERR_OK } from '@/utils/config'
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
      let params = {
        id: '1',
        uid: 2,
        contact_id: '2',
        pay_method: this.payment,
        price: this.total,
        message: this.message,
        number: this.count
      }
      console.log('支付模式==', this.payment)
      console.log('用户留言==', this.message)
      console.log('总价==', this.total)
      console.log('购买数量==', this.count)
      // 获取订单Id
      const getOrderId = await fly.post('postBuy', params)

      try {
        console.log('getOrderId===', getOrderId)
        const id = getOrderId.data.order_id
        if (!id) return
        // 然后处理支付接口
        params = { id, uid: 2 }
        const payInfo = await fly.post('pay', params)
        console.log('payinfo===', payInfo)
        let { paySign, signType, timeStamp } = payInfo.data
        const getPackage = payInfo.package // 'package' es关键字
        const nonceStr = payInfo.nonce_str // 'nonce_str' 非驼峰
        timeStamp = timeStamp + '' // 'timeStamp' 必须是string格式

        console.log(paySign, signType, timeStamp)
        const success = (msg) => {
          showSuccess(msg)
        }
        const fail = (er) => {
          showNormal(er)
        }
        wx.requestPayment({
          nonceStr,
          package: getPackage,
          paySign,
          signType,
          timeStamp,
          success,
          fail
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
        success: async (ev) => {
          if (ev.confirm) {
            const params = { id: this.orderId, uid: 1 }
            const res = await fly.get('orderDelete', params)
            try {
              res.code === ERR_OK && showSuccess(res.message)
              wx.navigateBack()
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
        phoneNumber: this.phoneNumber
      })
    },
    // 在线客服
    handleServerClick() {
      console.log('客服')
    }
  }
}
