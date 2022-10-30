<template>
  <div class="v-table-container">
    <table class="v-table">
      <thead>
        <tr>
          <th>CNPJ</th>
          <th>Legal name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="org in organisations"
          :key="org.organisationID"
          @click="openDetails(org)"
        >
          <td>{{ org.organisationCnpj }}</td>
          <td>{{ org.legalEntityName }}</td>
          <td>{{ capitalizeSentence(`${org.address} - ${org.city}`) }}</td>
        </tr>
      </tbody>
    </table>

    <button v-if="canShowMore" @click="$emit('showMore')">Show more</button>
    <button v-if="canShowLess" @click="$emit('showLess')">Show less</button>
  </div>
</template>

<script>
import { capitalizeSentence } from '@/utils/StringUtils.js'
import { mapMutations } from 'vuex'

export default {
  name: 'VTable',
  props: {
    organisations: {
      type: Array,
      required: true,
    },
    canShowMore: Boolean,
    canShowLess: Boolean,
  },
  data() {
    return {}
  },
  mounted() {
    this.updateDetailedOrganisation({})
  },
  methods: {
    capitalizeSentence,
    ...mapMutations(['updateDetailedOrganisation']),

    openDetails(org) {
      this.updateDetailedOrganisation(org)
      this.$router.push({ name: 'details' })
    },
  },
}
</script>

<style scoped></style>
