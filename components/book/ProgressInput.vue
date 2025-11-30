<template>
  <div class="bookProgressInput">
    <input
      type="number"
      min="1"
      max="100"
      class="bookProgressInput__field"
      :value="value"
      @input="updateValue"
    />
    <span class="bookProgressInput__percent">%</span>

    <span class="bookProgressInput__error">{{ progressErrorMessage }}</span>
  </div>
</template>

<script setup>
const { value, progressErrorMessage } = defineProps([
  "value",
  "progressErrorMessage",
]);
const emit = defineEmits(["update:value"]);
const updateValue = (e) => emit("update:value", e.target.value);
</script>

<style lang="scss" scoped>
.bookProgressInput {
  display: flex;
  align-items: center;
  gap: 8px;

  &__field {
    width: fit-content;
    height: 36px;
    border-radius: var(--border-radius-s);
    background: var(--blue-thirdly);
    padding: 9px 13px;
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-eighthly);
    border: 1px solid transparent;

    &:focus {
      outline: 0;
      border: 1px solid transparent;
    }
  }

  &__percent {
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-eighthly);
  }

  &__error {
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--red-primary);
    padding-left: 50px;
  }
}
</style>
