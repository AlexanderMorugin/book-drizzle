<template>
  <NuxtLink :to="`/library/${route}`" class="lastRatingPlate">
    <div class="lastRatingPlate__nameBlock">
      <div class="lastRatingPlate__circle" />
      <div>
        <div class="lastRatingPlate__name">{{ bookName }}</div>
        <div class="lastRatingPlate__text">{{ author }}</div>
        <div class="lastRatingPlate__line" />
        <div class="lastRatingPlate__text">
          {{ comment ? "Комментарий:" : "Без комментария" }}
        </div>
        <div
          v-if="comment"
          class="lastRatingPlate__text lastRatingPlate__text_comment"
        >
          {{ comment }}
        </div>
      </div>
    </div>

    <BookRating v-if="rating > 0" :rating="rating" />
  </NuxtLink>
</template>

<script setup>
const { bookName, author, rating, comment, route } = defineProps([
  "bookName",
  "author",
  "rating",
  "comment",
  "route",
]);
</script>

<style scoped>
.lastRatingPlate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: var(--border-radius-l);
  background: var(--gray-fifthly);
  box-shadow: var(--shadow-thirdly);
  backdrop-filter: blur(8px);
  padding: 16px;
  transition: 0.2s ease;
}
.lastRatingPlate:hover {
  background: var(--green-primary);
  box-shadow: var(--shadow-secondary);
}
.lastRatingPlate__nameBlock {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lastRatingPlate__circle {
  min-width: 8px;
  height: 8px;
  border-radius: var(--border-radius-full);
  background: var(--green-sixthly);
}
.lastRatingPlate__name {
  font-family: "Inter-Medium", sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: var(--text-color-primary);
}
.lastRatingPlate__text {
  font-family: "Inter-Regular", sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: var(--text-color-secondary);
}
.lastRatingPlate__text_comment {
  font-style: italic;
  font-size: 15px;
}

.lastRatingPlate__line {
  width: 100%;
  height: 1px;
  background: var(--gradient-form-login);
  margin-top: 10px;
  margin-bottom: 10px;
}

@media (max-width: 767px) {
  .lastRatingPlate {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
