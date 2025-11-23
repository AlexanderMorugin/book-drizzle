<template>
  <section class="bookEditBlock">
    <BookEditRatingCard :currentBook="currentBook" :bookId="bookId" />
    <BookEditCommentCard :bookId="bookId" />
    <BookEditProgressCard :bookId="bookId" />
  </section>
</template>

<script setup>
const { currentBook, bookId } = defineProps(["currentBook", "bookId"]);
</script>

<style lang="scss" scoped>
.bookEditBlock {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}
</style>
