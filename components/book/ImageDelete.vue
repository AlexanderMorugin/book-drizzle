<template>
  <div class="bookImageDelete">
    <span class="bookImageDelete__title"
      >Вы действительно хотите удалить обложку?</span
    >
    <div class="bookImageDelete__buttons">
      <button
        class="bookImageDelete__button bookImageDelete__button_yes"
        @click="emit('continue')"
      >
        <LoaderButton v-if="isLoading" />
        <span v-else>Удалить</span>
      </button>
      <button
        class="bookImageDelete__button bookImageDelete__button_no"
        @click="emit('closeModal')"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script setup>
const { isLoading } = defineProps(["isLoading"]);
const emit = defineEmits(["closeModal", "continue"]);
</script>

<style lang="scss" scoped>
.bookImageDelete {
  display: flex;
  flex-direction: column;
  gap: 32px;

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

    &_oneButton {
      grid-template-columns: 1fr;
    }

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
    border-radius: var(--border-radius-m);
    font-family: "Inter-Medium", sans-serif;
    font-size: 17px;
    line-height: 28px;
    color: var(--white-primary);

    &_yes {
      background: var(--green-fifthly);
      transition: 0.25s ease;

      &:hover {
        background: var(--green-fourthly);
      }
    }

    &_no {
      background: var(--red-primary);
      transition: 0.25s ease;

      &:hover {
        background: var(--brown-secondary);
      }
    }
  }
}
</style>
