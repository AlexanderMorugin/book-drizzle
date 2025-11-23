<template>
  <PageContainer width="normal">
    <BookTitleBlock :currentBook="bookStore.book" />
    <BookEditBlock
      :currentBook="bookStore.currentBook"
      :bookId="route.params.id"
    />
  </PageContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const headerStore = useHeaderStore();
const bookStore = useBookStore();
const route = useRoute();

headerStore.setHeaderTitle("Детали книги");
await bookStore.getBook(route.params.id);
</script>
