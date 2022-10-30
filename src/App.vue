<template>
  <div class="app">
    <VMenu />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    VMenu: () => import('@/components/VMenu.vue'),
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
.app {
}
</style>
