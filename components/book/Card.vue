<template>
  <div class="bookCard">
    <BookEmptyImage title="Книга без обложки" />
    <!-- <img v-else :src="book.image" :alt="book.title" class="bookCard__image" /> -->
    <span class="bookCard__title">{{ book.name }}</span>
    <span class="bookCard__author">{{ book.author }}</span>
    <span class="bookCard__genre">Художественная литература</span>
    <button @click="deleteBook(book.id)">Удалить</button>
    <!-- <BookStatus :progress="50" /> -->
    <!-- <BookRating v-if="book.rating" :rating="4" /> -->
    <!-- <ProgressBarDetails
      v-if="book.progress && book.progress < 100"
      :progress="book.progress"
      class="bookCard__progress"
    /> -->
  </div>
</template>

<script setup>
const { book } = defineProps(["book"]);

const bookStore = useBookStore();

const deleteBook = async (id) => {
  const { status } = await bookStore.deleteBook(id);

  console.log(status.value);
};
</script>

<style lang="scss" scoped>
.bookCard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--white-thirdly);
  border-radius: var(--border-radius-l);
  box-shadow: var(--shadow-fourthly);
  backdrop-filter: blur(8px);
  padding: 24px;
  transition: 0.25s ease;

  &:hover {
    box-shadow: var(--shadow-primary);
  }

  &__image {
    width: 100%;
    height: 224px;
    object-fit: cover;
    border-radius: var(--border-radius-m);
    box-shadow: var(--shadow-thirdly);

    @media (max-width: 379px) {
      height: 160px;
    }
  }

  &__title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 17px;
    line-height: 28px;
    color: var(--text-color-primary);
    text-align: left;
    padding-top: 16px;
  }

  &__author {
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: var(--text-color-secondary);
    text-align: left;
  }

  &__genre {
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-sixthly);
    text-align: left;
    padding-top: 4px;
  }

  &__progress {
    padding-top: 12px;
  }

  @media (max-width: 767px) {
    padding: 16px 10px;
  }
}
</style>
