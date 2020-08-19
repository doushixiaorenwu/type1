import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/base.css'
import './plugin/vant'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
