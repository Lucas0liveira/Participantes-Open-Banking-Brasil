<template>
  <div class="v-header">
    <p class="v-header__title">{{ title }}</p>
    <div class="v-header__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VPageHeader',
  props: {
    title: String,
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
.v-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 4rem;

  &__title {
    font-size: 28px;
    font-weight: 900;
    color: $primary-color;
  }
}
</style>
