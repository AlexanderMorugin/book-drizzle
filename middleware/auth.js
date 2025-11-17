export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  const cookie = useCookie("refresh_token");

  const { data, status, error } = await useFetch("/api/auth/session");

  // Если срок годности рефреш токена истек, отправляем на логин
  if (!data.value) {
    userStore.logoutCurrentUser();
    cookie.value = null;
    return navigateTo("/login");
  }

  // console.log(data.value.access_token);

  userStore.setCurrentUser(data.value.user);
});
