<template>
  <div v-show="showMenu" class="v-menu">
    <div class="v-menu__navigation">
      <router-link to="/dashboard"> Dashboard </router-link>
      <router-link to="/charts"> Charts </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'VMenu',
  computed: {
    ...mapState(['showMenu']),
  },
}
</script>
<style></style>
