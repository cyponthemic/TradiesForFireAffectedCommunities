<template>
  <div>
    <div class="mb-3">
      {{ label }}
    </div>
    <VSelect :value="value" :options="items" @input="emit"></VSelect>
  </div>
</template>
<script>
import 'vue-select/dist/vue-select.css'
import VSelect from 'vue-select'

export default {
  components: { VSelect },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    emit(value) {
      this.$emit('input', value)
    }
  }
}
</script>
