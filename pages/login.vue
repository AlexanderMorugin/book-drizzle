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

    <NuxtLink to="/">Main Page</NuxtLink>
  </AuthContainer>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  // middleware: ["auth"],
});

const { isScreenLarge } = useResizeLarge();
</script>
