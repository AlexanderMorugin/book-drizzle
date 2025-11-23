<template>
  <BookEditContainer>
    <BookEditTitle
      title="Заметки"
      name="edit"
      @handleClick="setActiveComment"
    />

    <LoaderComponent v-if="isLoading" />
    <component
      v-else
      :is="isCommentActive ? BookCommentTextArea : BookComment"
      v-model:value="comment"
      :comment="comment"
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

const bookStore = useBookStore();

const { bookId } = defineProps(["bookId"]);

const isLoading = ref(false);
const isCommentActive = ref(false);
const comment = ref(bookStore.book.comment);

const setActiveComment = () => (isCommentActive.value = true);
const removeActiveComment = () => {
  isCommentActive.value = false;
  comment.value = bookStore.book.comment;
};

const submitData = async () => {
  isLoading.value = true;
  try {
    await bookStore.updateBookComment(comment.value, bookId);
    isCommentActive.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
