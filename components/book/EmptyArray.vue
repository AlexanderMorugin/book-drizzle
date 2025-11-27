<template>
  <div class="bookEmptyArray">
    В вашей библиотеке нет ни одной книги.
    <NuxtLink to="/add-book" class="link">Добавляйте!</NuxtLink>
  </div>
</template>

<style scoped>
.bookEmptyArray {
  width: 100%;
  height: 100%;
  font-family: "Inter-Regular", sans-serif;
  font-size: 18px;
  line-height: 26px;
  color: var(--text-color-fifthly);
  text-align: center;
  padding: 64px 32px;
}
</style>
