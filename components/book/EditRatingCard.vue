<template>
  <BookEditContainer>
    <BookEditTitle title="Рейтинг" />
    <div class="loader">
      <LoaderComponent v-if="isLoading" />
    </div>
    <BookStarRating
      v-model:value="userRating"
      :maxStars="5"
      @ratingData="updateRating"
    />

    <p class="ratingText">Вы оценили книгу на {{ userRating }} из 5</p>
  </BookEditContainer>
</template>

<script setup>
const bookStore = useBookStore();

const { bookId } = defineProps(["bookId"]);

const userRating = ref(bookStore.book.rating);
const isLoading = ref(false);

const updateRating = async (newRating) => {
  userRating.value = newRating;
  isLoading.value = true;
  try {
    const { data, status, refresh } = await bookStore.updateBookRating(
      newRating,
      bookId
    );
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

.loader {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
