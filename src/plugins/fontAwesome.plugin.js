import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFilter,
  faBars,
  faArrowLeft,
  faServer,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons'

library.add(faFilter, faBars, faArrowLeft, faServer, faChartSimple)

Vue.component('fa-icon', FontAwesomeIcon)
