import { eq } from "drizzle-orm";
import { db } from "~/server";
import { books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { image, id } = await readBody(event);

  const result = await db
    .update(books)
    .set({ image: image })
    .where(eq(books.id, id));

  return result;
});
