<template>
  <button
    type="submit"
    @click="emit('handleClick')"
    :class="[
      'formSubmitButton',
      { formSubmitButton_register: place === 'register' },
      {
        formSubmitButton_registerActive:
          place === 'register' && !isFromEmpty && !isValid,
      },
      { formSubmitButton_login: place === 'login' || place === 'addBook' },
      {
        formSubmitButton_loginActive:
          (place === 'login' && !isFromEmpty && !isValid) ||
          (place === 'addBook' && !isFromEmpty && !isValid),
      },
      { formSubmitButton_book: place === 'book' },
      { formSubmitButton_delete: place === 'delete' },
    ]"
  >
    <LoaderButton v-if="isLoading" />

    <div v-else class="formSubmitButton__content">
      <IconRegister v-if="place === 'register'" class="icon" />
      <IconLogin v-if="place === 'login'" class="icon" />
      <IconDone v-if="place === 'book'" class="icon" />
      <IconSave v-if="place === 'addBook'" class="icon" />

      <span class="formSubmitButton__text">
        {{
          place === "register"
            ? "Создать аккаунт"
            : place === "login"
            ? "Войти"
            : place === "book"
            ? "Прочитано"
            : place === "addBook"
            ? "Добавить книгу"
            : place === "delete"
            ? "Удалить"
            : ""
        }}
      </span>
    </div>
  </button>
</template>

<script setup>
const { place, isFromEmpty, isValid, isLoading } = defineProps([
  "place",
  "isFromEmpty",
  "isValid",
  "isLoading",
]);

const emit = defineEmits(["handleClick"]);
</script>

<style lang="scss" scoped>
.formSubmitButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  border-radius: var(--border-radius-s);
  box-shadow: var(--shadow-secondary);
  cursor: auto;

  &_register {
    background: var(--gradient-form-register);
    opacity: 0.5;
  }

  &_registerActive {
    cursor: pointer;
    opacity: 1;
    animation: shine 3s infinite;
    background-image: -webkit-gradient(
      linear,
      left center,
      right center,
      from var(--violet-thirdly),
      color-stop(0.5, var(--violet-secondary)),
      to var(--violet-thirdly)
    );
    background-image: -webkit-linear-gradient(
      left,
      var(--violet-thirdly) 0%,
      var(--violet-secondary) 50%,
      var(--violet-thirdly) 100%
    );
  }

  &_login {
    background: var(--gradient-form-login);
    opacity: 0.5;
  }

  &_loginActive {
    cursor: pointer;
    opacity: 1;
    animation: shine 3s infinite;
    background-image: -webkit-gradient(
      linear,
      left center,
      right center,
      from var(--green-thirdly),
      color-stop(0.5, var(--green-secondary)),
      to var(--green-thirdly)
    );
    background-image: -webkit-linear-gradient(
      left,
      var(--green-thirdly) 0%,
      var(--green-secondary) 50%,
      var(--green-thirdly) 100%
    );
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
  }

  &__text {
    font-family: "Inter-Medium", sans-serif;
    font-size: 14px;
    line-height: 14px;
    color: var(--white-primary);
  }
}

.icon {
  color: var(--white-primary);
}
.formSubmitButton_registerActive:hover .icon {
  animation: scale 0.3s ease-in-out;
}
.formSubmitButton_loginActive:hover .icon {
  animation: scale 0.3s ease-in-out;
}
.formSubmitButton_book {
  background: var(--gradient-progress-done-green);
  margin-top: 32px;
  transition: 0.25s ease;
  cursor: pointer;
}
.formSubmitButton_book:hover {
  background: var(--gradient-form-login);
}
.formSubmitButton_book:hover .icon {
  animation: scale 0.3s ease-in-out;
}
.formSubmitButton_delete {
  background: var(--red-primary);
  margin-top: 32px;
  transition: 0.25s ease;
  cursor: pointer;
}
.formSubmitButton_delete:hover {
  background: var(--blue-primary);
}
</style>
