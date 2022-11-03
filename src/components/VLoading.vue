<template>
  <div class="v-loading">
    <p class="v-loading__text">{{ $t('loading') }}</p>
    <div class="v-loading__icon">
      <fa-icon icon="spinner" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VLoading',
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';

.v-loading {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $background;
  z-index: 5;
  opacity: 0.9;

  &__text {
    font-size: 28px;
    font-weight: 900;
    color: $primary-color;
  }

  &__icon {
    max-height: 28px;
    max-width: 28px;
    animation: spin 1s linear infinite;

    svg {
      height: 100%;
      width: 100%;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
