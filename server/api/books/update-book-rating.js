import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { rating, id } = await readBody(event);

  const result = await db
    .update(books)
    .set({ rating: rating })
    .where(eq(books.id, id));

  // await db.select().from(books).where(eq(books.id, id));

  return result;
});
