export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const bookStore = useBookStore();

  if (userStore.user) {
    return;
  }

  const result = await useFetch("/api/auth/session");

  console.log(result.data.value);

  if (!result.data.value) {
    return navigateTo("/login");
  }

  // Записываем в стор пользователя
  userStore.setCurrentUser(result.data.value.user);

  // Находим в БД его книги и записываем в стор
  bookStore.loadBooks(result.data.value.user.id);
});
