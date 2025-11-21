import { db } from "~/server";
import { Books } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const result = await db.select().from(Books);

  return result;
});
