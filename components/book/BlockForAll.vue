<template>
  <section>
    <div>
      <BookEmptyArray
        v-if="!bookStore.books"
        title="В вашей библиотеке книг пока нет."
      />

      <ul v-else class="booksBlock">
        <li v-for="book in bookStore.filterBooks" :key="book.id">
          <BookCard :book="book" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const bookStore = useBookStore();
</script>

<style lang="scss" scoped>
.booksBlock {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1399px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1279px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    column-gap: 10px;
    row-gap: 20px;
  }
}
</style>
