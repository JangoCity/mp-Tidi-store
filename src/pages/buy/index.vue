<template>
  <section class="container">
    <!-- 插入组件 user-info-->

    <!-- 支付方式 -->
    <section class="pay-way">
      <h5>请选择支付方式</h5>
      <section class="item">余额支付</section>
      <section class="item">微信支付</section>
    </section>

    <!-- 商品信息 -->
    <section class="order-wrapper">
      <section class="store-info">
        <p class="title">麒林便利店</p>
        <p class="address">深圳市宝安区西乡汇一城商铺</p>
      </section>
      <!-- 商品相关信息 -->
      <section class="goods-total">
        <section class="img-wrapper">
          <!-- <img src="" alt=""> -->
        </section>
        <section class="text-wrapper">
          <p class="title">【仅限深圳同城地区】新鲜水果上市 大荔冬枣 5斤/箱 枣香枣脆 等你</p>
          <p class="price"></p>
        </section>
      </section>
      <!-- 购买数量 -->
      <section>
        <span>购买数量</span>
        <span>
          <counter></counter>
        </span>
      </section>

      <!-- 提示信息 组件-->

    </section>

  </section>
</template>

<script type='text/ecmascript-6'>
import counter from '@/components/counter'
export default {
  components: {
    counter
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
