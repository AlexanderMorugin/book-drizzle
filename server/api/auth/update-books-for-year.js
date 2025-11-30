import { eq } from "drizzle-orm";
import { db } from "~/server";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await db
    .update(users)
    .set({ book_for_years: body.book_for_years })
    .where(eq(users.id, body.id));

  return result;
});
