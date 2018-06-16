<template>
  <section class="container">
    <p>您是第
      <span>{{rank}}</span>位购买用户，支付后可返现
      <span>{{sale}}</span>
    </p>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    rank: Number,
    sale: Number
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
