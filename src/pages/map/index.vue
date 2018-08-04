<template>
  <div class="container">

    <section>
      <map id="map"
           show-location />

      <!-- <map id="map"
           show-location
           :longitude="userPos.longitude"
           :latitude="userPos.latitude"
           :markers="markers"
           :controls="controls"
           @tap="mapTap"
           @markertap="markertap"
           @controltap="controltap"
           @regionchange="regionchange"></map> -->
    </section>

    <button type="primary"
            @tap="getCenterLocation">获取位置</button>
    <button type="primary"
            @tap="moveToLocation">还原位置</button>
    <!-- <button type="primary"
            @tap="translateMarker">移动标注</button> -->
    <button type="primary"
            @tap="includePoints">缩放视野展示所有经纬度</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      mapCtx: null,
      markers: []
    }
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  methods: {
    // 获取中心位置
    getCenterLocation() {
      this.mapCtx.getCenterLocation({
        success: (res) => {
          console.log(res.longitude)
          console.log(res.latitude)
        }
      })
    },
    // 还原位置
    moveToLocation() {
      this.mapCtx.moveToLocation()
    },
    translateMarker: function () {
      this.mapCtx.translateMarker({
        markerId: 0,
        autoRotate: true,
        duration: 1000,
        destination: {
          latitude: 23.10229,
          longitude: 113.3345211
        },
        animationEnd() {
          console.log('animation end')
        }
      })
    },
    // 缩放视野展示所有经纬度
    includePoints() {
      this.mapCtx.includePoints({
        padding: [10],
        points: [{
          latitude: 23.10229,
          longitude: 113.3345211
        }, {
          latitude: 23.00229,
          longitude: 113.3345211
        }]
      })
    }
  }

}
</script>

<style scoped lang="stylus">
</style>
