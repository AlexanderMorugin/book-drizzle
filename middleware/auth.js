export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const bookStore = useBookStore();

  // Для перезагрузки страницы восстанавливаем сессию пользователя
  const result = await useFetch("/api/auth/session");

  // Если пользователь в сессии не создался, идем на логин
  if (!result.data.value.user) {
    return navigateTo("/login");
  }

  // Для перелистывания страниц
  if (userStore.user) {
    // Проверяем валидность токенов
    const tokens = await $fetch("/api/auth/jwt/verify");
    // console.log("auth.js - tokens: ", tokens.tokens);

    // Если срок годности access_token истек, обновляем его
    if (!tokens.tokens.decodeAccess) {
      await $fetch("/api/auth/jwt/refresh", {
        method: "POST",
        body: { user: userStore.user },
      });
    }

    if (!tokens.tokens.decodeRefresh) {
      // Удаляем куки
      await $fetch("/api/auth/logout", {
        method: "POST",
      });

      // Очищаем пользователя в сторе
      userStore.logoutCurrentUser();
      return navigateTo("/login");
    }
  }

  // Записываем в стор пользователя
  userStore.setCurrentUser(result.data.value.user);
  // Находим в БД его книги и записываем в стор
  await bookStore.loadBooks(result.data.value.user.id);
});
