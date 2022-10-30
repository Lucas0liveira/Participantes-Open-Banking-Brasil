<template>
  <div class="charts">
    <h1>Welcome to the Charts</h1>
    <v-apexchart
      width="500"
      type="donut"
      :options="bankPerRole.chartOptions"
      :series="bankPerRole.series"
    ></v-apexchart>

    <v-apexchart
      width="500"
      type="area"
      :options="serversPerResource.options"
      :series="serversPerResource.series"
    ></v-apexchart>

    <v-apexchart
      width="500"
      type="radialBar"
      :options="averageRolesPerServer.chartOptions"
      :series="averageRolesPerServer.series"
    ></v-apexchart>
  </div>
</template>

<script>
import {
  fetchFromSandbox,
  fetchFromProduction,
  fetchFromOPINBrasil,
} from '@/services/participants.service'
import { ROLE_OPTIONS, API_RESOURCE_OPTIONS } from '@/constants.js'

export default {
  name: 'ChartsPage',

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

    averageRolesPerServer() {
      const resourceAmounts = []

      this.data.forEach((org) => {
        org.authServers.forEach((server) => {
          let count = server.apiResources.length
          resourceAmounts.push(count)
        })
      })

      const average =
        resourceAmounts.reduce((prev, curr) => prev + curr, 0) /
        resourceAmounts.length

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

<style scoped></style>
