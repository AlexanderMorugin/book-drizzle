export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  const { data, status, error, refresh } = await useFetch("/api/auth/session");

  if (!data.value) {
    return navigateTo("/login");
  }

  await refresh();

  userStore.setCurrentUser(data.value.user);
});
