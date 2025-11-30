<template>
  <PageContainer width="home">
    <section class="home__titleBlock">
      <h1 class="home__title">Привет! 📚</h1>
      <p class="home__subtitle">Сохрани свои любимые книги</p>
    </section>

    <section class="home__content">
      <div>
        <!-- Если у пользователя есть книги -->
        <div v-if="bookStore.books.length" class="home__contentBlock">
          <ProgressYearBlock place="home" title="Цель на 2025 год" />
          <ProgressReadingBlock place="home" title="Текущие книги" />
        </div>

        <!-- Если у пользователя не добавлено ни одной книги -->
        <BookEmptyArray v-else />
      </div>

      <div class="home__contentBlock">
        <div class="home__contentItems">
          <ButtonWithIcon
            name="addBook"
            text="Добавить книгу"
            route="/add-book"
          />
          <ButtonWithIcon
            name="library"
            text="Библиотека"
            :number="bookStore.books.length"
            route="/library"
          />
        </div>

        <div class="home__contentItems">
          <h2 class="home__contentTitle">Прочитанные книги</h2>

          <!-- Если есть прочитанные книги -->
          <div v-if="doneBooks.length" class="home__contentSubItems">
            <BookDone
              v-for="item in doneBooks"
              :key="item.id"
              :bookName="item.name"
              :author="item.author"
              :rating="item.rating"
              :comment="item.comment"
              :route="item.id"
            />
          </div>

          <!-- Если прочитанных книг нет -->
          <div v-else class="no-info">Пока вы не прочитали ни одной книги.</div>
        </div>
      </div>
    </section>
  </PageContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});

const bookStore = useBookStore();

const doneBooks = computed(() =>
  bookStore.books.filter((item) => item.progress === 100)
);
</script>

<style lang="scss" scoped>
.home {
  &__titleBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding-top: 32px;
    padding-bottom: 32px;
  }

  &__title {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 34px;
    line-height: 40px;
    color: var(--text-color-primary);
  }

  &__subtitle {
    font-family: "Inter-Regular", sans-serif;
    font-size: 17px;
    line-height: 28px;
    color: var(--text-color-secondary);
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 384px;
    gap: 32px;

    @media (max-width: 1279px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 767px) {
      gap: 64px;
    }
  }

  &__contentBlock {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (max-width: 767px) {
      gap: 64px;
    }
  }

  &__contentItems {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__contentTitle {
    font-family: "Inter-SemiBold", sans-serif;
    font-size: 19px;
    line-height: 28px;
    color: var(--text-color-primary);
  }

  &__contentSubItems {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__contentSubItemsText {
    font-family: "Inter-Medium", sans-serif;
    font-size: 16px;
    line-height: 22px;
    color: var(--text-color-secondary);
  }
}
</style>
