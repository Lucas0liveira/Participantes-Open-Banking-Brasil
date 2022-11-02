<template>
  <div class="v-collapsible" :class="{ collapsed: !open }">
    <div class="v-collapsible__header" @click="toggleCollapse()">
      <slot name="header"></slot>
      <div>
        <fa-icon :icon="open ? 'chevron-up' : 'chevron-down'" />
      </div>
    </div>
    <div v-show="open" class="v-collapsible__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCollapsible',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggle')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.v-collapsible {
  border-radius: 4px;
}
.v-collapsible__header {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.v-collapsible__content {
  border-top: 1.6px solid $neutral-gray-color;
}

svg {
  color: $neutral-gray-color;
}
</style>
