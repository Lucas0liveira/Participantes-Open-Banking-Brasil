<template>
  <div>
    <div v-for="org in organisations" :key="org.organisationId">
      {{ org.legalEntityName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'VTable',
  props: {
    organisations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped></style>
