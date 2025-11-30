<template>
  <button
    :class="['formClearButton', { formClearButton_search: place === 'search' }]"
  >
    <IconClear class="clearIcon" />
  </button>
</template>

<script setup>
const { place } = defineProps(["place"]);
</script>

<style lang="scss" scoped>
.formClearButton {
  position: absolute;
  bottom: 8px;
  right: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;

  &_search {
    top: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
  }
}

.clearIcon {
  width: 18px;
  height: 18px;
  color: var(--text-color-sixthly);
  transition: 0.25s ease;
}
.formClearButton:hover .clearIcon {
  color: var(--text-color-primary);
}
</style>
