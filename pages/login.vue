<template>
  <AuthContainer>
    <!-- Левый блок -->
    <AuthPromoContainer place="login">
      <!-- Текстовый блок -->
      <AuthPromoText place="login" />
    </AuthPromoContainer>

    <!-- Правый блок -->
    <AuthFormContainer>
      <!-- Лого блок показывается при ширине менее 1023px -->
      <LogoBlock v-if="isScreenLarge" place="login" />
      <!-- Заголовок формы -->
      <FormTitle
        title="Добро пожаловать!"
        subtitle="Войдите в свой аккаунт, чтобы продолжить чтение"
      />
      <!-- Форма -->
      <FormLogin place="login" />
      <!-- Блок смены авторизации -->
      <AuthChange place="login" />
    </AuthFormContainer>
  </AuthContainer>
</template>

<script setup>
definePageMeta({
  // middleware: ["auth"],
  layout: "auth",
});

const bookStore = useBookStore();
const userStore = useUserStore();

const { isScreenLarge } = useResizeLarge();

// При входе на страницу Логина, очищаем весь стор
bookStore.logoutUser();
userStore.logoutCurrentUser();
</script>
