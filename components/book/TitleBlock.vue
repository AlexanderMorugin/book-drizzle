<template>
  <section class="bookTitleBlock">
    <div class="bookTitleBlock__container">
      <!-- Если книга без обложки -->
      <div v-if="!bookStore.book?.image" class="bookTitleBlock__noImage">
        Книга без обложки
      </div>

      <img
        v-else
        :src="bookStore.book?.image"
        :alt="bookStore.book?.name"
        class="bookTitleBlock__image"
      />
      <div class="bookTitleBlock__details">
        <div class="bookTitleBlock__titleBox">
          <h1 class="bookTitleBlock__title">{{ bookStore.book?.name }}</h1>
          <!-- Кнопка "Редактировать книгу" -->
          <ButtonIconNavigate
            name="edit"
            @handleClick="isEditBookModalOpen = true"
          />
        </div>
        <span class="bookTitleBlock__author">{{ bookStore.book?.author }}</span>
        <span class="bookTitleBlock__genre">{{
          bookStore.book?.genre || "Жанр не выбран"
        }}</span>
        <BookStatus :progress="bookStore.book?.progress" />
      </div>
    </div>

    <!-- Модалка редактирования книги -->
    <Teleport to="body">
      <Transition name="fade">
        <ModalEditBook
          v-if="isEditBookModalOpen"
          :isModalOpen="isEditBookModalOpen"
          title="Редактирование"
          @closeModal="closeEditBookModal"
        />
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
const bookStore = useBookStore();

const isEditBookModalOpen = ref(false);

const closeEditBookModal = () => (isEditBookModalOpen.value = false);
</script>

<style lang="scss" scoped>
.bookTitleBlock {
  width: 100%;
  min-height: 384px;
  background: var(--gradient-book-title);
  border-radius: var(--border-radius-l);
  box-shadow: var(--shadow-secondary);
  padding: 32px;

  &__container {
    display: flex;
    gap: 32px;

    @media (max-width: 767px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  &__noImage {
    display: flex;
    justify-content: center;
    align-items: center;
    background: gainsboro;
    border-radius: var(--border-radius-m);
    font-family: "Inter-Medium", sans-serif;
    font-size: 17px;
    line-height: 28px;
    color: var(--text-color-secondary);
    text-align: center;
    width: 224px;
    height: 320px;
    border-radius: var(--border-radius-l);
    box-shadow: var(--shadow-secondary);
    padding: 20px;

    @media (max-width: 767px) {
      width: 100%;
      height: 260px;
    }
  }

  &__image {
    width: 224px;
    height: 320px;
    border-radius: var(--border-radius-l);
    box-shadow: var(--shadow-secondary);
    object-fit: cover;

    @media (max-width: 767px) {
      width: 100%;
      height: 260px;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  &__titleBox {
    display: grid;
    grid-template-columns: 1fr 40px;
    gap: 20px;
    width: 100%;
  }

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 34px;
    line-height: 40px;
    color: var(--text-color-primary);

    @media (max-width: 767px) {
      font-size: 28px;
      line-height: 36px;
    }
  }

  &__author {
    font-family: "Inter-Regular", sans-serif;
    font-size: 19px;
    line-height: 28px;
    color: var(--text-color-secondary);

    @media (max-width: 767px) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  &__genre {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    background: var(--gray-sixthly);
    border-radius: var(--border-radius-s);
    font-family: "Inter-Medium", sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: var(--text-color-seventhly);
    padding: 3px 9px;
    margin-bottom: 12px;
  }

  @media (max-width: 767px) {
    padding: 16px 10px;
  }
}
</style>
