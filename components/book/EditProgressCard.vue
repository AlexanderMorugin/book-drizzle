<template>
  <div>
    <BookEditContainer>
      <BookEditTitle
        title="Прогресс по чтению"
        name="edit"
        @handleClick="setActiveProgress"
      />

      <div class="loader-place-br">
        <LoaderComponent v-if="isLoading" />
      </div>

      <component
        :is="isProgressActive ? BookProgressInput : ProgressBarDetails"
        v-model:value="bookProgress"
        :progress="bookProgress"
        :progressErrorMessage="progressErrorMessage"
      />

      <BookEditSubmitButtons
        v-if="isProgressActive"
        @submitData="submitData"
        @handleCancel="cancelActiveProgress"
      />
    </BookEditContainer>

    <!-- Кнопка "Прочитано" -->
    <FormSubmitButton
      place="book"
      :isLoading="isButtonDoneLoading"
      @handleClick="setProgressDone"
    />
    <!-- Кнопка "Удалить" -->
    <FormSubmitButton
      place="delete"
      :isLoading="isButtonDeleteLoading"
      @handleClick="isDeleteModalOpen = true"
    />

    <!-- Модалка успешного удаления книги из БД -->
    <Teleport to="body">
      <Transition name="fade">
        <ModalConfirmBook
          v-if="isDeleteModalOpen"
          :isModalOpen="isDeleteModalOpen"
          message="Удалить книгу?"
          yesButtonText="Да"
          noButtonText="Нет"
          @continue="deleteBook"
          @closeModal="isDeleteModalOpen = false"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { BookProgressInput } from "#components";
import { ProgressBarDetails } from "#components";

const toast = useToast();
const bookStore = useBookStore();

const isLoading = ref(false);
const isButtonDoneLoading = ref(false);
const isButtonDeleteLoading = ref(false);
const isProgressActive = ref(false);
const bookProgress = ref(bookStore.book.progress);
const progressErrorMessage = ref(null);
const isDeleteModalOpen = ref(false);

const setActiveProgress = () => (isProgressActive.value = true);
const cancelActiveProgress = () => {
  bookProgress.value = bookStore.book.progress;
  isProgressActive.value = false;
  progressErrorMessage.value = null;
};

// Сабмит прогресса чтения книги
const submitData = async () => {
  progressErrorMessage.value = null;
  isProgressActive.value = true;
  isLoading.value = true;

  if (bookProgress.value < 0 || bookProgress.value > 100) {
    progressErrorMessage.value = "от 0 до 100";
    bookProgress.value = bookStore.book.progress;
    isLoading.value = false;
    return;
  }

  try {
    const result = await bookStore.updateBookProgress(bookProgress.value);

    if (result.status.value === "error") {
      toast.error({
        title: "Ошибка!",
        message: "Прогресс по чтению обновить не удалось.",
      });
    }

    if (result.status.value === "success") {
      toast.success({
        title: "Успешно!",
        message: "Прогресс по чтению обновлён.",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    isProgressActive.value = false;
    isLoading.value = false;
  }
};

// Установление прогресса чтения на 100%
const setProgressDone = async () => {
  isButtonDoneLoading.value = true;

  try {
    const result = await bookStore.updateBookProgress(100);

    if (result.status.value === "error") {
      toast.error({
        title: "Ошибка!",
        message: "Рейтинг книги обновить не удалось.",
      });
    }

    if (result.status.value === "success") {
      toast.success({
        title: "Успешно!",
        message: "Рейтинг книги обновлён.",
      });

      bookProgress.value = 100;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isButtonDoneLoading.value = false;
  }
};

// Удаление книги
const deleteBook = async () => {
  isButtonDeleteLoading.value = true;

  try {
    const result = await bookStore.deleteBook();

    if (result.status.value === "error") {
      toast.error({
        title: "Ошибка!",
        message: "Книгу удалить не удалось.",
      });
    }

    if (result.status.value === "success") {
      toast.success({
        title: "Успешно!",
        message: "Книга удалена.",
      });

      isDeleteModalOpen.value = false;

      return navigateTo("/library");
    }
  } catch (error) {
    console.log(error);
  } finally {
    isButtonDeleteLoading.value = false;
  }
};
</script>
