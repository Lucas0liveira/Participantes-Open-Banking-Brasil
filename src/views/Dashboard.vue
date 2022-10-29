<template>
  <div class="dashboard">
    <h1>Welcome to the Dashboard</h1>
    <div v-for="org in displayedOrganisations" :key="org.organisationId">
      {{ org.organisationId }}
    </div>
    <button v-if="!isMaximumAmount" @click="showMore()">Show more</button>
    <button v-if="!isMinimumAmount" @click="showLess()">Show less</button>
  </div>
</template>

<script>
import { fetchFromSandbox } from "@/services/participants.service";

const CHUNK_SIZE = 5;

export default {
  name: "DashboardPage",
  data: () => ({
    loading: false,
    data: [],
    displayedOrganisations: [],
    currentSlice: 0,
  }),
  computed: {
    isMinimumAmount() {
      return this.displayedOrganisations.length === CHUNK_SIZE;
    },
    isMaximumAmount() {
      return this.displayedOrganisations.length === this.data.length;
    },
  },

  async mounted() {
    await this.fetchDataAsync();
  },
  methods: {
    async fetchDataAsync() {
      try {
        this.loading = true;
        const organisations = await fetchFromSandbox();
        this.data = organisations;
        this.showMore();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    showMore() {
      this.displayedOrganisations = this.data.slice(
        0,
        this.currentSlice + CHUNK_SIZE
      );
      this.currentSlice += CHUNK_SIZE;
    },
    showLess() {
      this.currentSlice -= CHUNK_SIZE;
      this.displayedOrganisations = this.data.slice(0, this.currentSlice);
    },
  },
};
</script>

<style scoped></style>
