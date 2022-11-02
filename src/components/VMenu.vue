<template>
  <VSidebar :open="showMenu" from="left" :width="showMenu ? '300px' : '64px'">
    <template v-slot:header>
      <div
        class="v-menu-header"
        :class="{ center: !showMenu }"
        @click="toggleMenu()"
      >
        <fa-icon :icon="showMenu ? 'arrow-left' : 'bars'" />
      </div>
    </template>

    <template v-slot:body>
      <div class="v-menu-body" :class="{ center: !showMenu }">
        <router-link
          to="/dashboard"
          class="v-menu-body__item"
          :class="{ center: !showMenu }"
        >
          <fa-icon icon="server" />
          <p v-show="showMenu">Dashboard</p>
        </router-link>

        <router-link
          to="/charts"
          class="v-menu-body__item"
          :class="{ center: !showMenu }"
        >
          <fa-icon icon="chart-simple" />
          <p v-show="showMenu">Charts</p>
        </router-link>
      </div>
    </template>

    <template v-slot:actions>
      <div class="v-menu-actions">
        <VSelect
          v-show="showMenu"
          label="API"
          :selected="selectedEndpoint"
          :options="endpoints"
          :clearable="false"
          @selected="(e) => fetch(e)"
          @deselected="(e) => fetch(e)"
        />
        <VSelect
          v-show="showMenu"
          label="Language"
          :selected="currentLang"
          :clearable="false"
          :options="[
            { label: 'English', code: 'en' },
            { label: 'Português brasileiro', code: 'ptbr' },
          ]"
          @selected="(e) => changeLocale(e.code)"
        />
      </div>
    </template>

    <template v-slot:footer>
      <p v-show="showMenu" class="inscription">
        Made with <3 by Lucas Freitas, 2022
      </p>
    </template>
  </VSidebar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { ENDPOINTS } from '@/constants.js'

export default {
  name: 'VMenu',

  components: {
    VSidebar: () => import('@/components/VSideBar.vue'),
    VSelect: () => import('@/components/VSelect.vue'),
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
      this.updateShowMenu(false)
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

<style lang="scss" scoped>
@import '@/assets/variables';

.v-menu-header {
  display: flex;
  align-content: center;
  justify-content: flex-end;
  height: 32px;

  svg {
    cursor: pointer;
    width: 32px;
    height: 32px;
    color: $light-text-color;
  }
}

.v-menu-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;

  &__item {
    display: flex;
    align-items: center;
    gap: 1rem;

    text-decoration: none;
    color: $light-text-color;
    font-size: 18px;
    font-weight: bold;
  }
}

.v-menu-actions {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
}

.inscription {
  font-size: 14px;
  text-align: center;
  font-weight: 300;
}

.center {
  justify-content: center;
}

.v-menu-header,
.v-menu-body,
.v-menu-actions {
  z-index: 3;
}
</style>
