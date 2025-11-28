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
    <section class="booksStatusBlock">
      <div v-for="button in statusButtons" :key="button.id">
        <ButtonStatus
          :title="button.title"
          :quantity="button.quantity"
          :isActive="button.status"
          @click="setActive(button.id)"
        />
      </div>
    </section>

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

const bookStore = useBookStore();
const userStore = useUserStore();

const bookField = ref(null);
// const isLoading = ref(false);
const booksForButtons = ref([]);

const statusButtons = ref([
  {
    id: 1,
    title: "Все",
    // progressFirst: null,
    // progressLast: null,
    quantity: bookStore.books.length,
    status: true,
  },
  {
    id: 2,
    title: "Читаю",
    // progressFirst: 0,
    // progressLast: 100,
    quantity: computed(
      () =>
        bookStore.books.filter(
          (item) => item.progress > 0 && item.progress < 100
        ).length
    ),
    status: false,
  },
  {
    id: 3,
    title: "Прочитано",
    // progressFirst: 100,
    // progressLast: 100,
    quantity: computed(
      () => bookStore.books.filter((item) => item.progress === 100).length
    ),
    status: false,
  },
  {
    id: 4,
    title: "Запланировано",
    // progressFirst: 0,
    // progressLast: 0,
    quantity: computed(
      () => bookStore.books.filter((item) => item.progress === 0).length
    ),
    status: false,
  },
]);

// const clearInput = () => {
//   bookField.value = null;

//   getStoreData();
// };

// const setActive = (id, progressGreat, progressLess) => {
const setActive = (id) => {
  // Находим кнопку по которой кликаем
  const currentButton = statusButtons.value.find((item) => item.id === id);
  // Находим активную на данный момент кнопку
  const activeButton = statusButtons.value.find((item) => item.status === true);

  // console.log(currentButton.title);

  // При клике на кнопку меняем ее статус на активный, остальным кнопкам этот статус дезактивируем
  if (currentButton.status !== true) {
    currentButton.status = true;
    activeButton.status = false;
  }

  // Кнопка "Все"
  if (currentButton.title === "Все") {
    // console.log("Все");
    bookStore.loadFilterBooks(0, 100, userStore.user.id);
  }

  // Кнопка "Читаю"
  if (currentButton.title === "Читаю") {
    // console.log("Читаю");
    bookStore.loadFilterBooks(1, 99, userStore.user.id);
  }

  // Кнопка "Прочитано"
  if (currentButton.title === "Прочитано") {
    // console.log("Прочитано");
    bookStore.loadFilterBooks(100, 100, userStore.user.id);
  }

  // Кнопка "Прочитано"
  if (currentButton.title === "Запланировано") {
    // console.log("Запланировано");
    bookStore.loadFilterBooks(0, 0, userStore.user.id);
  }
};

await bookStore.loadFilterBooks(0, 100, userStore.user.id);
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
