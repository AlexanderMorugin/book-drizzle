<template>
  <ModalOverlay :isModalOpen="isModalOpen">
    <div class="editBookModal">
      <ButtonIconNavigate name="close" @handleClick="emit('closeModal')" />
      <span class="editBookModal__title">{{ title }}</span>

      <FormEditBook place="editBook" />
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

  &__title {
    font-family: "Inter-Medium", sans-serif;
    font-size: 22px;
    line-height: 32px;
    color: var(--text-color-primary);
    text-align: center;
  }

  // &__buttons {
  //   display: grid;
  //   grid-template-columns: repeat(2, 1fr);
  //   gap: 32px;

  //   &_oneButton {
  //     grid-template-columns: 1fr;
  //   }

  //   @media (max-width: 767px) {
  //     grid-template-columns: 1fr;
  //     gap: 20px;
  //   }
  // }

  // &__button {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   padding: 10px 20px;
  //   border-radius: var(--border-radius-m);
  //   font-family: "Inter-Medium", sans-serif;
  //   font-size: 17px;
  //   line-height: 28px;
  //   color: var(--white-primary);

  //   &_yes {
  //     background: var(--green-fifthly);
  //     transition: 0.25s ease;

  //     &:hover {
  //       background: var(--green-fourthly);
  //     }
  //   }

  //   &_no {
  //     background: var(--red-primary);
  //     transition: 0.25s ease;

  //     &:hover {
  //       background: var(--brown-secondary);
  //     }
  //   }
  // }
}

.icon {
  color: var(--text-color-primary);
}
</style>
