<script type='text/ecmascript-6'>
import { showModal } from '@/utils'
import fly from '@/utils/fly'
export default {
  async created() {
  },
  data() {

  },
  onLaunch() {
    // 授权
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log('code=====', res.code)
          // const params = { code: res.code }
          // let data = fly.get('auth', params)
          // console.log(data)
        } else {
          showModal({
            title: '获取用户登录态失败！',
            content: res.errMsg
          })
        }
      }
    })
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
</style>
