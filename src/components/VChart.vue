<template>
  <div class="chart">
    <p class="chart__title">{{ title }}</p>
    <v-apexchart
      v-if="!smallScreenAndDown"
      width="100%"
      :type="type"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: 'VChart',

  props: {
    title: String,
    type: String,
    options: [Object, Array],
    series: [Object, Array],
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
.chart {
  background-color: #fff;
  border-radius: 4px;
  padding: 1rem;
  height: 100%;
  width: 100%;

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: $neutral-text-color;
    margin-bottom: 1rem;
  }
}
</style>
