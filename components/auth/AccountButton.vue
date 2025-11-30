<template>
  <button
    @click="emit('goToAuthPage')"
    :class="[
      'authAccountButton',
      { authAccountButton_register: place === 'register' },
      { authAccountButton_login: place === 'login' },
    ]"
  >
    <IconArrow v-if="place === 'register'" class="arrowIcon" />
    <span class="authAccountButton__text">
      {{ place === "register" ? "Войти в аккаунт" : "Создать аккаунт" }}
    </span>
    <IconArrow v-if="place === 'login'" class="arrowIcon arrowIcon_reverse" />
  </button>
</template>

<script setup>
const { place } = defineProps(["place"]);

const emit = defineEmits(["goToAuthPage"]);
</script>

<style lang="scss" scoped>
.authAccountButton {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 50px;
  border-radius: var(--border-radius-m);
  margin-top: 8px;
  cursor: pointer;
  transition: 0.25s ease;

  &_register {
    border: 1px solid var(--border-color-primary);
    transition: 0.25s ease;

    &:hover {
      border: 1px solid var(--violet-thirdly);
    }
  }

  &_login {
    border: 1px solid var(--border-color-primary);
    transition: 0.25s ease;

    &:hover {
      border: 1px solid var(--green-secondary);
    }
  }

  &__text {
    font-family: "Inter-Regular", sans-serif;
    font-size: 16px;
    line-height: 16px;
    color: var(--text-color-thirdly);
    transition: 0.25s ease;
  }
}

.arrowIcon {
  width: 17px;
  height: 17px;
  color: var(--text-color-thirdly);
  stroke-width: 1.5;
  transition: 0.25s ease;

  &_reverse {
    transform: rotate(180deg);
  }
}

.authAccountButton_register:hover .arrowIcon {
  color: var(--violet-secondary);
  animation: slide-to-left 1.5s infinite;
}
.authAccountButton_register:hover .authAccountButton__text {
  color: var(--violet-secondary);
}
.authAccountButton_login:hover .arrowIcon {
  color: var(--green-secondary);
  animation: slide-to-right 1.5s infinite;
}
.authAccountButton_login:hover .authAccountButton__text {
  color: var(--green-secondary);
}
</style>
