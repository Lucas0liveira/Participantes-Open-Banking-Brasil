<template>
  <div class="charts">
    <div v-if="mediumScreenAndUp" class="charts-top">
      <VChart
        title="Distribution of roles by participants"
        type="donut"
        :options="bankPerRole.chartOptions"
        :series="bankPerRole.series"
      />

      <VChart
        title="Average number of resouces per server"
        type="radialBar"
        :options="averageResourcesPerServer.chartOptions"
        :series="averageResourcesPerServer.series"
      />
    </div>

    <VChart
      v-if="mediumScreenAndUp"
      title="Distribution of resources between banks"
      type="area"
      :options="serversPerResource.options"
      :series="serversPerResource.series"
    />

    <p v-else class="charts__alert">
      Charts are better visualized in a larger screen :(
    </p>
  </div>
</template>

<script>
import {
  fetchFromSandbox,
  fetchFromProduction,
  fetchFromOPINBrasil,
} from '@/services/participants.service'
import mediaQueryMixin from '@/mixins/mediaQuery.mixin'
import { ROLE_OPTIONS, API_RESOURCE_OPTIONS } from '@/constants.js'

export default {
  name: 'ChartsPage',

  mixins: [mediaQueryMixin],

  components: {
    VChart: () => import('@/components/VChart.vue'),
  },

  data: () => ({
    loading: false,
    data: [],
    roleOptions: ROLE_OPTIONS.map((role) => role.label),
    apiResourceOptions: API_RESOURCE_OPTIONS.map((role) => role.label),
  }),

  computed: {
    bankPerRole() {
      const banksAmount = this.roleOptions.map((roleOption) => {
        let count = 0

        this.data.forEach((org) => {
          if (org.roles.find(({ role }) => role === roleOption)) {
            count++
          }
        })
        return count
      })

      return {
        chartOptions: {
          labels: this.roleOptions,
        },
        series: banksAmount,
      }
    },

    serversPerResource() {
      const serversAmount = this.apiResourceOptions.map((apiResourceOption) => {
        let count = 0

        this.data.forEach((org) => {
          org.authServers.forEach((server) => {
            if (
              server.apiResources.find(
                (resource) => resource.familyType === apiResourceOption
              )
            ) {
              count++
            }
          })
        })
        return count
      })

      return {
        options: {
          chart: {
            id: 'bankPerRoleChart',
          },
          xaxis: {
            categories: this.apiResourceOptions,
            reversed: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
        },
        series: [
          {
            name: 'Banks',
            data: serversAmount,
          },
        ],
      }
    },

    averageResourcesPerServer() {
      const resourceAmounts = []

      this.data.forEach((org) => {
        org.authServers.forEach((server) => {
          let count = server.apiResources.length
          resourceAmounts.push(count)
        })
      })

      const average = (
        resourceAmounts.reduce((prev, curr) => prev + curr, 0) /
        resourceAmounts.length
      ).toFixed(2)

      const maxValue = 8
      const minValue = 0

      return {
        chartOptions: {
          plotOptions: {
            radialBar: {
              range: [0, 8],
              startAngle: -135,
              endAngle: 225,
              hollow: {
                size: '30%',
              },
              dataLabels: {
                value: {
                  formatter: () => average,
                },
              },
            },
          },
          labels: ['Resources'],
        },
        series: [((average - minValue) * 100) / (maxValue - minValue)],
      }
    },
  },

  async mounted() {
    await this.fetchDataAsync({})

    this.$root.$on('fetch', async (source) => this.fetchDataAsync(source))
  },

  methods: {
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
        this.data = await endpoint()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.charts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  width: 100%;
  max-width: 960px;

  &-top {
    display: flex;
    gap: 1rem;
    width: 100%;

    @media (max-width: 960px) {
      flex-direction: column;
    }
  }
}
</style>
