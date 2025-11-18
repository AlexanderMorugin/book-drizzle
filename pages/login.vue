<template>
  <AuthContainer>
    <AuthPromoContainer
      place="login"
      title="Book Tracker"
      subtitle="Ваш персональный трекер чтения"
    >
      <AuthPromoText place="login" />
    </AuthPromoContainer>
    <AuthFormContainer>LOGIN</AuthFormContainer>
  </AuthContainer>
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
  // middleware: ["auth"],
});
</script>
