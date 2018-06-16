<template>
  <section class="container">
    <section class="balance-bar">
      <p>可用余额</p>
      <p>200,300.00</p>
    </section>
    <!-- 消费总计 -->
    <section class="total-info">
      <p class="date">2018-05</p>
      <p class="total">总计: <span>1311.00</span></p>
    </section>

    <!-- 消费情况 -->
    <section class="consume-list">
      <ul>
        <li class="item">
          <section class="goods-info">
            <span class="title">幸福的紫菜包饭下午茶</span>
            <span class="date">2018-05-08</span>
          </section>
          <section class="state-info">
            <span class="price">128</span>
            <span class="state">支付成功</span>
          </section>
        </li>
      </ul>
    </section>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
