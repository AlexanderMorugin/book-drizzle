import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const bookData = await readBody(event);

  // Находим в куках токен refresh
  const refreshCookieToken = getCookie(event, "refresh_token");

  // Если его в куках нет, отправляем на фронт волшебное слово
  if (!refreshCookieToken) {
    return "goToLogin";
  }

  const result = await db.select().from(books).where(eq(books.id, bookData.id));

  return result;
});
