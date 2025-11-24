<template>
  <section class="bookEditBlock">
    <BookEditRatingCard />
    <BookEditCommentCard />
    <BookEditProgressCard />
  </section>
</template>

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
