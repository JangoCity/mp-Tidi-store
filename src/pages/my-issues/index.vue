<template>
  <section class="container">
    <section class="list-wrapper"
             v-if="issuesList.length">
      <ul>
        <li class="border-bottom item  iconfont"
            :class="{'icon-jiantouyou':showId!==item.id,'active':showId===item.id}"
            v-for="(item, index) in issuesList"
            :key="item.id"
            @click="handleShowAnswerClick(item.id)">
          <section class="item-issue iconfont"
                   :class="{'icon-jiantouyou':showId===item.id,'border-bottom':showId===item.id}">
            {{item.question}}
          </section>
          <section class="item-answer"
                   v-show="showId===item.id">
            {{item.answer}}
          </section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>

import fly from '@/utils/fly'
import { share } from '@/common/js/mixins'
export default {
  mixins: [share],
  components: {
  },
  data() {
    return {
      issuesList: [],
      showId: '',
      isActive: false
    }
  },
  computed: {
  },
  methods: {
    handleShowAnswerClick(id) {
      this.showId = id
      this.isActive = true
    },
    // 拉取信息
    async _getIssuesList() {

      try {
          const { uid } = wx.getStorageSync('userinfo')
          const params = { uid }
          const res = await fly.get('question', params)
        const data = res.data
        this.issuesList = data
      } catch (err) {
        console.log('获取常见问题报错====', err)
      }
    }
  },
  mounted() {
    this._getIssuesList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.container
  .list-wrapper
    padding 0 30rpx
    .item, .item-issue
      box-sizing border-box
      padding 10px 15px 10px 0
      &::before
        posY(10rpx, false)
        color #ccc
        font-size 24rpx
    .item.active
      .item-issue
        width 350px
    .item-answer
      padding 20px 0 40px
      color #999
</style>
