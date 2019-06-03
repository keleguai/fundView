// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import axios from 'axios'
import qs from 'qs'
import echarts from 'echarts'
import myapi from './myapi'
import store from './store'


// global.IP = "http://127.0.0.1:9090"
global.IP = "http://192.168.0.149:9090"

Vue.use(VueMaterial)
Vue.use(Vuex)
// vuex转换


// alert函数
Vue.prototype.$alert = {
  show: function (code, content) {
    store.commit("showDialog", {code: code, content: content})
  },
}

Vue.prototype.$setgoindex = function () {
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}
Vue.prototype.$loading = {
  show: function () {
    store.commit("show")
  },
  hide: function () {
    store.commit("hide")
  }
}
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts
Vue.prototype.$myapi = myapi
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
