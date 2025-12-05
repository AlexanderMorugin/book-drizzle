import { and, gte, lte, eq, desc } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Находим в куках токен refresh
  const refreshCookieToken = getCookie(event, "refresh_token");

  // Если его в куках нет, отправляем на фронт волшебное слово
  if (!refreshCookieToken) {
    return "goToLogin";
  }

  const result = await db
    .select()
    .from(books)
    .where(
      and(
        eq(books.owner_id, body.userId),
        gte(books.progress, body.progressFirst),
        lte(books.progress, body.progressLast)
      )
    )
    .orderBy(desc(books.createdAt));

  return result;
});
