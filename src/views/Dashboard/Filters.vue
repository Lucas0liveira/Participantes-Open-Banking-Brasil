<template>
  <VSideBar>
    <template v-slot:body>
      <v-select
        v-model="activeRoles"
        multiple
        :options="rolesOptions"
        @option:selecting="(e) => toggleRoleToFilter(e.code)"
        @option:deselecting="(e) => toggleRoleToFilter(e.code)"
      />

      <v-select
        v-model="selectedStatus"
        :options="statusOptions"
        @option:selecting="(e) => updateStatus(e.code)"
      />
    </template>

    <template v-slot:actions>
      <hr />
      <button @click="filter()">Filter</button>
      <button @click="clearFilters()">Clear</button>
      <hr />
    </template>
  </VSideBar>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { ROLE_OPTIONS, STATUS_OPTIONS } from '@/constants.js'

export default {
  name: 'DashBoardFilters',
  components: {
    VSideBar: () => import('@/components/VSideBar.vue'),
  },
  data() {
    return {
      rolesOptions: ROLE_OPTIONS,
      statusOptions: STATUS_OPTIONS,
      activeRoles: [],
      selectedStatus: '',
    }
  },
  computed: {
    ...mapGetters(['getFilters']),
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

<style scoped></style>
