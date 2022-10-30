<template>
  <div class="v-navbar">
    <button @click="toggleMenu()">open</button>
    <v-select
      v-model="selectedEndpoint"
      :options="endpoints"
      :clearable="false"
      @option:selected="(e) => fetch(e)"
      @option:deselected="(e) => fetch(e)"
    />
    <v-select
      v-model="currentLang"
      :clearable="false"
      :options="[
        { label: 'English', code: 'en' },
        { label: 'Português brasileiro', code: 'ptbr' },
      ]"
      @option:selected="(e) => changeLocale(e.code)"
    />
    <VMenu />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { ENDPOINTS } from '@/constants.js'

export default {
  name: 'VNavbar',
  components: {
    VMenu: () => import('@/components/VMenu.vue'),
  },
  data() {
    return {
      endpoints: ENDPOINTS,
      selectedEndpoint: ENDPOINTS[0],
      currentLang: {
        label: 'English',
        code: 'en',
      },
    }
  },
  computed: {
    ...mapState(['showMenu']),
  },
  methods: {
    ...mapMutations(['updateShowMenu']),

    fetch(source) {
      this.$root.$emit('fetch', source)
    },

    toggleMenu() {
      this.updateShowMenu(!this.showMenu)
    },

    changeLocale(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>

<style scoped></style>
