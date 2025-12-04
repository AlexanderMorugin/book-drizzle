import { eq } from "drizzle-orm";
import { db } from "~/server";
import { users } from "~/server/database/schema";
import { comparePassword } from "~/server/utils/hash-password";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    return;
  }

  // Проверяем в БД есть ли пользователь с такой почтой
  const existUser = await db
    .select()
    .from(users)
    .where(eq(users.email, body.email))
    .limit(1);

  // Если пользователь с такой почтой не существует
  if (!existUser[0]) {
    console.log("login.js - Почта неверная");
  }

  // Сверяем пароль true or false
  const doesThePasswordMatch = comparePassword(
    body.password,
    existUser[0].password
  );

  // Если пароли не совпадают
  if (!doesThePasswordMatch) {
    console.log("login.js - Пароль неверный");
  }

  // Если почта и пароль правильные, создаем токены и записываем в куки
  const { accessToken, refreshToken } = generateTokens(existUser[0]);

  setCookie(event, "access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  setCookie(event, "refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  // Записываем в Database refreshToken
  const result = await db
    .update(users)
    .set({ refresh_token: refreshToken })
    .where(eq(users.email, body.email));

  // Возвращаем на фронт пользователя
  return {
    user: transformUser(existUser[0]),
  };
});
