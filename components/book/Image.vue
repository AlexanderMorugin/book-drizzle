<template>
  <div :class="['bookImage', { bookImage_home: place === 'home' }]">
    <BookEmptyImage v-if="!image" title="Книга без обложки" place="home" />
    <img v-else :src="image" :alt="title" class="bookImage__picture" />
  </div>
</template>

<script setup>
const { place, image, title } = defineProps(["place", "image", "title"]);
</script>

<style lang="scss" scoped>
.bookImage {
  overflow: hidden;

  &_home {
    width: 100%;
    max-width: 160px;
    height: 140px;
    border-radius: var(--border-radius-m);
    box-shadow: var(--shadow-thirdly);
  }

  &__picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
