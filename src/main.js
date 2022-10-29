import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import VSelect from 'vue-select'

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')

Vue.component('v-select', VSelect)
