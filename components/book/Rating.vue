<template>
  <div class="bookRating">
    <IconStar class="starIcon" />
    <span class="bookRating__text">{{ rating }}</span>
  </div>
</template>

<script setup>
const { rating } = defineProps(["rating"]);
</script>

<style lang="scss" scoped>
.bookRating {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 8px;

  &__text {
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-secondary);
  }
}

.starIcon {
  width: 12px;
  height: 12px;
  fill: var(--yellow-primary);
  color: var(--yellow-primary);
}
</style>
