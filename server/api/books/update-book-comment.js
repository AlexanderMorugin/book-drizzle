import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { comment, id } = await readBody(event);

  const result = await db
    .update(books)
    .set({ comment: comment })
    .where(eq(books.id, id));

  return result;
});
