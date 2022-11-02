<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="dashboard">
    <VPageHeader :title="$t('welcome')">
      <template v-slot:actions>
        <VButton
          title="Filter"
          icon="filter"
          :iconOnly="smallScreenAndDown"
          @click="updateShowFilter(true)"
        />
      </template>
    </VPageHeader>

    <aside v-show="this.showFilter">
      <Filters @filter="filter()" @close="updateShowFilter(false)" />
    </aside>

    <aside v-show="this.showDetails">
      <Details @close="updateShowDetails(false)" />
    </aside>

    <div class="dashboard__chips">
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

    <VTable
      :organisations="displayedOrganisations"
      :canShowMore="!isMaximumAmount"
      :canShowLess="!isMinimumAmount"
      @showMore="showMore()"
      @showLess="showLess()"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import {
  fetchFromSandbox,
  fetchFromProduction,
  fetchFromOPINBrasil,
} from '@/services/participants.service'
import mediaQueryMixin from '../../mixins/mediaQuery.mixin'
import { PAGE_SIZE } from '@/constants.js'

export default {
  name: 'DashboardPage',

  mixins: [mediaQueryMixin],

  components: {
    VTable: () => import('@/components/VTable.vue'),
    VButton: () => import('@/components/VButton.vue'),
    VPageHeader: () => import('@/components/VPageHeader.vue'),
    VChip: () => import('@/components/VChip.vue'),
    Filters: () => import('./Filters.vue'),
    Details: () => import('./Details.vue'),
  },
  data: () => ({
    loading: false,
    rawData: [],
    filteredOrganisations: [],
    currentSlice: 0,
  }),

  computed: {
    ...mapState(['showFilter', 'showDetails']),
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

    if (this.largeScreenAndUp) {
      this.updateShowMenu(true)
    }

    this.$root.$on('fetch', async (source) => this.fetchDataAsync(source))
  },

  methods: {
    ...mapMutations([
      'updateShowFilter',
      'updateShowMenu',
      'updateShowDetails',
    ]),
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

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  max-width: 960px;
  &__chips {
    display: flex;
    margin-bottom: 2rem;
  }
}
</style>
