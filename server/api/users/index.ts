import { db } from "~/server";
import { users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const result = await db.select().from(users);

  return result;
});
