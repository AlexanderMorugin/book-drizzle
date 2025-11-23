<template>
  <div class="progressBarDetails">
    <div class="progressBarDetails__text">
      <span>Прогресс</span>
      <span>{{ progress }}%</span>
    </div>

    <ProgressBar :progress="progress" color="blue" />
  </div>
</template>

<script setup>
const { progress } = defineProps(["progress"]);
</script>

<style lang="scss" scoped>
.progressBarDetails {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  &__text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: "Inter-Regular", sans-serif;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-color-secondary);
  }
}
</style>
