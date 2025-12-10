import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { name, author, genre, id } = await readBody(event);

  const result = await db
    .update(books)
    .set({ name: name, author: author, genre: genre })
    .where(eq(books.id, id));

  return result;
});
