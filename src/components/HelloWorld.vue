<!--
 * @Description: 
 * @Version: 
 * @Author: kangjinrui
 * @Date: 2021-05-18 11:32:44
 * @LastEditors: kangjinrui
 * @LastEditTime: 2022-03-30 14:20:56
-->
<template>
  <div class="hello">
    <!-- <div class="map" id="cesiumView">
      <cesium-map @ready="handleLoad"></cesium-map>
    </div> -->
    <div id="esriView"></div>
  </div>
</template>

<script>
  import * as esriLoader from 'esri-loader'
  import cesiumMap from './CesiumMap'
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    components: {
      cesiumMap
    },

    mounted() {
      this.initEsri()
    },

    beforeDestroy() {
      // document.getElementsByTagName("script").forEach(element => {
      //   console.log(element, element.getAttribute('src'))
      //   if (element.getAttribute('src').indexOf('https://js.arcgis.com') !== -1){
      //     element.parentNode.removeChild(element);
      //   }
      // });
      // var scr = document.getElementsByTagName("script")[0];
      // scr.parentNode.removeChild(scr);
    },

    methods: {
      handleLoad() {
        this.initEsri2()
      },
      initEsri2() {
        esriLoader.loadModules(["esri/Map", "esri/Basemap", "esri/views/MapView", "esri/layers/WebTileLayer_wgs84",
          "esri/layers/WebTileLayer_cgcs2000"
        ], {
          url: 'http://localhost/arcgis_js_api_v418/library/4.18/init.js'
        }).then(([Map, Basemap, MapView, WebTileLayer_wgs84, WebTileLayer_cgcs2000]) => {
          let image_layer = new WebTileLayer_wgs84({
            urlTemplate: 'http://10.1.58.41:8090/iserver/services/dem30m/wmts100?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=dem30m&STYLE=default&TILEMATRIXSET=Custom_dem30m&FORMAT=image/png&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}',
          })
          // let customBasemap = new Basemap({
          //   baseLayers: [image_layer],
          //   id: "myBasemap"
          // })

          const map = new Map({
            // basemap: "topo-vector"
          });

          // let map = new Map({
          //   basemap: customBasemap
          // });

          const view = new MapView({
            spatialReference: {
              wkid: 4326
            },
            container: "esriView",
            map: map,
            zoom: 2,
            center: [121, 22] // longitude, latitude
          });

          map.add(image_layer)

          view.on("click", e => {
            console.log(e)
          })

        })
      },
      initEsri() {
        esriLoader.loadModules(["esri/Map", "esri/Basemap", "esri/views/MapView", "esri/layers/WebTileLayer",
          "esri/layers/WebTileLayer_wgs84","esri/layers/WebTileLayer_cgcs2000", "esri/layers/support/TileInfo"
        ], {
          url: 'http://localhost/arcgis_js_api_v418/library/4.18/init.js'
        }).then(([Map, Basemap, MapView, WebTileLayer, WebTileLayer_wgs84, WebTileLayer_cgcs2000, TileInfo]) => {
          let url =
            'http://10.1.58.41:8090/iserver/services/dem30m/wmts100?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=dem30m&STYLE=default&TILEMATRIXSET=Custom_dem30m&FORMAT=image/png&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}'
          var tileInfo = new TileInfo({
            dpi: 90.71428571427429, //解析度，即像素
            origin: {
              x: -180,
              y: 90
            },
            spatialReference: {
              wkid: 4326
            },
            lods: [ //定义平铺方案的细节级别数组
              {
                level: 0,
                levelValue: 0,
                resolution: 0.7031249999990244,
                scale: 2.7954113201397103E8
              },
              {
                level: 1,
                levelValue: 1,
                resolution: 0.35156250000003214,
                scale: 1.397705660071922E8
              },
              {
                level: 2,
                levelValue: 2,
                resolution: 0.17578125000001607,
                scale: 6.98852830035961E7
              },
              {
                level: 3,
                levelValue: 3,
                resolution: 0.08789062500000804,
                scale: 3.494264150179805E7
              },
              {
                level: 4,
                levelValue: 4,
                resolution: 0.04394531250000402,
                scale: 1.7471320750899024E7
              },
              {
                level: 5,
                levelValue: 5,
                resolution: 0.02197265624999998,
                scale: 8735660.375448706
              }
            ]
          })
          var tiledLayer = new WebTileLayer({
            urlTemplate: url,
            tileInfo: tileInfo,
            spatialReference:{
              wkid:4326
            }
          });
     
          var map = new Map({
          });
          var view = new MapView({
            container: "esriView",
            spatialReference: {
              wkid: 4326
            },
            map: map,
            scale: 20000000,
            center: [101, 35]
          });

          map.add(tiledLayer)

          view.on('click',e=>{
            console.log(e)
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .hello {
    display: flex;
    width: 100%;
    height: 80vh;
  }

  .map {
    width: 50%;
    height: 100%;
  }

  #esriView {
    width: 100%;
    height: 100%;
  }
</style>