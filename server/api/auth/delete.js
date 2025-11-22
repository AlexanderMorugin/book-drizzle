import { eq } from "drizzle-orm";
import { db } from "~/server";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id: userId } = await readBody(event);

  const deletedUser = await db.delete(users).where(eq(users.id, userId));

  deleteCookie(event, "refresh_token");
});
