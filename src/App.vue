<template>
  <router-view />
</template>

<script>
import { fetchFromSandbox } from "@/services/participants.service";

export default {
  name: "App",
  data: () => ({
    loading: false,
    data: [],
  }),
  async mounted() {
    this.$router.push("/dashboard");
  },
  methods: {
    async fetchDataAsync() {
      try {
        this.loading = true;
        const organisations = await fetchFromSandbox();
        this.data = organisations[0];
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
