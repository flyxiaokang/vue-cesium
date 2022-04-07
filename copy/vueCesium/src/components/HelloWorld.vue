<template>
  <div class="hello">
    <div class="map" id="esriView"></div>
    <div class="map" id="cesiumView">
      <cesium-map></cesium-map>
    </div>
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

    methods: {
      initEsri() {
        esriLoader.loadModules(["esri/Map", "esri/views/MapView"], {
          url: 'https://js.arcgis.com/4.19/'
        }).then(([Map, MapView]) => {
          const map = new Map({
            basemap: "topo-vector"
          });
          const view = new MapView({
            container: "esriView",
            map: map,
            zoom: 4,
            center: [15, 65] // longitude, latitude
          });
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
</style>