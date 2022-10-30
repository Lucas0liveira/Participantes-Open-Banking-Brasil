import Vue from 'vue'
import VueRouter from 'vue-router'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      alias: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue'),
    },
    {
      path: '/dashboard/details',
      name: 'details',
      component: () => import('@/views/Dashboard/Details.vue'),
    },
    {
      path: '/charts',
      name: 'charts',
      component: () => import('@/views/Charts.vue'),
    },
  ],
  mode: 'history',
})

Vue.use(VueRouter)

export default router
