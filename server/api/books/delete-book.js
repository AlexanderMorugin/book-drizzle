import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id: bookId } = await readBody(event);

  const deletedBook = await db.delete(books).where(eq(books.id, bookId));

  return deletedBook;
});
