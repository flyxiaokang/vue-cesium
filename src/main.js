import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import "cesium/Build/Cesium/Widgets/widgets.css";
import 'vue-cesium/lib/vc-navigation.css'
import 'vue-cesium/lib/vc-map-overview.css'
import 'vue-cesium/lib/style.css'

window.CESIUM_BASE_URL = 'http://localhost:8080/' + '/static/libs/Cesium/';
// window.CESIUM_BASE_URL = '/static/libs/Cesium/';

import VueCesium from 'vue-cesium'
Vue.use(VueCesium, {
  // cesiumPath 是指引用的Cesium.js路径，如
  // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
  // cesiumPath: /static/Cesium/Cesium.js
  // 个人在线Cesium Build包：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // 官方在线Cesium Build包，有CDN加速，推荐用这个：
  cesiumPath: window.CESIUM_BASE_URL + 'Cesium.js',
  // 指定Cesium.Ion.defaultAccessToken，使用Cesium ion的数据源需要到https://cesium.com/ion/申请一个账户，获取Access Token。不指定的话可能导致 Cesium 在线影像加载不了
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNGE5ZWRlNy05ODlmLTQ1ZDQtOTNhMi04NTdmMTg2MGI3ZjciLCJpZCI6MzMyMTEsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTgyNTMxMTF9.RE0D2QWqhu6tQftdxaFtKiTQ1u7AcB1kgncx7Tdxa78'
})

// Vue.use(VueCesium)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
