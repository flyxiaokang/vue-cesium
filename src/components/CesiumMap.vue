<template>
  <!-- <div class="map-div"> -->
  <!-- 地图 -->
  <div class="viewer" ref="viewerContainer">
    <vc-viewer ref="vcViewer" :animation="animation" :baseLayerPicker="baseLayerPicker" :timeline="timeline"
      :fullscreenButton="fullscreenButton" :fullscreenElement="fullscreenElement" :infoBox="infoBox" @ready="ready"
      :removeCesiumScript="false">
      <vc-navigation></vc-navigation>
      <vc-layer-imagery>
        <vc-provider-imagery-tianditu mapStyle="img_c" :token="tk"></vc-provider-imagery-tianditu>
      </vc-layer-imagery>
      <vc-layer-imagery ref="layerText">
        <vc-provider-imagery-tianditu mapStyle="cia_c" :token="tk"></vc-provider-imagery-tianditu>
      </vc-layer-imagery>

         <!-- <vc-measure-distance :clampToGround="clampToGround" ref="measureDistance" @activeEvt="activeEvt"
          @measureEvt="measureEvt" @movingEvt="movingEvt" :removeLastPosition="removeLastPosition">
        </vc-measure-distance>
        <vc-measure-area ref="measureArea" @activeEvt="activeEvt" @measureEvt="measureEvt" @movingEvt="movingEvt"
          :clampToGround="clampToGround" :removeLastPosition="removeLastPosition"></vc-measure-area>
        <vc-measure-height ref="measureHeight" @activeEvt="activeEvt" @measureEvt="measureEvt" @movingEvt="movingEvt">
        </vc-measure-height> -->


      <vc-measure-distance :clampToGround="clampToGround" ref="measureDistance" @activeEvt="activeEvt"
        @measureEvt="measureEvt" @movingEvt="movingEvt" :removeLastPosition="removeLastPosition"></vc-measure-distance>
    </vc-viewer>

    <div class="map_tools">
      <button @click="handleMeasure('measureDistance')">测量</button>
    </div>
  </div>
  <!-- 工具 -->
  <!-- </div> -->
</template>

<script>
  // import CesiumUtils from '@/assets/js/cesiumUtils'

  // import {
  //   getSingleLayerFromWMTS,
  //   getSingleLayerFromWMS
  // } from '../../utils/utils-ogc'


  export default {
    data() {
      return {
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        fullscreenButton: true,
        infoBox: true,
        fullscreenElement: document.body,
        tk: '436ce7e50d27eede2f2929307e6b33c0',

        curToolName: 0,


        distanceMeasuring: false,
        areaMeasuring: false,
        heightMeasuring: false,
        clampToGround: false,
        removeLastPosition: true
      }
    },
    components: {},
    mounted() {
      this.$refs.vcViewer.createPromise.then(({
        Cesium,
        viewer
      }) => {
        console.log('viewer is loaded.')
      })
    },
    beforeDestroy() {},
    methods: {
      ready(cesiumInstance) {
        const {
          Cesium,
          viewer
        } = cesiumInstance
        this.viewer = viewer
        viewer.scene.globe.depthTestAgainstTerrain = true
        viewer.scene.globe.enableLighting = true
        this.fullscreenElement = this.$refs.viewerContainer

        // this.$emit('ready')
        // viewer.entities.add({
        //   id: '成都欢迎你',
        //   position: Cesium.Cartesian3.fromDegrees(104.06, 30.67, 100),
        //   billboard: new Cesium.BillboardGraphics({
        //     image: 'https://zouyaoji.top/vue-cesium/favicon.png',
        //     scale: 0.1
        //   }),
        //   label: new Cesium.LabelGraphics({
        //     text: 'Hello Cesium',
        //     font: '24px sans-serif',
        //     horizontalOrigin: 1,
        //     outlineColor: new Cesium.Color(0, 0, 0, 1),
        //     outlineWidth: 2,
        //     pixelOffset: new Cesium.Cartesian2(17, -5),
        //     style: Cesium.LabelStyle.FILL
        //   })
        // })
      },

      activeEvt(_) {
        this[_.type] = _.isActive
      },
      measureEvt(result) {
        console.log(result)
      },
      movingEvt(position) {
        console.log(position)
      },
      handleMeasure(type) {
        console.log(type)
        this.$refs[type].measuring = !this.$refs[type].measuring
      },
    }
  }
</script>
<style scoped>
  .map-div {
    position: relative;
    width: 100%;
    text-align: center;
    background-color: white;
    background-size: 100% 100%;
  }

  .viewer {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: aliceblue;
  }

  .tool_bar_cesium {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .map_tools {
    z-index: 1999;
    position: absolute;
    top: 100px;
    right: 100px;
  }
</style>