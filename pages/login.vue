<template>
  <AuthContainer>
    <!-- Левый блок -->
    <AuthPromoContainer
      place="login"
      title="Book Tracker"
      subtitle="Ваш персональный трекер чтения"
    >
      <!-- Текстовый блок -->
      <AuthPromoText place="login" />
    </AuthPromoContainer>

    <!-- Правый блок -->
    <AuthFormContainer>
      <!-- Лого блок показывается при ширине менее 1023px -->
      <LogoBlock
        v-if="isScreenLarge"
        place="login"
        title="Book Tracker"
        subtitle="Ваш персональный трекер чтения"
      />
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
  layout: "auth-layout",
  // middleware: ["auth"],
});

const { isScreenLarge } = useResizeLarge();
</script>
