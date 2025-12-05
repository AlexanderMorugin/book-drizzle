import { eq } from "drizzle-orm";
import { db } from "~/server";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Находим в куках токены
  const cookieTokenAccess = getCookie(event, "access_token");
  const refreshCookieToken = getCookie(event, "refresh_token");

  // Валидируем их
  const decodeAccess = await decodeAccessToken(cookieTokenAccess);
  const decodeRefresh = await decodeRefreshToken(refreshCookieToken);

  const result = await db
    .update(users)
    .set({ book_for_years: body.book_for_years })
    .where(eq(users.id, body.id));

  return result;
});
