<template>
  <div>
    <Users />
    <!-- <AuthLogout /> -->
    <ul>
      <li>
        <NuxtLink to="/register">Регистрация</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login">Логин</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main-layout",
});
</script>
