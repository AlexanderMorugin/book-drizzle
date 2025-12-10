<template>
  <ModalOverlay :isModalOpen="isModalOpen" @click="$emit('closeModal')">
    <div class="bookModal" @click.stop>
      <span class="bookModal__message">{{ message }}</span>
      <div
        :class="[
          'bookModal__buttons',
          { bookModal__buttons_oneButton: !noButtonText },
        ]"
      >
        <button
          v-if="yesButtonText"
          class="bookModal__button bookModal__button_yes"
          @click="emit('continue')"
          v-on="listeners"
          v-bind="$attrs"
        >
          {{ yesButtonText }}
        </button>
        <button
          v-if="noButtonText"
          class="bookModal__button bookModal__button_no"
          @click="emit('closeModal')"
        >
          {{ noButtonText }}
        </button>
      </div>
    </div>
  </ModalOverlay>
</template>

<script setup>
const { isModalOpen, message, yesButtonText, noButtonText } = defineProps([
  "isSuccessModalOpen",
  "message",
  "yesButtonText",
  "noButtonText",
]);
const emit = defineEmits(["closeModal", "continue"]);
</script>

<style lang="scss" scoped>
.bookModal {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 450px;
  height: fit-content;
  background: var(--white-primary);
  border-radius: var(--border-radius-l);
  padding: 32px;
  box-shadow: var(--shadow-primary);

  &__message {
    font-family: "Inter-Medium", sans-serif;
    font-size: 17px;
    line-height: 28px;
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
