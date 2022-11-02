<template>
  <div class="v-chip">
    <p>{{ title }}</p>
    <div @click="toggleChip()">
      <fa-icon icon="xmark" />
    </div>
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

<style lang="scss" scoped>
@import '@/assets/variables';
.v-chip {
  display: flex;
  gap: 0.2rem;
  padding: 0.2rem;
  border: 2px solid $primary-color;
  max-width: fit-content;
  border-radius: 6px;
  color: $primary-color;
  font-weight: 900;
  margin: 0 0.2rem;
  cursor: pointer;
}
</style>
