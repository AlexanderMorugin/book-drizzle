<template>
  <BookEditContainer>
    <BookEditTitle title="Рейтинг" />

    <div class="loader-place-br">
      <LoaderComponent v-if="isLoading" />
    </div>

    <BookStarRating
      v-model:value="bookRating"
      :maxStars="5"
      @ratingData="updateRating"
    />

    <p class="ratingText">
      Вы оценили книгу на {{ bookStore.book.rating }} из 5
    </p>
  </BookEditContainer>
</template>

<script setup>
// import { LoaderComponent } from "#components";
// import { BookEditTitle } from "#components";

const bookStore = useBookStore();

const bookRating = ref(bookStore.book.rating);
const isLoading = ref(false);

const updateRating = async (newRating) => {
  bookRating.value = newRating;
  isLoading.value = true;
  try {
    await bookStore.updateBookRating(newRating);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.ratingText {
  font-family: "Inter-Regular", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-color-secondary);
}
</style>
