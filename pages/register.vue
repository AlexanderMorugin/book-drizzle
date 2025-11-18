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
      <LogoBlock
        v-if="isScreenLarge"
        place="register"
        title="Book Tracker"
        subtitle="Начните свой читательский путь"
      />
      <!-- Заголовок формы -->
      <FormTitle
        title="Создать аккаунт"
        subtitle="Заполните данные для создания вашего аккаунта"
      />
      <!-- Форма -->
      <FormRegister place="register" />
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
