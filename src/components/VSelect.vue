<template>
  <div>
    <p>{{ label }}</p>
    <v-select
      id="v-select"
      v-model="selectedValue"
      label="label"
      :searchable="false"
      :options="options"
      width="300px"
      :clearable="clearable"
      @option:selected="(e) => $emit('selected', e)"
      @option:deselected="(e) => $emit('deselected', e)"
    />
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'

export default {
  name: 'VSideBar',
  model: {
    props: 'selected',
    event: 'selected',
  },
  props: {
    selected: Object,
    options: Array,
    clearable: Boolean,
    label: String,
  },
  computed: {
    selectedValue: {
      get() {
        return this.selected
      },
      set(value) {
        this.$emit('selected', value)
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
#v-select {
  .v-select {
    border-radius: 0;
  }
}
</style>
