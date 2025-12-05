// export default defineEventHandler(async (event) => {
//   // Находим в куках токены
//   const cookieTokenAccess = getCookie(event, "access_token");
//   const refreshCookieToken = getCookie(event, "refresh_token");

//   // Валидируем их
//   const decodeAccess = await decodeAccessToken(cookieTokenAccess);
//   const decodeRefresh = await decodeRefreshToken(refreshCookieToken);

//   // Отправляем обратно, либо токен, либо ноль (если срок годности истек)
//   return {
//     tokens: {
//       decodeAccess,
//       decodeRefresh,
//     },
//   };
// });
