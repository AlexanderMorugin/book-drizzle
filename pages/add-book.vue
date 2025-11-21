<template>
  <PageContainer width="narrow">
    <BookAddingBlock />

    <div class="line" />

    <!-- <BookEditProgressYearBlock /> -->
  </PageContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const headerStore = useHeaderStore();

headerStore.setHeaderTitle("Добавить книгу");
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1px;
  background: var(--black-primary);
}
</style>
