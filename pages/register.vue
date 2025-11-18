<template>
  <AuthContainer>
    <AuthPromoContainer
      place="register"
      title="Book Tracker"
      subtitle="Начните свой читательский путь"
      ><AuthPromoText place="register"
    /></AuthPromoContainer>
    <AuthFormContainer>REGISTER</AuthFormContainer>
  </AuthContainer>
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
  // middleware: ["auth"],
});
</script>
