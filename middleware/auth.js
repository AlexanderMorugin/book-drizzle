export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  const cookie = useCookie("refresh_token");

  const { data, status, error, refresh } = await useFetch("/api/auth/session");
  // const res = await $fetch("/api/auth/session");

  // Если срок годности рефреш токена истек, отправляем на логин
  if (!data.value) {
    userStore.logoutCurrentUser();
    cookie.value = null;
    return navigateTo("/login");
  }

  // console.log(res);

  await refresh();

  userStore.setCurrentUser(data.value.user);
});
