<template>
  <section class="bookEditProgressYearBlock">
    <div class="bookEditProgressYearBlock__container">
      <LogoBlock place="progressYear" />

      <div class="bookEditProgressYearBlock__inputBox">
        <span class="bookEditProgressYearBlock__inputBoxTitle"
          >Книг к прочтению в 2025 году</span
        >
        <div class="bookEditProgressYearBlock__inputContainer">
          <input
            type="number"
            v-model="quantityBooksField"
            class="bookEditProgressYearBlock__input"
          />
          <button
            class="bookEditProgressYearBlock__submitButton"
            @click="setBooksQuantity"
          >
            <LoaderButtonBlue v-if="isButtonLoading" />
            <span v-else>Обновить</span>
          </button>
        </div>
      </div>

      <BookEditProgressYearDisplayBlock
        v-if="userStore.user?.book_for_years > 0"
        :doneBooks="doneBooks.length"
        :allBooks="userStore.user?.book_for_years"
      />
    </div>
  </section>
</template>

<script setup>
const toast = useToast();
const userStore = useUserStore();
const bookStore = useBookStore();

const quantityBooksField = ref(userStore.user.book_for_years);
const isButtonLoading = ref(false);

const doneBooks = computed(() =>
  bookStore.books.filter((item) => item.progress === 100)
);

const setBooksQuantity = async () => {
  isButtonLoading.value = true;

  try {
    const result = await userStore.updateBooksForYear(quantityBooksField.value);

    if (result.status.value === "error") {
      toast.error({
        title: "Ошибка!",
        message: "Количество книг изменить не удалось.",
      });
    }

    if (result.status.value === "success") {
      toast.success({
        title: "Успешно!",
        message: "Вы изменили количество книг к прочтению.",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    isButtonLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.bookEditProgressYearBlock {
  background: var(--gradient-progress-gray);
  border-radius: var(--border-radius-l);
  box-shadow: var(--shadow-secondary);
  padding: 24px 32px 32px 32px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 32px 32px 32px;
  }

  &__inputBox {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__inputBoxTitle {
    font-family: "Inter-Medium", sans-serif;
    font-size: 14px;
    line-height: 14px;
    color: var(--text-color-eighthly);
  }

  &__inputContainer {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__input {
    width: 100%;
    height: 36px;
    border-radius: var(--border-radius-s);
    background: var(--white-primary);
    padding: 9px 13px;
    font-family: "Inter-Regular", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-eighthly);
    border: 1px solid transparent;
    transition: 0.25s;

    &:focus {
      outline: 0;
      border: 1px solid var(--violet-thirdly);
    }
  }

  &__submitButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 101px;
    background: var(--white-primary);
    border-radius: var(--border-radius-s);
    border: 1px solid var(--black-primary);
    font-family: "Inter-Medium", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-eighthly);
    padding: 8px 17px;
    opacity: 0.5;
    transition: 0.25s ease;

    &:hover {
      opacity: 1;
      box-shadow: var(--shadow-secondary);
    }
  }

  @media (max-width: 1023px) {
    gap: 32px;
  }

  @media (max-width: 474px) {
    padding: 40px 10px 20px 10px;
  }
}
</style>
