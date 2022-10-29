<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  mounted() {
    this.$router.push("/dashboard");
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
