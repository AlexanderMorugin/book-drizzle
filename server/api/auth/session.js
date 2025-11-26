import { eq } from "drizzle-orm";
import { db } from "~/server";
import { users } from "~/server/database/schema";
import { transformUser } from "~/server/utils/transform-user";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "refresh_token");

  console.log("session-cookie***", cookie);

  if (!cookie) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        message: "Refresh token не найден.",
      })
    );
  }

  // Находим в БД пользователя по рефреш токену
  const existUser = await db
    .select()
    .from(users)
    .where(eq(users.refresh_token, cookie))
    .limit(1);

  console.log("session-existUser***", existUser);

  // Проверяем действительность рефреш токена
  const rToken = await decodeRefreshToken(existUser[0].refresh_token);

  console.log("session-rToken***", rToken);

  // Если рефреш истек, возвращаем ноль вместо пользователя
  // Далее идем на логин и получаем новый рефреш
  if (!rToken) {
    return null;
  }

  // Генерируем accessToken передаем на устройство пользователя
  const { accessToken } = generateTokens(existUser[0]);

  // const aToken = await decodeAccessToken(accessToken);

  // console.log("decodedAccessToken: ", aToken);

  return {
    access_token: accessToken,
    user: transformUser(existUser[0]),
  };
});
