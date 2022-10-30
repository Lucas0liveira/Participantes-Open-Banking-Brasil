<template>
  <div class="v-chip">
    <p>{{ title }}</p>
    <div @click="toggleChip()">X</div>
  </div>
</template>

<script>
export default {
  name: 'VChip',
  props: {
    title: String,
    code: [Number, String],
  },
  methods: {
    toggleChip() {
      this.$emit('toggle', this.code)
    },
  },
}
</script>

<style scoped></style>
