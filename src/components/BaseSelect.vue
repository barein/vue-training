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
import { formFieldMixins } from "../mixins/formFieldMixin";

export default {
  mixins: [formFieldMixins],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
