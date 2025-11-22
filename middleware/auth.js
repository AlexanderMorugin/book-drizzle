export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  if (userStore.user) {
    return;
  }

  const { data, status, error, refresh } = await useFetch("/api/auth/session");

  if (!data.value) {
    return navigateTo("/login");
  }

  await refresh();

  userStore.setCurrentUser(data.value.user);
});
