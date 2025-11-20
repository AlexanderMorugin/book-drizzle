import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const users = ref([]);
  const user = ref(null);

  const loadUsers = async () => {
    const res = await useFetch("/api/users");

    users.value = res.data.value;
  };

  const setCurrentUser = async (userData) => {
    user.value = null;

    if (userData) {
      return (user.value = await userData);
    }
    // user.value = userData;
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
    setCurrentUser,
    logoutCurrentUser,
    deleteDatabaseUser,
  };
});
