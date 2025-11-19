<!-- <template> -->
<!-- <div> -->
<!-- HOME -->
<!-- <Users /> -->
<!-- <AuthLogout /> -->
<!-- <ul>
      <li>
        <NuxtLink to="/register">Регистрация</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login">Логин</NuxtLink>
      </li>
    </ul> -->
<!-- </div> -->
<!-- </template> -->

<template>
  <div>
    <h1>HOME</h1>
    <Users />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main-layout",
});
</script>
