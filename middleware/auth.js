export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const bookStore = useBookStore();

  if (!userStore.user) {
    // Для перезагрузки страницы восстанавливаем сессию пользователя
    const result = await useFetch("/api/auth/session");

    // Если пользователь в сессии не создался, идем на логин
    if (!result.data.value.user) {
      return navigateTo("/login");
    }

    // Записываем в стор пользователя
    userStore.setCurrentUser(result.data.value.user);
    // Находим в БД его книги и записываем в стор
    await bookStore.loadBooks(result.data.value.user.id);
  }
});
