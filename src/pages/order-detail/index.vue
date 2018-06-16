<template>
  <section class="container">
    <!-- 头部信息 -->
    <section class="header">
      <section class="state">
        <span>待付款</span>
      </section>
      <!-- 插入组件 user-info-->
    </section>

    <!-- 订单SDK -->
    <section class="content">
      <section class="order-desc">
        <section class="img-wrapper">
          <img src="" alt="">
        </section>
        <section class="text-wrapper">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 枣香枣脆 等你抢购</p>
          <p class="discounts">已有30人购买，可返现￥10</p>
          <p class="spec">
            <span class="total">规格:单</span>
            <span class="count">x1</span>
          </p>
        </section>
      </section>
      <section class="total-desc">
        实付：<span>104.00</span><span>（免运费）</span>
      </section>
      <section class="contact-desc">
        <span>联系客服</span>
        <span>拨打电话</span>
      </section>
    </section>

    <!-- 订单信息 -->
    <section>
      <ul>
        <li>订单编号:<span>245935245324535</span></li>
        <li>支付方式:<span>待支付</span></li>
        <li>支付时间:<span>2018-04-20 11:25:34</span></li>
        <li>下单时间:<span>2018-04-20 11:23:34</span></li>
      </ul>
    </section>

    <!-- 底部按钮 -->
    <section class="bottom">
      <button>取消订单</button>
      <button>去支付</button>
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
