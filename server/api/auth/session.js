import { eq } from "drizzle-orm";
import { db } from "~/server";
import { users } from "~/server/database/schema";
import { transformUser } from "~/server/utils/transform-user";

export default defineEventHandler(async (event) => {
  // Находим в куках refresh_token
  const cookieTokenRefresh = getCookie(event, "refresh_token");
  // Валидируем его
  const decodeCookieTokenRefresh = await decodeRefreshToken(cookieTokenRefresh);

  // Если рефреша в куках нет или его срок годности закончился
  if (!decodeCookieTokenRefresh) {
    return {
      user: null,
    };
  }

  // Находим в БД пользователя по рефреш токену - cookieTokenRefresh
  const existUser = await db
    .select()
    .from(users)
    .where(eq(users.refresh_token, cookieTokenRefresh));

  // Проверяем действительность рефреш токена в БД
  const rToken = await decodeRefreshToken(existUser[0].refresh_token);
  // Если рефреш истек, идем на логин и получаем новый рефреш
  if (!rToken) {
    return {
      user: null,
    };
  }

  return {
    user: transformUser(existUser[0]),
  };
});
