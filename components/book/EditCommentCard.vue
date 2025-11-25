<template>
  <BookEditContainer>
    <BookEditTitle
      title="Заметки"
      name="edit"
      @handleClick="setActiveComment"
    />

    <div class="loader-place-br">
      <LoaderComponent v-if="isLoading" />
    </div>

    <component
      :is="isCommentActive ? BookCommentTextArea : BookComment"
      v-model:value="bookComment"
      :bookComment="bookComment"
    />

    <BookEditSubmitButtons
      v-if="isCommentActive"
      @submitData="submitData"
      @handleCancel="removeActiveComment"
    />
  </BookEditContainer>
</template>

<script setup>
import { BookCommentTextArea } from "#components";
import { BookComment } from "#components";

const toast = useToast();
const bookStore = useBookStore();

const isLoading = ref(false);
const isCommentActive = ref(false);
const bookComment = ref(bookStore.book.comment);

const setActiveComment = () => (isCommentActive.value = true);
const removeActiveComment = () => {
  isCommentActive.value = false;
  comment.value = bookStore.book.comment;
};

const submitData = async () => {
  isLoading.value = true;
  try {
    const result = await bookStore.updateBookComment(bookComment.value);

    if (result.status.value === "error") {
      toast.error({
        title: "Ошибка!",
        message: "Заметку добавить не удалось.",
      });
    }

    if (result.status.value === "success") {
      toast.success({
        title: "Успешно!",
        message: "Заметка добавлена.",
      });

      isCommentActive.value = false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
