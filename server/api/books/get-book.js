import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const bookData = await readBody(event);

  const result = await db.select().from(books).where(eq(books.id, bookData.id));

  return result;
});
