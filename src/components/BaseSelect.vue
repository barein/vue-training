<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="(option, index) in options"
        :value="option"
        :key="index"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: [String],
    value: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      console.log(event.target.value);
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped></style>
