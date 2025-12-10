<template>
  <ModalOverlay :isModalOpen="isModalOpen" @click="$emit('closeModal')">
    <div class="editBookModal" @click.stop>
      <ButtonIconNavigate name="close" @handleClick="emit('closeModal')" />
      <span class="editBookModal__title">{{ title }}</span>

      <FormEditBookImage place="editBook" @closeModal="emit('closeModal')" />
    </div>
  </ModalOverlay>
</template>

<script setup>
const { isModalOpen, title } = defineProps(["isModalOpen", "title"]);
const emit = defineEmits(["closeModal"]);
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
}
</style>
