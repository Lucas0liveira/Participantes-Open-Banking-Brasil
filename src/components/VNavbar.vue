<template>
  <div class="v-navbar">
    <button>open</button>
    <v-select
      v-model="currentLang"
      :clearable="false"
      :options="[
        { label: 'English', code: 'en' },
        { label: 'Português brasileiro', code: 'ptbr' },
      ]"
      @option:selected="(e) => changeLocale(e.code)"
    />
  </div>
</template>

<script>
export default {
  name: 'VNavbar',
  data() {
    return {
      currentLang: {
        label: 'English',
        code: 'en',
      },
    }
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>

<style scoped></style>
