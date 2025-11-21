<template>
  <section>
    <LoaderPage />
    <div>
      <BookEmptyArray title="В вашей библиотеке книг пока нет." />
      <ul class="booksBlock">
        <li v-for="book in books" :key="book.id">
          <BookCard :book="book" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { books, isLoading } = defineProps(["books", "isLoading"]);
</script>

<style scoped>
.booksBlock {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1399px) {
  .booksBlock {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1279px) {
  .booksBlock {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .booksBlock {
    column-gap: 10px;
    row-gap: 20px;
  }
}
</style>
