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
      @handleClick="deleteBook"
    />

    <!-- Модалка успешного удаления книги из supabase -->
    <!-- <Teleport to="body">
      <Transition name="fade">
        <BookModal
          v-if="isSuccessDeleteModalOpen"
          :isModalOpen="isSuccessDeleteModalOpen"
          :message="successDeleteMessage"
          yesButtonText="В библиотеку"
          @continue="closeSuccessDeleteModal"
        />
      </Transition>
    </Teleport> -->
  </div>
</template>

<script setup>
import { BookProgressInput } from "#components";
import { ProgressBarDetails } from "#components";

const bookStore = useBookStore();
// const router = useRouter();

const isLoading = ref(false);
const isButtonDoneLoading = ref(false);
const isButtonDeleteLoading = ref(false);
const isProgressActive = ref(false);
const bookProgress = ref(bookStore.book.progress);
const progressErrorMessage = ref(null);
const isSuccessDeleteModalOpen = ref(false);
const successDeleteMessage = ref(null);

const setActiveProgress = () => (isProgressActive.value = true);
const cancelActiveProgress = () => {
  bookProgress.value = bookStore.book.progress;
  isProgressActive.value = false;
  progressErrorMessage.value = null;
};

// Функции модалок

// const closeSuccessDeleteModal = () => {
//   isSuccessDeleteModalOpen.value = false;
//   router.push(BOOKS_PATH);
// };

// Сабмит прогресса чтения книги
const submitData = async () => {
  progressErrorMessage.value = null;
  isProgressActive.value = true;
  isLoading.value = true;

  if (bookProgress.value < 0 || bookProgress.value > 100) {
    progressErrorMessage.value = "от 0 до 100";
    bookProgress.value = bookStore.book.progress;
    return;
  }

  try {
    await bookStore.updateBookProgress(bookProgress.value);
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
    await bookStore.updateBookProgress(100);
    bookProgress.value = 100;
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
    await bookStore.deleteBook();
    return navigateTo("/library");
    // isSuccessDeleteModalOpen.value = true
    // successDeleteMessage.value = 'Книга успешно удалена!'
  } catch (error) {
    console.log(error);
  } finally {
    isButtonDeleteLoading.value = false;
  }
};

// async function getStoreData() {
//   isLoading.value = false
//   try {
//     isLoading.value = true
//     await bookStore.loadCurrentBook(bookId)

//     progress.value = bookStore.currentBook.progress
//   } catch (error) {
//     console.log(error)
//   } finally {
//     isLoading.value = false
//   }
// }
</script>
