<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="dashboard">
    <h1>Welcome to the Dashboard</h1>

    <v-select
      v-model="selectedEndpoint"
      :options="endpoints"
      :clearable="false"
      @option:selected="(e) => fetchDataAsync(e)"
      @option:deselected="(e) => fetchDataAsync(e)"
    />
    <button @click="updateShowFilter(true)">Filter</button>

    <aside v-show="this.showFilter">
      <Filters @filter="filter()" />
    </aside>

    <div>
      <template v-for="role in getFilters.roles">
        <VChip
          :title="role"
          :code="role"
          @toggle="(e) => removeFromFilter(e, 'role')"
        />
      </template>
      <VChip
        v-if="getFilters.status"
        :title="getFilters.status"
        :code="getFilters.status"
        @toggle="(e) => removeFromFilter(e, 'status')"
      />
    </div>

    <VTable :organisations="displayedOrganisations" />

    <hr />

    <button v-if="!isMaximumAmount" @click="showMore()">Show more</button>
    <button v-if="!isMinimumAmount" @click="showLess()">Show less</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import {
  fetchFromSandbox,
  fetchFromProduction,
  fetchFromOPINBrasil,
} from '@/services/participants.service'
import { PAGE_SIZE, ENDPOINTS } from '@/constants.js'

export default {
  name: 'DashboardPage',
  components: {
    VTable: () => import('@/components/VTable.vue'),
    VChip: () => import('@/components/VChip.vue'),
    Filters: () => import('./Filters.vue'),
  },
  data: () => ({
    loading: false,
    rawData: [],
    filteredOrganisations: [],
    currentSlice: 0,
    endpoints: ENDPOINTS,
    selectedEndpoint: ENDPOINTS[0],
  }),
  computed: {
    ...mapState(['showFilter']),
    ...mapGetters(['getFilters']),
    displayedOrganisations() {
      return this.filteredOrganisations.slice(0, this.currentSlice)
    },
    isMinimumAmount() {
      return this.displayedOrganisations.length === PAGE_SIZE
    },
    isMaximumAmount() {
      return (
        this.displayedOrganisations.length === this.filteredOrganisations.length
      )
    },
  },

  async mounted() {
    await this.fetchDataAsync({})
  },
  methods: {
    ...mapMutations(['updateShowFilter']),
    ...mapActions(['removeRoleFilter', 'removeStatusFilter']),

    async fetchDataAsync(source) {
      this.loading = true
      let endpoint = null

      switch (source.code) {
        case 'production':
          endpoint = () => fetchFromProduction()
          break
        case 'op':
          endpoint = () => fetchFromOPINBrasil()
          break
        default:
          endpoint = () => fetchFromSandbox()
          break
      }

      if (source.code === 'sandbox') {
        endpoint = () => fetchFromSandbox()
      }
      try {
        const organisations = await endpoint()
        this.rawData = organisations
        this.filteredOrganisations = organisations
        this.showMore()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    filter() {
      this.currentSlice = PAGE_SIZE

      this.filteredOrganisations = this.rawData.filter((organisation) => {
        const filteredRoles =
          this.getFilters.roles.length > 0
            ? organisation.roles.find(({ role }) =>
                this.getFilters.roles.includes(role)
              )
            : true

        const filteredStatus =
          this.getFilters.status !== ''
            ? organisation.roles.find(
                ({ status }) => this.getFilters.status === status
              )
            : true

        return Boolean(filteredRoles && filteredStatus)
      })
    },

    removeFromFilter(value, type) {
      if (type === 'role') {
        this.removeRoleFilter(value)
      }
      if (type === 'status') {
        this.removeStatusFilter(value)
      }
      this.filter()
    },

    showMore() {
      this.currentSlice += PAGE_SIZE
    },

    showLess() {
      this.currentSlice -= PAGE_SIZE
    },
  },
}
</script>

<style scoped></style>