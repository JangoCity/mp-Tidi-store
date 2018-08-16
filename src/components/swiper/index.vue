<template>
  <section class="container">
    <swiper
    :autoplay="autoplay"
    :circular="circular"
    :indicatorDots="indicatorDots"
    :indicator-color="indicatorColor"
    :indicator-active-color="indicatorActiveColor"
    >
      <section v-for="(item,index) in list" :key="item.id">
        <swiper-item>
          <image :src="item.url" mode="aspectFill" class="slide-image" style="width:100%" />
        </swiper-item>
      </section>
    </swiper>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    list: Object,
    autoplay: { // 是否自动切换
      type: Boolean,
      default: false
    },
    indicatorDots: { // 是否显示面板指示点
      type: Boolean,
      default: true
    },
    interval: { // 自动切换时间间隔
      type: Number,
      default: 5000
    },
    circular: { // 是否采用衔接滑动
      type: Boolean,
      default: true
    },
    indicatorColor: {
      type: String,
      default: '#fff'
    },
    indicatorActiveColor: {
      type: String,
      default: '#c00'
    }
  },
  data() {
    return {
      duration: 1000 // 滑动动画时长
    }
  }
}
</script>

