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
    <ul>
      <li>
        <NuxtLink :to="{ name: 'register' }">Регистрация</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ name: 'login' }">Логин</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "main",
});
</script>
