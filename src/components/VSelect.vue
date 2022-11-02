<template>
  <div>
    <p class="label">{{ label }}</p>
    <v-select
      id="v-select"
      v-model="selectedValue"
      label="label"
      :searchable="false"
      :options="options"
      width="300px"
      :clearable="clearable"
      :multiple="multiple"
      :placeholder="placeholder"
      @option:selected="(e) => $emit('selected', e)"
      @option:selecting="(e) => $emit('selecting', e)"
      @option:deselected="(e) => $emit('deselected', e)"
    />
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css'

export default {
  name: 'VCustomSelect',
  model: {
    props: 'selected',
    event: 'selected',
  },
  props: {
    selected: [Array, Object],
    options: Array,
    clearable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    label: String,
    placeholder: String,
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
@import '@/assets/variables';

.label {
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: $medium-gray-color;
  margin-bottom: 0.4rem;
}
#v-select {
  ::v-deep .vs__dropdown-toggle {
    border: 1.6px solid $neutral-gray-color !important;
  }
  ::v-deep .vs__selected {
    background-color: #fff !important;
    border: 2px solid $neutral-gray-color !important;
    font-weight: 600;
    color: $medium-gray-color;

    svg {
      fill: $error;
    }
  }
  .v-select {
    border-radius: 0;
  }
}
</style>
