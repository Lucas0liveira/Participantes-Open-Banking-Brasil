<template>
  <div class="app">
    <VMenu />
    <VLoading v-show="isLoading" />
    <div
      class="content"
      :class="{
        'closed-menu': !showMenu,
        'opened-menu': showMenu,
        'fullpage-menu': smallScreenAndDown,
      }"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mediaQueryMixin from './mixins/mediaQuery.mixin'

export default {
  name: 'App',

  mixins: [mediaQueryMixin],

  components: {
    VMenu: () => import('@/components/VMenu.vue'),
    VLoading: () => import('@/components/VLoading.vue'),
  },

  computed: {
    ...mapState(['showMenu', 'isLoading']),
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.closed-menu,
.fullpage-menu {
  margin-left: 60px;
}
.opened-menu {
  margin-left: 300px;
}
</style>
