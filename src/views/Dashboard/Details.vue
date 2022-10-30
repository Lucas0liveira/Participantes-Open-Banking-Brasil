<template>
  <div class="v-details">
    <h1>Welcome to the Details</h1>
    <h2>{{ getDetailedOrganisation.organisationCnpj }}</h2>
    <h3>{{ getDetailedOrganisation.legalEntityName }}</h3>
    <p>{{ getDetailedOrganisation.status }}</p>
    <p>
      {{
        getDetailedOrganisation.address +
        ' - ' +
        getDetailedOrganisation.address
      }}
    </p>
    <h2>Roles</h2>
    <div v-for="role in getDetailedOrganisation.roles" :key="role.id">
      // To-do change for collapsible
      <h5>{{ role.status }}</h5>
      <h6>{{ role.role }}</h6>
    </div>

    <h2>Servers</h2>
    <div
      v-for="server in getDetailedOrganisation.authServers"
      :key="server.authServerName"
    >
      <h5>{{ server.authServerName }}</h5>
      <h6>{{ server.authServerDescription }}</h6>

      <div v-for="resource in server.apiResources" :key="resource.familyType">
        <h5>{{ resource.familyType }}</h5>
        <h6>{{ resource.version }}</h6>
        <h6>Endpoints:</h6>
        <div
          v-for="endpoint in resource.endpoints"
          :key="endpoint.ApiDiscoveryId"
        >
          <a :href="endpoint.ApiEndpoint">{{ endpoint.ApiEndpoint }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DetailsPage',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getDetailedOrganisation']),
  },
  methods: {},
}
</script>

<style scoped></style>
