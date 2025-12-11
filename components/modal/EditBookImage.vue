<template>
  <ModalOverlay :isModalOpen="isModalOpen" @click="$emit('closeModal')">
    <div class="editBookModal" @click.stop>
      <ButtonIconNavigate name="close" @handleClick="emit('closeModal')" />
      <span class="editBookModal__title">{{
        isEditFormOpen
          ? "Заменить обложку"
          : isDeleteFormOpen
          ? "Удалить обложку"
          : title
      }}</span>

      <div
        v-if="!isEditFormOpen && !isDeleteFormOpen"
        class="editBookModal__buttons"
      >
        <button
          class="editBookModal__button editBookModal__button_yes"
          @click="openEditForm"
        >
          Заменить обложку
        </button>
        <button
          class="editBookModal__button editBookModal__button_no"
          @click="openDeleteForm"
        >
          Удалить обложку
        </button>
      </div>

      <TransitionGroup name="list">
        <FormEditBookImage
          v-if="isEditFormOpen"
          place="editBook"
          @closeModal="emit('closeModal')"
        />
      </TransitionGroup>

      <TransitionGroup name="error">
        <BookImageDelete
          v-if="isDeleteFormOpen"
          :isLoading="isLoading"
          @continue="deleteBookImage"
          @closeModal="emit('closeModal')"
        />
      </TransitionGroup>
    </div>
  </ModalOverlay>
</template>

<script setup>
const { isModalOpen, title } = defineProps(["isModalOpen", "title"]);
const emit = defineEmits(["closeModal"]);

const toast = useToast();
const bookStore = useBookStore();

const isEditFormOpen = ref(false);
const isDeleteFormOpen = ref(false);
const isLoading = ref(false);

const openEditForm = () => {
  isDeleteFormOpen.value = false;
  isEditFormOpen.value = true;
};

const openDeleteForm = () => {
  isEditFormOpen.value = false;
  isDeleteFormOpen.value = true;
};

const deleteBookImage = async () => {
  try {
    isLoading.value = true;

    const result = await bookStore.deleteBookImage();

    console.log(result.status.value);

    if (result.status.value === "error") {
      toast.error({
        title: "Ошибка!",
        message: "Обложку удалить не удалось.",
      });
    }

    if (result.status.value === "success") {
      toast.success({
        title: "Успешно!",
        message: "Обложка удалена.",
      });

      emit("closeModal");
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.editBookModal {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 650px;
  height: fit-content;
  background: var(--white-primary);
  border-radius: var(--border-radius-l);
  padding: 32px;
  box-shadow: var(--shadow-primary);

  @media (max-width: 767px) {
    padding: 20px;
  }

  &__title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 22px;
    line-height: 32px;
    color: var(--text-color-primary);
    text-align: center;
  }

  &__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border-radius: var(--border-radius-s);
    font-family: "Inter-Medium", sans-serif;
    font-size: 17px;
    line-height: 28px;
    color: var(--white-primary);

    &_yes {
      background: var(--gradient-progress-blue);

      &:hover {
        background: var(--gradient-logo-primary);
      }
    }

    &_no {
      background: var(--gradient-form-register);

      &:hover {
        background: var(--gradient-logo-primary);
      }
    }
  }
}
</style>
