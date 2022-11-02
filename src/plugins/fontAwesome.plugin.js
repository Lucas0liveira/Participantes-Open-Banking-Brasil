import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFilter,
  faBars,
  faArrowLeft,
  faServer,
  faChartSimple,
  faCircleCheck,
  faCircleXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faFilter,
  faBars,
  faArrowLeft,
  faServer,
  faChartSimple,
  faCircleCheck,
  faCircleXmark,
  faXmark
)

Vue.component('fa-icon', FontAwesomeIcon)
