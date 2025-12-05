import { and, gte, lte, eq, desc } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Находим в куках токены
  const cookieTokenAccess = getCookie(event, "access_token");
  const refreshCookieToken = getCookie(event, "refresh_token");

  if (!cookieTokenAccess || !refreshCookieToken) {
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
