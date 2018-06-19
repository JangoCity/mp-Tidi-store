<template>
  <section class='container'>
    <navigator url="url" hover-class="navigator-hover">
      {{title}}</navigator>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    url: String,
    title: String
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
