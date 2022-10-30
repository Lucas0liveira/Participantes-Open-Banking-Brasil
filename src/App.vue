<template>
  <div class="app">
    <VNavbar />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    VNavbar: () => import('@/components/VNavbar.vue'),
  },

  mounted() {
    this.$router.push('/charts')
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
