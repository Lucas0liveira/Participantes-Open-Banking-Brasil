import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import ptbr from './locales/ptbr.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ptbr',
  fallbackLocale: 'en',
  messages: {
    en: en,
    ptbr: ptbr,
  },
})

export default i18n
