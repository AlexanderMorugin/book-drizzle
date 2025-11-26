import { eq, desc } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const userId = await readBody(event);

  const result = await db
    .select()
    .from(books)
    .where(eq(books.owner_id, userId))
    .orderBy(desc(books.createdAt));

  return result;
});
