<template>
  <button class="v-button" :class="type" @click="$emit('click')">
    <fa-icon v-if="icon" :icon="icon" />
    <p v-if="!iconOnly">{{ title }}</p>
  </button>
</template>

<script>
export default {
  name: 'VChip',
  props: {
    title: String,
    icon: String,
    iconOnly: Boolean,
    type: {
      type: String,
      validator: (value) =>
        ['primary', 'secondary', 'tertiary'].includes(value),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.v-button {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 4px;
  cursor: pointer;

  padding: 1rem;
  background-color: $primary-color;

  font-family: 'Lato';
  font-weight: 800;
  font-size: 16px;
  color: #ffffff;

  &:active,
  &:hover {
    background-color: $primary-dark-color;
  }
}

.primary {
  background-color: $primary-color;
  color: #ffffff;
}

.secondary {
  border: 2px solid $primary-color;
  background-color: transparent;
  color: $primary-color;

  &:active,
  &:hover {
    border: 2px solid $primary-dark-color;
    color: $primary-dark-color;
    background-color: transparent;
  }
}

.tertiary {
  background-color: $primary-color;
  color: #ffffff;
}
</style>
