import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const users = ref([]);
  const user = ref(null);

  const loadUsers = async () => {
    const res = await useFetch("/api/users");
    users.value = res.data.value;
  };

  const registerUser = async (userData) => {
    const { data, status } = await useFetch("/api/auth/register", {
      method: "POST",
      body: userData,
    });

    return status;
  };

  const loginUser = async (userData) => {
    const { data, status } = await useFetch("/api/auth/login", {
      method: "POST",
      body: userData,
    });

    user.value = data.value.user;
    return status;
  };

  const setCurrentUser = (userData) => {
    user.value = null;

    user.value = userData;
  };

  const logoutCurrentUser = () => {
    user.value = null;
  };

  const deleteDatabaseUser = async (userId) => {
    const { data, status, refresh } = await useFetch("/api/auth/delete", {
      method: "DELETE",
      body: {
        id: userId,
      },
    });

    users.value = users.value.filter((user) => user.id !== userId);

    return { data, status, refresh };
  };

  return {
    users,
    user,
    loadUsers,
    registerUser,
    loginUser,
    setCurrentUser,
    logoutCurrentUser,
    deleteDatabaseUser,
  };
});
