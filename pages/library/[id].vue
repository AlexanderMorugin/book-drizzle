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

const userStore = useUserStore();
const bookStore = useBookStore();
const route = useRoute();

const result = await bookStore.getBook(route.params.id);

// Если рефреш токен истек, отправляемся на логин
if (result.data.value === "goToLogin") {
  userStore.logoutCurrentUser();
  location.reload();
  await navigateTo("/login");
}
</script>
