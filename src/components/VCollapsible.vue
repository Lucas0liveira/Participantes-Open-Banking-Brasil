<template>
  <div class="v-collapsible"></div>
</template>

<script>
export default {
  name: 'VCollapsible',
  props: {},
  methods: {
    toggleCollapse() {
      this.$emit('toggle', this.code)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
</style>
