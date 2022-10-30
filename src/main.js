import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import VueApexCharts from 'vue-apexcharts'

import VSelect from 'vue-select'

new Vue({
  store,
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app')

Vue.use(VueApexCharts)
Vue.component('v-select', VSelect)
Vue.component('v-apexchart', VueApexCharts)
