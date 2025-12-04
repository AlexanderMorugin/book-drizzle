// export const useVerifyToken = async (access) => {
//   // console.log("composables - use-auth.js - useVerifyToken", access, refresh);

//   const token = await $fetch("/api/auth/jwt/verify", {
//     method: "POST",
//     body: { accessToken: access },
//   });
//   // .then((response) => response.data)
//   // .catch((err) => err.data);

//   // console.log("composables - use-auth.js - token", token);

//   return token;
// };

// export const useRefreshAccessToken = async (user) => {
//   const token = await $fetch("/api/auth/jwt/refresh", {
//     method: "POST",
//     body: { user: user },
//   });
//   // .then((response) => response.data)
//   // .catch((err) => err.data);

//   // console.log("composables - use-auth.js - token", token);

//   return token;
// };
