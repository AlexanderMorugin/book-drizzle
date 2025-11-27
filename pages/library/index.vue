<template>
  <PageContainer width="wide">
    <!-- <SearchInput
      type="text"
      name="bookField"
      placeholder="Поиск книги или автора"
      v-model:value="bookField"
      @clearInput="clearInput"
    /> -->

    <!-- Блок с кнопками -->
    <!-- <section class="booksStatusBlock">
      <div v-for="button in statusButtons" :key="button.id">
        <StatusButton
          :title="button.title"
          :quantity="button.quantity"
          :isActive="button.status"
          @click="
            setActive(button.id, button.progressGreat, button.progressLess)
          "
        />
      </div>
    </section> -->

    <!-- Если у пользователя есть книги -->
    <BookBlockForAll v-if="bookStore.books.length" />

    <!-- Если у пользователя не добавлено ни одной книги -->
    <BookEmptyArray v-else />

    <SideBarCounter place="books" />
  </PageContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

// const headerStore = useHeaderStore();
const bookStore = useBookStore();
// const userStore = useUserStore();

// await bookStore.loadBooks(userStore.user.id);

const bookField = ref(null);
// const isLoading = ref(false);
const booksForButtons = ref([]);

const statusButtons = ref([
  {
    id: 1,
    title: "Все",
    progressGreat: null,
    progressLess: null,
    quantity: 5,
    status: true,
  },
  {
    id: 2,
    title: "Читаю",
    progressGreat: 1,
    progressLess: 99,
    quantity: 8,
    status: false,
  },
  {
    id: 3,
    title: "Прочитано",
    progressGreat: 100,
    progressLess: 100,
    quantity: 2,
    status: false,
  },
  {
    id: 4,
    title: "Запланировано",
    progressGreat: 0,
    progressLess: 0,
    quantity: 7,
    status: false,
  },
]);

// const clearInput = () => {
//   bookField.value = null;

//   getStoreData();
// };

// const setActive = (id, progressGreat, progressLess) => {
//   const currentButton = statusButtons.value.find((item) => item.id === id);
//   const activeButton = statusButtons.value.find((item) => item.status === true);

//   if (currentButton.status !== true) {
//     currentButton.status = true;
//     activeButton.status = false;
//   }

//   if (progressGreat === null) {
//     bookStore.loadStatusBooks(0, 100);
//   } else {
//     bookStore.loadStatusBooks(progressGreat, progressLess);
//   }
// };

// async function getStoreData() {
//   isLoading.value = false;
//   try {
//     isLoading.value = true;
//     const { data } = await bookStore.loadBooks();
//     await bookStore.loadStatusBooks(0, 100);
//     booksForButtons.value = data;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     isLoading.value = false;
//   }
// }

// headerStore.setHeaderTitle("Моя библиотека");
</script>

<style lang="scss" scoped>
.booksStatusBlock {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
// .booksEmptyBlock {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 32px;
//   font-family: "Inter-Medium", sans-serif;
//   font-size: 16px;
//   line-height: 26px;
//   color: var(--text-color-primary);
// }
</style>
