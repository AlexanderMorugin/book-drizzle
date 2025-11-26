import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const users = ref([]);
  const user = ref(null);

  const loadUsers = async () => {
    const res = await useFetch("/api/users");
    users.value = res.data.value;
  };

  // const getUser = async (userData) => {
  //   const result = await useFetch("/api/auth/get-user", {
  //     method: "POST",
  //     body: userData,
  //   });

  //   if (result.error.value) {
  //     return;
  //   }

  //   // const newUser = new Promise(result);
  //   console.log(result.data.value.user);

  //   // user.value = result.data.value.user;

  //   return result;
  // };

  const registerUser = async (userData) => {
    const { data, status } = await useFetch("/api/auth/register", {
      method: "POST",
      body: userData,
    });

    return status;
  };

  const loginUser = async (userData) => {
    // user.value = null;

    const result = await useFetch("/api/auth/login", {
      method: "POST",
      body: userData,
    });

    console.log(result.error.value);

    if (result.error.value) {
      return null;
    }

    // console.log(result.error.value);

    user.value = result.data.value.user;

    return result;
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

  const updateBooksForYear = async (booksForYear) => {
    const result = await useFetch("/api/auth/update-books-for-year", {
      method: "PATCH",
      body: {
        id: user.value.id,
        book_for_years: booksForYear,
      },
    });

    if (result.error.value) {
      return;
    }

    // console.log(result);

    user.value.book_for_years = booksForYear;

    // result.refresh();

    return result;
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
    updateBooksForYear,
  };
});
