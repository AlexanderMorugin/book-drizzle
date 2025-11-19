<template>
  <div class="formTitle">
    <h1 class="formTitle__title">{{ title }}</h1>
    <p class="formTitle__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
const { title, subtitle } = defineProps(["title", "subtitle"]);
</script>

<style lang="scss" scoped>
.formTitle {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 23px;
    line-height: 32px;
    color: var(--text-color-primary);
  }

  &__subtitle {
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-color-secondary);
  }

  @media (max-width: 1023px) {
    padding-top: 24px;
  }
}
</style>
