export default defineEventHandler(async (event) => {
  deleteCookie(event, "refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });
});
