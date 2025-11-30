<template>
  <PageContainer width="normal">
    <BookTitleBlock />
    <BookEditBlock />
  </PageContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const bookStore = useBookStore();
const route = useRoute();

await bookStore.getBook(route.params.id);
</script>
