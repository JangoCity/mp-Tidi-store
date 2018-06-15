<template>
  <div class="container">

  </div>
</template>

<script>

export default {
  data() {
    return {
      userInfo: {}
    }
  },

  components: {
  },

  methods: {
    bindViewTap() {
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },
  mounted() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
