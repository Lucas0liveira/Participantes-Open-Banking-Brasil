<template>
  <div>
    <div class="mask" @click="$emit('close')" />
    <VSideBar
      :width="smallScreenAndDown ? '100%' : '400px'"
      from="right"
      background="secondary"
    >
      <template v-slot:header>
        <div class="v-filter-header">
          <p>Filters</p>
          <fa-icon icon="xmark" @click="$emit('close')" />
        </div>
        <hr />
      </template>

      <template v-slot:body>
        <div class="v-filter-body">
          <VSelect
            label="Roles"
            :selected="activeRoles"
            :options="rolesOptions"
            :multiple="true"
            @selecting="(e) => toggleRoleToFilter(e.code)"
            @deselected="(e) => toggleRoleToFilter(e)"
          />

          <VSelect
            label="Role Status"
            :selected="selectedStatus"
            :options="statusOptions"
            @selected="(e) => updateStatus(e.code)"
          />
        </div>
      </template>

      <template v-slot:footer>
        <div class="v-filter-footer">
          <VButton type="secondary" title="Clear" @click="clearFilters()" />
          <VButton title="Filter" @click="filter()" />
        </div>
      </template>
    </VSideBar>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import mediaQueryMixin from '../../mixins/mediaQuery.mixin'
import { ROLE_OPTIONS, STATUS_OPTIONS } from '@/constants.js'

export default {
  name: 'DashBoardFilters',

  mixins: [mediaQueryMixin],

  components: {
    VSideBar: () => import('@/components/VSideBar.vue'),
    VButton: () => import('@/components/VButton.vue'),
    VSelect: () => import('@/components/VSelect.vue'),
  },

  data() {
    return {
      rolesOptions: ROLE_OPTIONS,
      statusOptions: STATUS_OPTIONS,
    }
  },

  computed: {
    ...mapGetters(['getFilters']),

    selectedStatus: {
      get() {
        return this.statusOptions.find(
          (option) => option.code === this.getFilters.status
        )
      },
      set(value) {
        this.updateFilters({ roles: this.getFilters.roles, status: value })
      },
    },
    activeRoles() {
      return this.getFilters.roles
    },
  },

  methods: {
    ...mapMutations(['updateFilters', 'updateShowFilter']),
    ...mapActions(['resetFilters']),

    toggleRoleToFilter(role) {
      if (this.getFilters.roles.includes(role)) {
        const filteredRoles = this.getFilters.roles.filter((el) => el !== role)
        this.updateFilters({
          roles: filteredRoles,
          status: this.getFilters.status,
        })
      } else {
        this.getFilters.roles.push(role)
      }
    },

    updateStatus(status) {
      this.updateFilters({ roles: this.getFilters.roles, status })
    },

    filter() {
      this.$emit('filter')
      this.updateShowFilter(false)
    },

    clearFilters() {
      this.activeRoles = []
      this.selectedStatus = ''
      this.resetFilters()
      this.$emit('filter')
      this.updateShowFilter(false)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $dark-text-color;
  opacity: 0.2;
  cursor: pointer;
}
.v-filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  p {
    font-size: 18px;
    font-weight: 700;
    color: $dark-gray-color;
  }

  svg {
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: $neutral-gray-color;
  }
}

.v-filter-body {
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  gap: 2rem;
}
.v-filter-footer {
  display: flex;
  gap: 1rem;

  button {
    display: block !important;
    width: 100%;
  }
}
hr {
  margin: -1rem;
  border: none;
  border-bottom: 2px solid $background;
}
</style>
