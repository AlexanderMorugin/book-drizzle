<template>
  <div>
    <BookEditContainer>
      <BookEditTitle
        title="Прогресс по чтению"
        name="edit"
        @handleClick="setActiveProgress"
      />

      <LoaderComponent v-if="isLoading" />
      <component
        v-else
        :is="isProgressActive ? BookProgressInput : ProgressBarDetails"
        v-model:value="progress"
        :progress="progress"
        :progressErrorMessage="progressErrorMessage"
      />

      <!-- <BookEditSubmitButtons
        v-if="isProgressActive"
        @submitData="submitData"
        @handleCancel="removeActiveProgress"
      /> -->
    </BookEditContainer>

    <!-- Кнопка "Прочитано" -->
    <FormSubmitButton
      place="book"
      :isLoading="isLoading"
      @handleClick="setProgressDone"
    />
    <!-- Кнопка "Удалить" -->
    <FormSubmitButton
      place="delete"
      :isLoading="isDeleteLoading"
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
const router = useRouter();

const { bookId } = defineProps(["bookId"]);

const isLoading = ref(false);
const isDeleteLoading = ref(false);
const isProgressActive = ref(false);
const progress = ref(0);
const progressErrorMessage = ref(null);
const isSuccessDeleteModalOpen = ref(false);
const successDeleteMessage = ref(null);

const setActiveProgress = () => (isProgressActive.value = true);
const removeActiveProgress = () => {
  isProgressActive.value = false;
  progressErrorMessage.value = null;
  progress.value = bookStore.currentBook.progress;
};

// Функции модалок

// const closeSuccessDeleteModal = () => {
//   isSuccessDeleteModalOpen.value = false;
//   router.push(BOOKS_PATH);
// };

// Сабмит прогресса чтения книги
const submitData = async () => {
  progressErrorMessage.value = null;

  if (progress.value < 0 || progress.value > 100) {
    progressErrorMessage.value = "от 0 до 100";
    progress.value = bookStore.book.progress;
    return;
  }

  progressErrorMessage.value = null;
  // await bookStore.updateCurrentBookProgress(progress.value, bookId)
  // removeActiveProgress()
  // getStoreData()
};

// Установление прогресса чтения на 100%
// const setProgressDone = async () => {
//   isLoading.value = false

//   try {
//     isLoading.value = true
//     progress.value = 100
//     await bookStore.updateCurrentBookProgress(100, bookId)
//     getStoreData()
//   } catch (error) {
//     console.log(error)
//   } finally {
//     isLoading.value = false
//   }
// }

// Удаление книги
// const deleteBook = async () => {
//   isDeleteLoading.value = false

//   try {
//     isDeleteLoading.value = true
//     await bookStore.deleteBook(bookId)
//     isSuccessDeleteModalOpen.value = true
//     successDeleteMessage.value = 'Книга успешно удалена!'
//     // router.go(-1)
//   } catch (error) {
//     console.log(error)
//   } finally {
//     isDeleteLoading.value = false
//   }
// }

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

// onMounted(() => {
//   getStoreData()
// })
</script>
