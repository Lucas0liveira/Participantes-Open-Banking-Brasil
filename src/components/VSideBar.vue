<template>
  <aside
    class="v-sidebar"
    :class="`${from} ${background}`"
    :style="smallScreenAndDown && open ? 'width: 100%' : `width: ${width}`"
  >
    <div class="v-sidebar__header">
      <slot name="header"></slot>
    </div>

    <div class="v-sidebar__body">
      <slot name="body"></slot>
    </div>

    <div class="v-sidebar__actionsS">
      <slot name="actions"></slot>
    </div>

    <div class="v-sidebar__footer">
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<script>
import mediaQueryMixin from '@/mixins/mediaQuery.mixin'

export default {
  name: 'VSideBar',
  mixins: [mediaQueryMixin],
  props: {
    open: Boolean,
    from: String,
    width: String,
    background: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.v-sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 1rem;

  position: fixed;
  top: 0;

  transition: all 0.3s ease-out;
  padding: 1rem;
  z-index: 2;

  &__footer {
    margin-top: auto;
  }
}

.right {
  right: 0;
}

.left {
  left: 0;
}

.primary {
  background-color: $primary-color;
}

.secondary {
  background-color: $secondary-color;
}
</style>
