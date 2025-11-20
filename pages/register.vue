<template>
  <AuthContainer>
    <!-- Левый блок -->
    <AuthPromoContainer
      place="register"
      title="Book Tracker"
      subtitle="Начните свой читательский путь"
    >
      <!-- Текстовый блок -->
      <AuthPromoText place="register" />
    </AuthPromoContainer>

    <!-- Правый блок -->
    <AuthFormContainer>
      <!-- Лого блок показывается при ширине менее 1023px -->
      <LogoBlock v-if="isScreenLarge" place="register" />
      <!-- Заголовок формы -->
      <FormTitle
        title="Создать аккаунт"
        subtitle="Заполните данные для создания вашего аккаунта"
      />
      <!-- Форма -->
      <FormRegister place="register" />
      <!-- Блок смены авторизации -->
      <AuthChange place="register" />
      <!-- Блок политики конфиденциональности -->
      <AuthConditions />
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
